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
	other?: Other;
	versions?: Record<string, unknown>;
}

export interface Other {
    "official-artwork": OfficialArtworkSprites;
}

export interface OfficialArtworkSprites {
    front_default: string | null;
    front_shiny: string | null;
}

export interface PokemonApiResponse {
	id: number;
	name: string;
	height: number;
	weight: number;
	abilities: PokemonAbility[];
	sprites: PokemonSprites;
    types: PokemonTypes[];
}

export interface PokemonTypes {
    "slot": number,
    "type": PokemonType
}

export interface PokemonType {
    name: string,
    url: string
}

export class PokemonModel {
	readonly id: number;
	readonly name: string;
	readonly heightInMeters: number;
	readonly weight: number;
	readonly abilities: PokemonAbility[];
	readonly sprites: PokemonSprites;
    readonly types: PokemonTypes[];

    readonly displayName: string;
	readonly nickname: string | null;
	readonly flavorText: string | null;

	constructor(response: PokemonApiResponse) {
		this.id = response.id;
		this.name = response.name;
		this.heightInMeters = this.getHeightInMeters(response.height);
		this.weight = response.weight;
		this.abilities = response.abilities;
		this.sprites = response.sprites;
        this.types = response.types;

        this.displayName = this.name.charAt(0).toUpperCase() + this.name.slice(1);
		this.nickname = null;
		this.flavorText = null;
	}


    private getHeightInMeters(height: number): number {
        return height / 10;
    }

    isGrassType(): boolean {
        let isGrass = false;
        this.types.forEach(type => {
            if (type.type.name === "grass") {
                isGrass = true;
            }
        })
        return isGrass;
    }

}
