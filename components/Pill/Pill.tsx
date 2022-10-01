import React, { ReactNode } from "react";
import styles from "./Pill.module.scss";

interface PillProps {
	children: ReactNode;
	className?: string;
}

const Pill = ({ children, className = "" }: PillProps) => {
	return <span className={`${styles["Pill"]} ${className}`}>{children}</span>;
};

export default Pill;
