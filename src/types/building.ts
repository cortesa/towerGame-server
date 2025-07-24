import type { Position, Team, TilePosition, Hitbox } from "./basic"

export const BuildingStatus = {
	IDLE: "idle",
	ACTIVE: "active",
	UPGRADING: "upgrading",
	CONVERTING: "converting",
	PENDING_SWAP: "pending-swap"
} as const

export type BuildingStatus = typeof BuildingStatus[keyof typeof BuildingStatus]
export type BuildingLevel = 0 | 1 | 2 | 3;
export type TroopArrivalOutcome = "reinforced" | "defended" | "conquered";
export type BuildingType = "barrack" | "tower" | "factory";

export type BuildingTypeChangeData = {
	soldiersRequired: number;
	duration: number; // en segundos
};

export interface BuildingConfig {
	buildingType: BuildingType;
	blockedArea: TilePosition[];
	tx: number;
	ty: number;
	x?: number;
	y?: number;
	team?: Team;
	initialSoldiers?: number;
	initialLevel?: BuildingLevel;
	swapped?: boolean
}

export interface BaseBuildingState {
	status: BuildingStatus;
	position: Position;
	level: BuildingLevel;
	soldierCount: number;
	team: Team;
	hitbox: Hitbox;
	canUpgrade: boolean;
	canChange: boolean;
}

export interface TowerState extends BaseBuildingState {
	attackRange: number;
	attackZone: Hitbox;
}

export interface BaseBuildingSerializedState {
	id: string;
	type: BuildingType;
	status: BuildingStatus;
	position: Position;
	level: BuildingLevel;
	soldierCount: number;
	team: Team;
	canUpgrade: boolean;
	canChange: boolean;
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
	startConvertType(newType: BuildingType): void;
	getNextTypeCfg(): BuildingConfig;
	onTroopArrival(attackingTeam: Team, attackingSoldiers: number): TroopArrivalOutcome;
}
