import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import styles from "./Pokemon.module.scss";
import Card from "../Card/Card";
import Pill from "../Pill/Pill";
import Stats from "./Modules/Stats/Stats";
import Profile from "./Modules/Profile/Profile";
import TypeDef from "./Modules/TypeDef/TypeDef";
import EvoChart from "./Modules/EvoChart/EvoChart";
import { GET_POKEMON_DATA } from "../../utils/queries";

export default function Pokemon({
	id,
	name,
}: {
	id: number;
	name: string | undefined;
}) {
	const [quadDmg, setQuadDmg] = useState<any[]>([]);
	const [doubleDmg, setDoubleDmg] = useState<any[]>([]);
	const [halfDmg, setHalfDmg] = useState<any[]>([]);
	const [quarterDmg, setQuarterDmg] = useState<any[]>([]);
	const [noDmg, setNoDmg] = useState<any[]>([]);
	const [selectedContent, setSelectedContent] = useState<String>("stats");
	const where = !isNaN(id)
		? {
				id: {
					_eq: id,
				},
		  }
		: {
				name: {
					_eq: name,
				},
		  };

	const { data, loading, error } = useQuery(GET_POKEMON_DATA, {
		variables: {
			where: where,
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
		checkSingleDamage();
		checkNoDamage();
	}, [quadDmg, doubleDmg, halfDmg, quarterDmg, noDmg]);

	const getDamageMultiplers = (types: any[], multipler: number) => {
		let damageTypes = types.filter(
			(typeEffect: { damage_factor: number }) =>
				typeEffect.damage_factor == multipler
		);
		return damageTypes;
	};

	const receivesDoubleDamage = () => {
		if (data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes.length > 1) {
			const mainTypeDefense = getDamageMultiplers(
				data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0].pokemon_v2_type
					.pokemonV2TypeefficaciesByTargetTypeId,
				200
			);

			const secondaryTypeDefense = getDamageMultiplers(
				data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[1].pokemon_v2_type
					.pokemonV2TypeefficaciesByTargetTypeId,
				200
			);

			const newDoubleDmg = [];
			const newQuadDmg = [];
			for (let i = 0; i < secondaryTypeDefense.length; i++) {
				const isQuadDamage = mainTypeDefense.findIndex((type) => {
					return (
						type.pokemon_v2_type.name ===
						secondaryTypeDefense[i].pokemon_v2_type.name
					);
				});
				if (isQuadDamage >= 0) {
					mainTypeDefense.splice(isQuadDamage, 1);
					newQuadDmg.push(secondaryTypeDefense[i]);
				} else {
					newDoubleDmg.push(secondaryTypeDefense[i]);
				}
			}
			setQuadDmg([...newQuadDmg]);
			setDoubleDmg([...mainTypeDefense, ...newDoubleDmg]);
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
			const mainTypeDefense = getDamageMultiplers(
				data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0].pokemon_v2_type
					.pokemonV2TypeefficaciesByTargetTypeId,
				50
			);

			const secondaryTypeDefense = getDamageMultiplers(
				data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[1].pokemon_v2_type
					.pokemonV2TypeefficaciesByTargetTypeId,
				50
			);

			const newHalfDmg = [];
			const newQuarterDmg = [];
			for (let i = 0; i < secondaryTypeDefense.length; i++) {
				const isQuarterDamage = mainTypeDefense.findIndex((type) => {
					return (
						type.pokemon_v2_type.name ===
						secondaryTypeDefense[i].pokemon_v2_type.name
					);
				});
				if (isQuarterDamage >= 0) {
					mainTypeDefense.splice(isQuarterDamage, 1);
					newQuarterDmg.push(secondaryTypeDefense[i]);
				} else {
					newHalfDmg.push(secondaryTypeDefense[i]);
				}
			}
			setQuarterDmg([...newQuarterDmg]);
			setHalfDmg([...mainTypeDefense, ...newHalfDmg]);
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

	const checkSingleDamage = () => {
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
	};

	const checkNoDamage = () => {
		for (let i = noDmg.length - 1; i >= 0; i--) {
			let type = noDmg[i].pokemon_v2_type.name;

			const quadIndex = quadDmg.findIndex((item) => {
				return item.pokemon_v2_type.name == type;
			});
			if (quadIndex >= 0) {
				quadDmg.splice(i, 1);
				if (quadIndex > -1) {
					quadDmg.splice(quadIndex, 1);
					setQuadDmg([...quadDmg]);
				}
			}

			const doubleIndex = doubleDmg.findIndex((item) => {
				return item.pokemon_v2_type.name == type;
			});
			if (doubleIndex >= 0) {
				doubleDmg.splice(i, 1);
				if (doubleIndex > -1) {
					doubleDmg.splice(doubleIndex, 1);
					setDoubleDmg([...doubleDmg]);
				}
			}

			const quarterIndex = quarterDmg.findIndex((item) => {
				return item.pokemon_v2_type.name == type;
			});
			if (quarterIndex >= 0) {
				quarterDmg.splice(i, 1);
				if (quarterIndex > -1) {
					quarterDmg.splice(quarterIndex, 1);
					setQuarterDmg([...quarterDmg]);
				}
			}

			const halfIndex = halfDmg.findIndex((item) => {
				return item.pokemon_v2_type.name == type;
			});
			if (halfIndex >= 0) {
				halfDmg.splice(i, 1);
				if (halfIndex > -1) {
					halfDmg.splice(halfIndex, 1);
					setHalfDmg([...halfDmg]);
				}
			}
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

	/**
	 * Since PokeApi GraphQL is a little inconsistent sometimes, I will be temporarily removing the sprites portion
	 */
	// const sprites = JSON.parse(
	// 	data.pokemon_v2_pokemon[0].pokemon_v2_pokemonsprites[0].sprites
	// );

	return (
		<div className={`${styles["Pokemon"]}`}>
			<Link
				href='/'
				legacyBehavior={false}
				className={`${styles["Pokemon__back"]}`}>
				◀️
			</Link>
			<Card>
				<Card.Img
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.pokemon_v2_pokemon[0].id}.png`}
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
					<span>#{data.pokemon_v2_pokemon[0].id}</span>
					<div className={styles["Pokemon__types"]}>
						{data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes.map(
							(type: any, key: any) => {
								return (
									<Pill type={type.pokemon_v2_type.name} key={key}>
										{type.pokemon_v2_type.name}
									</Pill>
								);
							}
						)}
					</div>
					<nav className={`${styles["Pokemon__section_selector"]}`}>
						<li>
							<a
								href='#/'
								onClick={(e) => {
									e.preventDefault();
									setSelectedContent("stats");
									return false;
								}}
								className={`${styles["Pokemon__selector_button"]} ${
									selectedContent === "stats" ? `${styles["active"]}` : ""
								}`}>
								Stats
							</a>
						</li>
						<li>
							<a
								href='#/'
								onClick={(e) => {
									e.preventDefault();
									setSelectedContent("profile");
									return false;
								}}
								className={`${styles["Pokemon__selector_button"]} ${
									selectedContent === "profile" ? `${styles["active"]}` : ""
								}`}>
								Profile
							</a>
						</li>
						<li>
							<a
								href='#/'
								onClick={(e) => {
									e.preventDefault();
									setSelectedContent("type defense");
									return false;
								}}
								className={`${styles["Pokemon__selector_button"]} ${
									selectedContent === "type defense"
										? `${styles["active"]}`
										: ""
								}`}>
								Type Defense
							</a>
						</li>
						<li>
							<a
								href='#/'
								onClick={(e) => {
									e.preventDefault();
									setSelectedContent("evolutions");
									return false;
								}}
								className={`${styles["Pokemon__selector_button"]} ${
									selectedContent === "evolutions" ? `${styles["active"]}` : ""
								}`}>
								Evolutions
							</a>
						</li>
					</nav>
				</Card.Header>
				<Card.Body className='px-2 my-2'>
					{selectedContent === "stats" && (
						<Stats
							stats={data.pokemon_v2_pokemon[0].pokemon_v2_pokemonstats}
							type={
								data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0]
									.pokemon_v2_type.name
							}
						/>
					)}
					{selectedContent === "profile" && (
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
					)}
					{selectedContent === "type defense" && (
						<TypeDef
							quadDamage={quadDmg}
							doubleDamage={doubleDmg}
							halfDamage={halfDmg}
							quarterDamage={quarterDmg}
							noDamage={noDmg}
						/>
					)}
					{selectedContent === "evolutions" && (
						<EvoChart
							evolutions={
								data.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy
									.pokemon_v2_evolutionchain
							}
						/>
					)}
				</Card.Body>
			</Card>
		</div>
	);
}
