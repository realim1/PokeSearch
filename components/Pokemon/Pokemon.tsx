import { useQuery, gql } from "@apollo/client";
import styles from "./Pokemon.module.scss";

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
			<div className={styles.Pokemon}>
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
	console.log(
		JSON.parse(data.pokemon_v2_pokemon[0].pokemon_v2_pokemonsprites[0].sprites)
	);

	const sprites = JSON.parse(
		data.pokemon_v2_pokemon[0].pokemon_v2_pokemonsprites[0].sprites
	);
	return (
		<div>
			<h1>{data.pokemon_v2_pokemon[0].name}</h1>
			{data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes.map(
				(type: any, key: any) => {
					return <h2 key={key}>{type.pokemon_v2_type.name}</h2>;
				}
			)}
			<img src={sprites.front_default} alt={data.pokemon_v2_pokemon[0].name} />
		</div>
	);
}
