import React from "react";
import style from "./Profile.module.scss";

interface ProfileProps {
	weight: number;
	height: number;
	capture_rate: number;
	gender_ratio: number;
	egg_groups: any;
	hatch_counter: number;
	abilities: any;
	stats: any;
}

const Profile = ({
	weight,
	height,
	capture_rate,
	gender_ratio,
	egg_groups,
	hatch_counter,
	abilities,
	stats,
}: ProfileProps) => {
	return (
		<div>
			<h2>Profile</h2>
			<div>
				<div>
					<b>Weight 🐘: </b>
					<span>{weight * 0.1}kg</span>
				</div>
				<div>
					<b>Height 📏: </b>
					<span>{height / 10}m</span>
				</div>
				<div>
					<b>Base Capture Rate 🥅: </b>
					<span>{capture_rate / 255}%</span>
				</div>
				<div>
					<b>Gender Ratios 🏳️‍⚧️: </b>
					<span>
						{(gender_ratio / 8) * 100}% ♀️/ {((8 - gender_ratio) / 8) * 100}% ♂️
					</span>
				</div>
				<div>
					<b>Egg Groups 🥚:</b>
					{egg_groups.map((egg: any, index: number) => {
						return <span key={index}> {egg.pokemon_v2_egggroup.name} /</span>;
					})}
				</div>
				<div>
					<b>Hatch Steps 🚶‍♂️: </b>
					<span>{255 * (1 + hatch_counter)}</span>
				</div>
				<div>
					<b>Abilities 🧠:</b>
					{abilities.map((ability: any, index: number) => {
						return (
							<span key={index}> {ability.pokemon_v2_ability.name} /</span>
						);
					})}
				</div>
				<div>
					<b>Effort Value (EV) 💪:</b>
					{stats.map((stat: any, index: number) => {
						return stat.effort > 0 ? (
							<span key={index}>
								{" "}
								{stat.pokemon_v2_stat.name}: {stat.effort} /
							</span>
						) : null;
					})}
				</div>
			</div>
		</div>
	);
};
export default Profile;
