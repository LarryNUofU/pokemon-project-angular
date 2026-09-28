export interface PokemonAbility {
	is_hidden: boolean;
	slot: number;
	ability: {
		name: string;
		url: string;
	};
}

export interface PokemonSprites {
	front_default: string | null;
	back_default: string | null;
	front_shiny: string | null;
	back_shiny: string | null;
	other?: Record<string, unknown>;
	versions?: Record<string, unknown>;
}

export interface PokemonApiResponse {
	id: number;
	name: string;
	height: number;
	weight: number;
	abilities: PokemonAbility[];
	sprites: PokemonSprites;
}

export class PokemonModel {
	readonly id: number;
	readonly name: string;
	readonly height: number;
	readonly weight: number;
	readonly abilities: PokemonAbility[];
	readonly sprites: PokemonSprites;

    readonly displayName: string;

	constructor(response: PokemonApiResponse) {
		this.id = response.id;
		this.name = response.name;
		this.height = response.height;
		this.weight = response.weight;
		this.abilities = response.abilities;
		this.sprites = response.sprites;

        this.displayName = this.name.charAt(0).toUpperCase() + this.name.slice(1);
	}
}
