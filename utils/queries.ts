import { gql } from "@apollo/client";

export const GET_POKEMON_DATA = gql`
	query Pokemon_v2_pokemon($where: pokemon_v2_pokemon_bool_exp) {
		pokemon_v2_pokemon(where: $where) {
			name
			id
			pokemon_v2_pokemontypes {
				pokemon_v2_type {
					name
					pokemonV2TypeefficaciesByTargetTypeId {
						pokemon_v2_type {
							name
						}
						damage_factor
					}
				}
			}
			pokemon_v2_pokemonstats {
				base_stat
				effort
				pokemon_v2_stat {
					name
				}
			}
			weight
			height
			base_experience
			pokemon_v2_pokemonspecy {
				gender_rate
				capture_rate
				hatch_counter
				pokemon_v2_evolutionchain {
					id
				}
				pokemon_v2_pokemonegggroups {
					pokemon_v2_egggroup {
						name
					}
				}
			}
			pokemon_v2_pokemonabilities {
				pokemon_v2_ability {
					name
				}
			}
		}
	}
`;

export const GET_POKEMON_STATS = gql`
	query Pokemon_v2_pokemon($where: pokemon_v2_pokemon_bool_exp) {
		pokemon_v2_pokemon(where: $where) {
			name
			id
			pokemon_v2_pokemonstats {
				base_stat
				effort
				pokemon_v2_stat {
					name
				}
			}
		}
	}
`;

export const GET_POKEMON_PROFILE = gql`
	query Pokemon_v2_pokemon($where: pokemon_v2_pokemon_bool_exp) {
		pokemon_v2_pokemon(where: $where) {
			weight
			height
			pokemon_v2_pokemonspecy {
				gender_rate
				capture_rate
				hatch_counter
				pokemon_v2_pokemonegggroups {
					pokemon_v2_egggroup {
						name
					}
				}
			}
			pokemon_v2_pokemonabilities {
				pokemon_v2_ability {
					name
				}
			}
			pokemon_v2_pokemonstats {
				effort
				pokemon_v2_stat {
					name
				}
			}
		}
	}
`;
