import type { Position, Team, TilePosition, Hitbox } from "./basic"

export type BuildingLevel = 0 | 1 | 2 | 3;
export type TroopArrivalOutcome = "reinforced" | "defended" | "conquered";
export type BuildingType = "barrack" | "tower";

export interface BuildingConfig {
	buildingType: BuildingType;
	tx: number;
	ty: number;
	x?: number;
	y?: number;
	team?: Team;
	initialSoldiers?: number;
	initialLevel?: BuildingLevel;
	blockedArea: TilePosition[];
}

export interface BaseBuildingState {
	position: Position;
	level: BuildingLevel;
	soldierCount: number;
	team: Team;
	isUpgrading: boolean;
	canUpgrade: boolean;
	isActive: boolean;
	hitbox: Hitbox;
}

export interface TowerState extends BaseBuildingState {
	attackRange: number;
	attackZone: Hitbox;
}

export interface BaseBuildingSerializedState {
	id: string;
	type: BuildingType;
	team: Team;
	position: Position;
	level: BuildingLevel;
	soldierCount: number;
	isActive: boolean;
	isUpgrading: boolean;
	canUpgrade: boolean;
}

export type BuildingSerializedState<
	Extra extends object = object
> = BaseBuildingSerializedState & Extra;


export interface IBuilding<State extends BaseBuildingState = BaseBuildingState> {
	id: string;
	buildingType: BuildingType;
	readState(): State;
	readState<K extends keyof State>(key: K): State[K];
	serialize(): BuildingSerializedState;
	update(deltaTime: number, ...args: unknown[]): void;
	updateSoldierCount(soldierCount: number): void;
	startUpgrade(playerTeam: Team): void;
	onTroopArrival(attackingTeam: Team, attackingSoldiers: number): TroopArrivalOutcome;
}
