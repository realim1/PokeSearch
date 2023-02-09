import React, { ReactNode, useState } from "react";
import Head from "next/head";
import styles from "./PokesearchTemplate.module.scss";
import Image from "next/image";
import Link from "next/link";

import githubIcon from "../../assets/icons/github-icon-50.png";
interface PokesearchTemplate {
	children: ReactNode;
}

const PokesearchTemplate = ({ children }: PokesearchTemplate) => {
	return (
		<div className='PokesearchTemplate'>
			<Head>
				<title>PokeSearch</title>
				<meta property='og:title' content='PokeSearch' key='title' />
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicons/favicon.ico' />
			</Head>
			<header className={styles["PokesearchTemplate__header"]}>
				<nav>
					<a
						href='https://github.com/realim1/PokeSearch'
						target='_blank'
						rel='noreferrer'>
						<Image src={githubIcon} width={25} height={25} alt='Github Logo' />
					</a>
				</nav>
			</header>
			{children}
		</div>
	);
};

export default PokesearchTemplate;
