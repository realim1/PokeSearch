import { useEffect, useState } from "react";
import style from "./EvoChart.module.scss";

interface EvoChartProps {
	evolutions: {
		id: number;
	};
}

interface EvolutionProps {
	url: string;
	name: string;
}

const EvoChart = ({ evolutions }: EvoChartProps) => {
	const [evoData, setEvoData] = useState<any>(null);

	useEffect(() => {
		getEvolution(
			`https://pokeapi.co/api/v2/evolution-chain/${evolutions.id}`
		).then((result) => {
			setEvoData(result);
		});
	}, []);

	const getEvolution = async (path: string) => {
		return await fetch(path)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				return data;
			});
	};

	const getImage = (url: string) => {
		var newUrl = url.replace(
			"https://pokeapi.co/api/v2/pokemon-species/",
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
		);
		newUrl = newUrl.replace(/.$/, ".png");
		return newUrl;
	};

	const getEvolutionText = (detail: any) => {
		switch (detail.trigger.name) {
			case "use-item":
				return (
					<span>
						{" "}
						by{" "}
						<span className='fw-600'>
							using{" "}
							<span className='text-capitalize fw-600'>{detail.item.name}</span>
						</span>
					</span>
				);
			case "level-up":
				return (
					<>
						{" "}
						by leveling up
						{detail.min_level && (
							<span>
								{" "}
								to{" "}
								<span className='text-capitalize fw-600'>
									Lvl {detail.min_level}
								</span>
							</span>
						)}
						{detail.location && (
							<span>
								{" "}
								<span className='fw-600'>
									in{" "}
									<span className='text-capitalize'>
										{detail.location.name}
									</span>
								</span>
							</span>
						)}
						{detail.known_move_type && (
							<span>
								{" "}
								&{" "}
								<span className='fw-600'>
									knowning a{" "}
									<span className='text-capitalize'>
										{detail.known_move_type.name}
									</span>{" "}
									type move
								</span>
							</span>
						)}
						{detail.min_affection && (
							<span>
								{" "}
								<span className='fw-600'>
									with atleast
									<span className='text-capitalize'>
										{" "}
										{detail.min_affection} levels of affection
									</span>
								</span>
							</span>
						)}
						{detail.min_happiness && (
							<span>
								{" "}
								<span className='fw-600'>
									with atleast
									<span className='text-capitalize'>
										{" "}
										{detail.min_happiness} friendship/happiness
									</span>
								</span>
							</span>
						)}
						{detail.time_of_day && (
							<span>
								<span className='fw-600'>
									{" "}
									during
									<span className='text-capitalize'> {detail.time_of_day}</span>
								</span>
							</span>
						)}
					</>
				);
		}
	};

	const evolutionRender = (
		current: EvolutionProps,
		next: EvolutionProps,
		evoDetail: any
	) => {
		return (
			<div className={style["EvoChart__evolution_container"]}>
				<div className={style["EvoChart__path_container"]}>
					<div className={style["EvoChart__pokemon_container"]}>
						<img src={getImage(current.url)} />
					</div>
					<div>➡️</div>
					<div className={style["EvoChart__pokemon_container"]}>
						<img src={getImage(next.url)} />
					</div>
				</div>
				<div className='text-center px-2'>
					<span className='text-capitalize fw-600'>{current.name}</span> evolves
					into <span className='text-capitalize fw-600'>{next.name}</span>
					{getEvolutionText(evoDetail[0])}
				</div>
			</div>
		);
	};

	return (
		<div className={style["EvoChart"]}>
			<h2>Evolution Chart</h2>
			{evoData != null ? (
				evoData.chain.evolves_to.map((evo: any, index: number) => {
					return (
						<div key={index}>
							{evolutionRender(
								evoData.chain.species,
								evo.species,
								evo.evolution_details
							)}
							{evo.evolves_to.map((evo2: any, index: number) => {
								return (
									<div key={index}>
										{evolutionRender(
											evo.species,
											evo2.species,
											evo2.evolution_details
										)}
									</div>
								);
							})}
						</div>
					);
				})
			) : (
				<div>LOADING</div>
			)}
		</div>
	);
};

export default EvoChart;
