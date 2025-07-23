export type Position = {
	x: number,
	y: number
};

export type TilePosition = {
	tx: number,
	ty: number
};

export type Team = "red" | "blue" | "green" | "magenta" | "neutral";

export type Hitbox = {
	x: number;
	y: number;
	width: number;
	height: number;
	entityId: string;
	entityType: "troop" | "projectile" | "barrack" | "tower" | "factory";
};

export type Tile = {
	id: string;
	tx: number;
	ty: number;
	x: number;
	y: number;
	state: "free" | "blocked";
	inPath?: boolean;
	h?: number;
};
