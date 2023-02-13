import React, { ReactNode } from "react";
import Image from "next/image";
import styles from "./Pill.module.scss";

const icons = require.context("../../assets/icons/types", false, /.svg$/);
interface PillProps {
	children: ReactNode;
	type: string;
	className?: string;
}

const Pill = ({ children, type, className = "" }: PillProps) => {
	return (
		<span className={`${styles["Pill"]} ${type} ${className}`}>
			<Image
				src={icons(`./${type}.svg`).default}
				width='16'
				height='16'
				alt='bug'
			/>
			{children}
		</span>
	);
};

export default Pill;
