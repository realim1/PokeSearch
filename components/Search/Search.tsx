"use client";

import React, { FormEvent, useState } from "react";
import searchIcon from "../../assets/icons/search-icon.svg";
import { useRouter } from "next/navigation";
import { removeSpecialChars } from "../../utils/utils";
import Image from "next/image";
import styles from "./Search.module.scss";

const Search = () => {
	const router = useRouter();

	const [pokemon, setPokemon] = useState("");

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		router.push(`/pokemon/${removeSpecialChars(pokemon)}`);
	};

	return (
		<form className={`${styles.form}`} onSubmit={onSubmit}>
			<div className={styles.inputContainer}>
				<input
					className={`${styles.input} ${styles["pixel-corners"]}`}
					type='text'
					id='pokemon'
					name='pokemon'
					placeholder="Enter Pokémon's Name or Id"
					value={pokemon}
					onChange={(e) => {
						setPokemon(e.target.value);
					}}
				/>
				<button className={styles.button} disabled={!pokemon}>
					<Image src={searchIcon} alt='search icon' width={24} height={24} />
				</button>
			</div>
		</form>
	);
};

export default Search;
