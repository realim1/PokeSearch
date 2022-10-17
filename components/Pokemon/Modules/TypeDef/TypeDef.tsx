import React from "react";
import Pill from "../../../Pill/Pill";

import style from "./TypeDef.module.scss";

interface TypeDefProps {
	doubleDamage?: any[];
	quadDamage?: any[];
	halfDamage?: any[];
	noDamage?: any[];
}

const TypeDef = ({
	doubleDamage = [],
	halfDamage = [],
	noDamage = [],
}: TypeDefProps) => {
	return (
		<div>
			<h2>Type Defense</h2>
			{doubleDamage.map((damageType, index) => {
				return (
					<Pill
						key={index}
						className={`${style["TypeDef__pill"]} mb-1 ${damageType.pokemon_v2_type.name}`}>
						<div>{damageType.pokemon_v2_type.name}</div>
						<div>x2</div>
					</Pill>
				);
			})}
			{halfDamage.map((damageType, index) => {
				return (
					<Pill
						key={index}
						className={`${style["TypeDef__pill"]} mb-1 ${damageType.pokemon_v2_type.name}`}>
						<div>{damageType.pokemon_v2_type.name}</div>
						<div>x0.5</div>
					</Pill>
				);
			})}
			{noDamage.map((damageType, index) => {
				return (
					<Pill
						key={index}
						className={`${style["TypeDef__pill"]} mb-1 ${damageType.pokemon_v2_type.name}`}>
						<div>{damageType.pokemon_v2_type.name}</div>
						<div>x0</div>
					</Pill>
				);
			})}
		</div>
	);
};

export default TypeDef;
