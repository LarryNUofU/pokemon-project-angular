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


//Species endpoint
export interface PokemonSpeciesApiResponse {
	flavor_text_entries: PokemonFlavorTextEntry[];
}

export interface PokemonFlavorTextEntry {
	flavor_text: string;
	language: {
		name: string;
		url: string;
	};
	version: {
		name: string;
		url: string;
	};
}




export class PokemonModel {
	readonly id: number;
	readonly name: string;
	readonly heightInMeters: number;
	readonly weightInKg: number;
	readonly abilities: PokemonAbility[];
	readonly sprites: PokemonSprites;
    readonly types: PokemonTypes[];

    readonly displayName: string;
	nickname: string | null;
	flavorText: string | null;

	constructor(response: PokemonApiResponse) {
		this.id = response.id;
		this.name = response.name;
		this.heightInMeters = this.getHeightInMeters(response.height);
		this.weightInKg = response.weight / 10;
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

	setFlavorText(speciesApiResponse: PokemonSpeciesApiResponse) {
		this.flavorText = speciesApiResponse.flavor_text_entries.filter((val) => {
			return val.language.name === "en";
		})[0].flavor_text.replace('\f', ' ');
		console.log("flavor text: " + this.flavorText);
	}

}
