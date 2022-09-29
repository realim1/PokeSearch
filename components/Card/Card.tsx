import React, { ReactNode } from "react";

import styles from "./Card.module.scss";

interface CardProps {
	children: ReactNode;
}

interface CardHeaderProps {
	children: ReactNode;
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
	const body = getChildByDisplayName(children, "Body");
	const footer = getChildByDisplayName(children, "Footer");
	return (
		<div className={styles["Card"]}>
			{header} {body} {footer}
		</div>
	);
};

const Header = ({ children }: CardHeaderProps) => {
	return <div className={styles["Card__header"]}>{children}</div>;
};

const Body = ({ children }: CardBodyProps) => {
	return <div className={styles["Card__body"]}>{children}</div>;
};

const Footer = ({ children }: CardFooterProps) => {
	return <div className={styles["Card__footer"]}>{children}</div>;
};

Header.displayName = "Header";
Card.Header = Header;

Body.displayName = "Body";
Card.Body = Body;

Footer.displayName = "Footer";
Card.Footer = Footer;

export default Card;
