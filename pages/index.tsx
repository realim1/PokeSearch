import React, { useState } from "react";

import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

import PokeballImg from "../assets/images/Pokeball.png";
import PokesearchTemplate from "../templates/PokesearchTemplate/PokesearchTemplate";
import { removeSpecialChars } from "../utils/utils";

const Home: NextPage = () => {
	const router = useRouter();
	const [pokemon, setPokemon] = useState("");
	return (
		<PokesearchTemplate>
			<main className={styles.main}>
				<Image src={PokeballImg} alt='Pokeball Logo' width={144} height={144} />
				<h1 className={styles.title}>PokéSearch</h1>
				<div className={styles.pokemonContainer}>
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
						className={styles.pokemonButton}
						onClick={() =>
							router.push(`/pokemon/${removeSpecialChars(pokemon)}`)
						}>
						🔍
					</button>
				</div>
			</main>
		</PokesearchTemplate>
	);
};

export default Home;
