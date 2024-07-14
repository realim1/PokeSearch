"use client";

import { FormEvent, useState } from "react";

import Image from "next/image";
import PokesearchTemplate from "../templates/PokesearchTemplate/PokesearchTemplate";
import PokeballImg from "../assets/images/Pokeball.png";
import styles from "../styles/Home.module.scss";
import { useRouter } from "next/navigation";
import { removeSpecialChars } from "../utils/utils";

export default function Page() {
	const router = useRouter();
	const [pokemon, setPokemon] = useState("");

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		router.push(`/pokemon/${removeSpecialChars(pokemon)}`);
	};

	return (
		<PokesearchTemplate>
			<main className={styles.main}>
				<Image src={PokeballImg} alt='Pokeball Logo' width={144} height={144} />
				<h1 className={styles.title}>PokéSearch</h1>
				<form className={styles.pokemonContainer} onSubmit={onSubmit}>
					<input
						type='text'
						id='pokemon'
						name='pokemon'
						placeholder="Enter Pokémon's Name or Id"
						value={pokemon}
						className={styles.pokemonInput}
						onChange={(e) => {
							setPokemon(e.target.value);
						}}
					/>
					<button
						disabled={pokemon ? false : true}
						className={styles.pokemonButton}>
						🔍
					</button>
				</form>
			</main>
		</PokesearchTemplate>
	);
}
