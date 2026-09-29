export interface PokemonGenerationResource {
	name: string;
	url: string;
}

export interface PokemonGenerationLocalizedName {
	name: string;
	language: PokemonGenerationResource;
}

export interface PokemonGenerationApiResponse {
	id: number;
	name: string;
	abilities: PokemonGenerationResource[];
	main_region: PokemonGenerationResource;
	moves: PokemonGenerationResource[];
	names: PokemonGenerationLocalizedName[];
	pokemon_species: PokemonGenerationResource[];
	types: PokemonGenerationResource[];
	version_groups: PokemonGenerationResource[];
}

export class PokemonGenerationModel {
	readonly id: number;
	readonly name: string;
	readonly abilities: PokemonGenerationResource[];
	readonly mainRegion: PokemonGenerationResource;
	readonly moves: PokemonGenerationResource[];
	readonly names: PokemonGenerationLocalizedName[];
	readonly pokemonSpecies: PokemonGenerationResource[];
	readonly types: PokemonGenerationResource[];
	readonly versionGroups: PokemonGenerationResource[];

	constructor(response: PokemonGenerationApiResponse) {
		this.id = response.id;
		this.name = response.name;
		this.abilities = response.abilities;
		this.mainRegion = response.main_region;
		this.moves = response.moves;
		this.names = response.names;
		this.pokemonSpecies = response.pokemon_species;
		this.types = response.types;
		this.versionGroups = response.version_groups;
	}
}
