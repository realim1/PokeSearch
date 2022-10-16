import { useQuery, gql } from "@apollo/client";
import styles from "./Pokemon.module.scss";
import Card from "../Card/Card";
import Pill from "../Pill/Pill";
import ProgressBar from "../ProgressBar/ProgressBar";
import Stats from "./Modules/Stats/Stats";

const QUERY = gql`
	query Pokemon_v2_pokemon($where: pokemon_v2_pokemon_bool_exp) {
		pokemon_v2_pokemon(where: $where) {
			name
			pokemon_v2_pokemontypes {
				pokemon_v2_type {
					name
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
					<h2>Profile</h2>
					<div>
						<div>
							<b>Weight 🐘: </b>
							<span>{data.pokemon_v2_pokemon[0].weight * 0.1}kg</span>
						</div>
						<div>
							<b>Height 📏: </b>
							<span>{data.pokemon_v2_pokemon[0].height / 10}m</span>
						</div>
						<div>
							<b>Base Capture Rate 🥅: </b>
							<span>
								{data.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy
									.capture_rate / 255}
								%
							</span>
						</div>
						<div>
							<b>Gender Ratios 🏳️‍⚧️: </b>
							<span>
								{(data.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy
									.gender_rate /
									8) *
									100}
								% ♀️/{" "}
								{((8 -
									data.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy
										.gender_rate) /
									8) *
									100}
								% ♂️
							</span>
						</div>
						<div>
							<b>Egg Groups 🥚:</b>
							{data.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy.pokemon_v2_pokemonegggroups.map(
								(egg: any, index: number) => {
									return (
										<span key={index}> {egg.pokemon_v2_egggroup.name} /</span>
									);
								}
							)}
						</div>
						<div>
							<b>Hatch Steps 🚶‍♂️: </b>
							<span>
								{255 *
									(1 +
										data.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy
											.hatch_counter)}
							</span>
						</div>
						<div>
							<b>Abilities 🧠:</b>
							{data.pokemon_v2_pokemon[0].pokemon_v2_pokemonabilities.map(
								(ability: any, index: number) => {
									return (
										<span key={index}>
											{" "}
											{ability.pokemon_v2_ability.name} /
										</span>
									);
								}
							)}
						</div>
						<div>
							<b>Effort Value (EV) 💪:</b>
							{data.pokemon_v2_pokemon[0].pokemon_v2_pokemonstats.map(
								(stat: any, index: number) => {
									return stat.effort > 0 ? (
										<span key={index}>
											{" "}
											{stat.pokemon_v2_stat.name}: {stat.effort} /
										</span>
									) : null;
								}
							)}
						</div>
					</div>
				</Card.Body>
			</Card>
		</div>
	);
}
