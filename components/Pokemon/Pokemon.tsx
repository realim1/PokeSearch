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
	const { data, loading, error } = useQuery(QUERY, {
		variables: {
			where: {
				id: {
					_eq: identifier,
				},
			},
		},
	});

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
	console.log(data);

	const sprites = JSON.parse(
		data.pokemon_v2_pokemon[0].pokemon_v2_pokemonsprites[0].sprites
	);

	/*TODO: Add logic for calculating dual type weaknesses. For example a Flying and Normal type Pokemon (like Swablu) should only have a single damage multipler and not a double. */
	const receivesDoubleDamage = () => {
		let doubleDamageTypes =
			data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.pokemonV2TypeefficaciesByTargetTypeId.filter(
				(typeEffect: { damage_factor: number }) =>
					typeEffect.damage_factor == 200
			);
		if (data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes.length > 1) {
			const doubleDamageTypes2 =
				data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[1].pokemon_v2_type.pokemonV2TypeefficaciesByTargetTypeId.filter(
					(typeEffect: { damage_factor: number }) =>
						typeEffect.damage_factor == 200
				);
			doubleDamageTypes = [...doubleDamageTypes, ...doubleDamageTypes2];
		}
		return doubleDamageTypes;
	};

	const receivesHalfDamage = () => {
		return data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.pokemonV2TypeefficaciesByTargetTypeId.filter(
			(typeEffect: { damage_factor: number }) => typeEffect.damage_factor == 50
		);
	};

	const receivesNoDamage = () => {
		return data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.pokemonV2TypeefficaciesByTargetTypeId.filter(
			(typeEffect: { damage_factor: number }) => typeEffect.damage_factor == 0
		);
	};
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
						doubleDamage={receivesDoubleDamage()}
						halfDamage={receivesHalfDamage()}
						noDamage={receivesNoDamage()}
					/>
				</Card.Body>
			</Card>
		</div>
	);
}
