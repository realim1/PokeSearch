import React from "react";
import Pill from "../../../Pill/Pill";

import style from "./TypeDef.module.scss";

interface TypeDefProps {
	doubleDamage?: any[];
	quadDamage?: any[];
	halfDamage?: any[];
	quarterDamage?: any[];
	noDamage?: any[];
}

const TypeDef = ({
	quadDamage = [],
	doubleDamage = [],
	halfDamage = [],
	quarterDamage = [],
	noDamage = [],
}: TypeDefProps) => {
	return (
		<div>
			<h2>Type Defense</h2>
			<div className='my-3'>
				{quadDamage.map((damageType, index) => {
					return (
						<Pill
							key={index}
							type={damageType.pokemon_v2_type.name}
							className={`${style["TypeDef__pill"]} mb-1`}>
							<div>{damageType.pokemon_v2_type.name}</div>
							<div>x4</div>
						</Pill>
					);
				})}
			</div>

			<div className='my-3'>
				{doubleDamage.map((damageType, index) => {
					return (
						<Pill
							key={index}
							type={damageType.pokemon_v2_type.name}
							className={`${style["TypeDef__pill"]} mb-1`}>
							<div>{damageType.pokemon_v2_type.name}</div>
							<div>x2</div>
						</Pill>
					);
				})}
			</div>
			<div className='my-3'>
				{halfDamage.map((damageType, index) => {
					return (
						<Pill
							type={damageType.pokemon_v2_type.name}
							key={index}
							className={`${style["TypeDef__pill"]} mb-1`}>
							<div>{damageType.pokemon_v2_type.name}</div>
							<div>x0.5</div>
						</Pill>
					);
				})}
			</div>
			<div className='my-3'>
				{quarterDamage.map((damageType, index) => {
					return (
						<Pill
							key={index}
							type={damageType.pokemon_v2_type.name}
							className={`${style["TypeDef__pill"]} mb-1`}>
							<div>{damageType.pokemon_v2_type.name}</div>
							<div>x0.25</div>
						</Pill>
					);
				})}
			</div>
			<div className='my-3'>
				{noDamage.map((damageType, index) => {
					return (
						<Pill
							key={index}
							type={damageType.pokemon_v2_type.name}
							className={`${style["TypeDef__pill"]} mb-1`}>
							<div>{damageType.pokemon_v2_type.name}</div>
							<div>x0</div>
						</Pill>
					);
				})}
			</div>
		</div>
	);
};

export default TypeDef;
