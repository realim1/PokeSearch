import { useQuery, gql } from "@apollo/client";
import styles from "./Pokemon.module.scss";
import Card from "../Card/Card";
import Pill from "../Pill/Pill";
import ProgressBar from "../ProgressBar/ProgressBar";

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
				pokemon_v2_stat {
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
					<h2>Stats</h2>
					{data.pokemon_v2_pokemon[0].pokemon_v2_pokemonstats.map(
						(stat: any, index: number) => {
							return (
								<ProgressBar
									key={index}
									label={stat.pokemon_v2_stat.name}
									value={stat.base_stat}
									maxValue={255}
									className={
										data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0]
											.pokemon_v2_type.name
									}
								/>
							);
						}
					)}
				</Card.Body>
			</Card>
		</div>
	);
}
