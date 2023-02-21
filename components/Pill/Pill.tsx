import React, { ReactNode } from "react";
import Image from "next/image";
import styles from "./Pill.module.scss";

import * as types from "../../assets/icons/types/types";
interface PillProps {
	children: ReactNode;
	type?:
		| "bug"
		| "dark"
		| "dragon"
		| "electric"
		| "fairy"
		| "fighting"
		| "fire"
		| "flying"
		| "ghost"
		| "grass"
		| "ground"
		| "ice"
		| "normal"
		| "poison"
		| "psychic"
		| "rock"
		| "steel"
		| "water";
	className?: string;
}

const Pill = ({ children, type, className = "" }: PillProps) => {
	return (
		<span className={`${styles["Pill"]} ${type} ${className}`}>
			{type && <Image src={types[type].src} width='16' height='16' alt='bug' />}
			{children}
		</span>
	);
};

export default Pill;
