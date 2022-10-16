import React from "react";
import ProgressBar from "../../../ProgressBar/ProgressBar";

import style from "stats.module.scss";

interface StatsProp {
	stats: any;
	type: string;
}

const Stats = ({ stats, type }: StatsProp) => {
	return (
		<div>
			<h2>Stats</h2>
			{stats.map((stat: any, index: number) => {
				return (
					<ProgressBar
						key={index}
						label={stat.pokemon_v2_stat.name}
						value={stat.base_stat}
						maxValue={255}
						className={type}
					/>
				);
			})}
		</div>
	);
};

export default Stats;
