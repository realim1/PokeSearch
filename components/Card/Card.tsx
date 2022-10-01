import React, { ReactNode } from "react";

import styles from "./Card.module.scss";

interface CardProps {
	children: ReactNode;
}

interface CardImgProps {
	src: string;
	alt: string;
	className?: string;
}

interface CardHeaderProps {
	children: ReactNode;
	className?: string;
}

interface CardBodyProps {
	children: ReactNode;
}

interface CardFooterProps {
	children: ReactNode;
}

const getChildByDisplayName = (children: ReactNode, displayName: string) =>
	React.Children.map(children, (child: any) => {
		return child.type.displayName == displayName ? child : null;
	});

const Card = ({ children }: CardProps) => {
	const header = getChildByDisplayName(children, "Header");
	const img = getChildByDisplayName(children, "Img");
	const body = getChildByDisplayName(children, "Body");
	const footer = getChildByDisplayName(children, "Footer");
	return (
		<div className={styles["Card"]}>
			{img} {header} {body} {footer}
		</div>
	);
};

const Img = ({ src, alt, className = "" }: CardImgProps) => {
	return (
		<img
			className={`${styles["Card__img"]} ${className}`}
			src={src}
			alt={alt}
		/>
	);
};

const Header = ({ children, className = "" }: CardHeaderProps) => {
	return (
		<div className={`${styles["Card__header"]} ${className}`}>{children}</div>
	);
};

const Body = ({ children }: CardBodyProps) => {
	return <div className={styles["Card__body"]}>{children}</div>;
};

const Footer = ({ children }: CardFooterProps) => {
	return <div className={styles["Card__footer"]}>{children}</div>;
};

Header.displayName = "Header";
Card.Header = Header;

Img.displayName = "Img";
Card.Img = Img;

Body.displayName = "Body";
Card.Body = Body;

Footer.displayName = "Footer";
Card.Footer = Footer;

export default Card;
