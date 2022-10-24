import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import styles from "./Pokemon.module.scss";
import Card from "../Card/Card";
import Pill from "../Pill/Pill";
import Stats from "./Modules/Stats/Stats";
import Profile from "./Modules/Profile/Profile";
import TypeDef from "./Modules/TypeDef/TypeDef";

const QUERY = gql`
	query Pokemon_v2_pokemon($where: pokemon_v2_pokemon_bool_exp) {
		pokemon_v2_pokemon(where: $where) {
			name
			pokemon_v2_pokemontypes {
				pokemon_v2_type {
					name
					pokemonV2TypeefficaciesByTargetTypeId {
						pokemon_v2_type {
							name
						}
						damage_factor
					}
				}
			}
			pokemon_v2_pokemonsprites {
				sprites
			}
			pokemon_v2_pokemonstats {
				base_stat
				effort
				pokemon_v2_stat {
					name
				}
			}
			weight
			height
			base_experience
			pokemon_v2_pokemonspecy {
				gender_rate
				capture_rate
				hatch_counter
				pokemon_v2_evolutionchain {
					id
				}
				pokemon_v2_pokemonegggroups {
					pokemon_v2_egggroup {
						name
					}
				}
			}
			pokemon_v2_pokemonabilities {
				pokemon_v2_ability {
					name
				}
			}
		}
	}
`;

export default function Pokemon({ identifier }: { identifier: number | null }) {
	const [doubleDmg, setDoubleDmg] = useState<any[]>([]);
	const [halfDmg, setHalfDmg] = useState<any[]>([]);
	const [noDmg, setNoDmg] = useState<any[]>([]);

	const { data, loading, error } = useQuery(QUERY, {
		variables: {
			where: {
				id: {
					_eq: identifier,
				},
			},
		},
	});

	useEffect(() => {
		if (!loading) {
			receivesDoubleDamage();
			receivesHalfDamage();
			receivesNoDamage();
		}
	}, [loading]);

	useEffect(() => {
		for (let i = halfDmg.length - 1; i >= 0; i--) {
			let type = halfDmg[i].pokemon_v2_type.name;
			const index = doubleDmg.findIndex((item) => {
				return item.pokemon_v2_type.name == type;
			});
			if (index >= 0) {
				halfDmg.splice(i, 1);
				setHalfDmg([...halfDmg]);
				if (index > -1) {
					doubleDmg.splice(index, 1);
					setDoubleDmg([...doubleDmg]);
				}
			}
		}
	}, [doubleDmg, halfDmg]);

	const getDamageMultiplers = (types: any[], multipler: number) => {
		let damageTypes = types.filter(
			(typeEffect: { damage_factor: number }) =>
				typeEffect.damage_factor == multipler
		);
		return damageTypes;
	};

	const receivesDoubleDamage = () => {
		if (data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes.length > 1) {
			setDoubleDmg([
				...getDamageMultiplers(
					data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0].pokemon_v2_type
						.pokemonV2TypeefficaciesByTargetTypeId,
					200
				),
				...getDamageMultiplers(
					data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[1].pokemon_v2_type
						.pokemonV2TypeefficaciesByTargetTypeId,
					200
				),
			]);
		} else {
			setDoubleDmg([
				...getDamageMultiplers(
					data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0].pokemon_v2_type
						.pokemonV2TypeefficaciesByTargetTypeId,
					200
				),
			]);
		}
	};
	const receivesHalfDamage = () => {
		if (data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes.length > 1) {
			setHalfDmg([
				...getDamageMultiplers(
					data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0].pokemon_v2_type
						.pokemonV2TypeefficaciesByTargetTypeId,
					50
				),
				...getDamageMultiplers(
					data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[1].pokemon_v2_type
						.pokemonV2TypeefficaciesByTargetTypeId,
					50
				),
			]);
		} else {
			setHalfDmg([
				...getDamageMultiplers(
					data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0].pokemon_v2_type
						.pokemonV2TypeefficaciesByTargetTypeId,
					50
				),
			]);
		}
	};

	const receivesNoDamage = () => {
		if (data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes.length > 1) {
			setNoDmg([
				...getDamageMultiplers(
					data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0].pokemon_v2_type
						.pokemonV2TypeefficaciesByTargetTypeId,
					0
				),
				...getDamageMultiplers(
					data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[1].pokemon_v2_type
						.pokemonV2TypeefficaciesByTargetTypeId,
					0
				),
			]);
		} else {
			setNoDmg([
				...getDamageMultiplers(
					data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0].pokemon_v2_type
						.pokemonV2TypeefficaciesByTargetTypeId,
					0
				),
			]);
		}
	};

	if (loading) {
		return (
			<div className={styles["Pokemon__preloader"]}>
				<div className={styles["Pokemon__pokeball"]}>
					<div className={styles["Pokemon__pokeball__button"]}></div>
				</div>
			</div>
		);
	}

	if (error) {
		console.error(error);
		return null;
	}
	/*TODO: Add logic for calculating dual type weaknesses. For example a Flying and Normal type Pokemon (like Swablu) should only have a single damage multipler and not a double. */

	const sprites = JSON.parse(
		data.pokemon_v2_pokemon[0].pokemon_v2_pokemonsprites[0].sprites
	);

	return (
		<div className={styles["Pokemon"]}>
			<Card>
				<Card.Img
					src={sprites.front_default}
					alt={data.pokemon_v2_pokemon[0].name}
					className={
						data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0]
							.pokemon_v2_type.name
					}
					imgClassName={
						data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0]
							.pokemon_v2_type.name === "flying" ||
						(data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[1] &&
							data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[1]
								.pokemon_v2_type.name === "flying")
							? "floating"
							: "shift"
					}
				/>
				<Card.Header>
					<h1 className={`text-capitalize mt-2 mb-1`}>
						{data.pokemon_v2_pokemon[0].name}
					</h1>
					<span>#{identifier}</span>
					<div className={styles["Pokemon__types"]}>
						{data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes.map(
							(type: any, key: any) => {
								return (
									<Pill className={type.pokemon_v2_type.name} key={key}>
										{type.pokemon_v2_type.name}
									</Pill>
								);
							}
						)}
					</div>
				</Card.Header>
				<Card.Body className='px-2'>
					<Stats
						stats={data.pokemon_v2_pokemon[0].pokemon_v2_pokemonstats}
						type={
							data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0]
								.pokemon_v2_type.name
						}
					/>
					<hr className='mt-3' />
					<Profile
						weight={data.pokemon_v2_pokemon[0].weight}
						height={data.pokemon_v2_pokemon[0].height}
						capture_rate={
							data.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy.capture_rate
						}
						gender_ratio={
							data.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy.gender_rate
						}
						egg_groups={
							data.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy
								.pokemon_v2_pokemonegggroups
						}
						hatch_counter={
							data.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy.hatch_counter
						}
						abilities={data.pokemon_v2_pokemon[0].pokemon_v2_pokemonabilities}
						stats={data.pokemon_v2_pokemon[0].pokemon_v2_pokemonstats}
					/>
					<hr className='mt-3' />
					<TypeDef
						doubleDamage={doubleDmg}
						halfDamage={halfDmg}
						noDamage={noDmg}
					/>
				</Card.Body>
			</Card>
		</div>
	);
}
