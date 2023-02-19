import type { NextPage } from "next";
import { useQuery } from "@apollo/client";
import { GET_POKEMON_GUESS } from "../../utils/queries";
import PokesearchTemplate from "../../templates/PokesearchTemplate/PokesearchTemplate";

import styles from "../../styles/WhosThatPokemon.module.scss";
import pokemonStyles from "../../components/Pokemon/Pokemon.module.scss";
import { FormEvent, useState } from "react";

const WhosThatPokemon: NextPage = () => {
	const [guess, setGuess] = useState<string>("");
	const [solved, setSolved] = useState<boolean>(false);
	const [id, setId] = useState<number>(() => {
		return Math.ceil(Math.random() * (1008 - 1) + 1);
	});

	const { data, loading, error } = useQuery(GET_POKEMON_GUESS, {
		variables: {
			where: {
				id: {
					_eq: id,
				},
			},
		},
	});

	if (loading) {
		return (
			<div className={pokemonStyles["Pokemon__preloader"]}>
				<div className={pokemonStyles["Pokemon__pokeball"]}>
					<div className={pokemonStyles["Pokemon__pokeball__button"]}></div>
				</div>
			</div>
		);
	}
	if (error) {
		console.error(error);
		return null;
	}

	const reset = () => {
		setSolved(false);
		setGuess("");
		setId(Math.ceil(Math.random() * (1008 - 1) + 1));
	};

	const onGuess = (e: FormEvent) => {
		e.preventDefault();
		if (guess.toLowerCase() === data.pokemon_v2_pokemon[0].name) {
			setSolved(true);
			setTimeout(reset, 3000);
		} else {
			setSolved(false);
		}
	};

	return (
		<PokesearchTemplate>
			<div className={styles["WhosThatPokemon"]}>
				<h1>Who&apos;s That Pokemon?</h1>
				<div className={styles["WhosThatPokemon__content_container"]}>
					<div className={styles["WhosThatPokemon__content_img_container"]}>
						<img
							style={solved ? { filter: "contrast(100%)" } : {}}
							className={styles["WhosThatPokemon__content_img"]}
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
						/>
					</div>
				</div>
				<form
					onSubmit={onGuess}
					className={styles["WhosThatPokemon__input_container"]}>
					<input
						type='text'
						id='pokemonGuess'
						name='pokemonGuess'
						placeholder='Guess the Pokemon'
						value={guess}
						className={styles["WhosThatPokemon__input"]}
						onChange={(e) => {
							setGuess(e.target.value);
						}}
					/>
					<button
						disabled={guess ? false : true}
						className={styles["WhosThatPokemon__input_button"]}>
						🔍
					</button>
					{guess && (
						<div className={styles["WhosThatPokemon__solved_icon_container"]}>
							{solved ? <div>✅</div> : <div>🔴</div>}
						</div>
					)}
				</form>
			</div>
		</PokesearchTemplate>
	);
};

export default WhosThatPokemon;
