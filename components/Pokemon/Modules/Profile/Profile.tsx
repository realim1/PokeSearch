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
					<b>Weight π: </b>
					<span>{weight * 0.1}kg</span>
				</div>
				<div>
					<b>Height π: </b>
					<span>{height / 10}m</span>
				</div>
				<div>
					<b>Base Capture Rate π₯: </b>
					<span>{capture_rate / 255}%</span>
				</div>
				<div>
					<b>Gender Ratios π³οΈββ§οΈ: </b>
					<span>
						{(gender_ratio / 8) * 100}% βοΈ/ {((8 - gender_ratio) / 8) * 100}% βοΈ
					</span>
				</div>
				<div>
					<b>Egg Groups π₯:</b>
					{egg_groups.map((egg: any, index: number) => {
						return <span key={index}> {egg.pokemon_v2_egggroup.name} /</span>;
					})}
				</div>
				<div>
					<b>Hatch Steps πΆββοΈ: </b>
					<span>{255 * (1 + hatch_counter)}</span>
				</div>
				<div>
					<b>Abilities π§ :</b>
					{abilities.map((ability: any, index: number) => {
						return (
							<span key={index}> {ability.pokemon_v2_ability.name} /</span>
						);
					})}
				</div>
				<div>
					<b>Effort Value (EV) πͺ:</b>
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
