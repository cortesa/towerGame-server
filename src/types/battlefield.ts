import type { BuildingSerializedState, IBuilding } from "./building"
import type { ITroop, TroopSerializedState } from "./troop"
import type { IProjectile, ProjectileSerializedState } from "./projectile"
import type { IPlayer } from "./player"
import type { Tile } from "./basic"

export type BattleEvent = {
	type: "troop_arrived";
	data: Record<string, unknown>;
}

export interface BattlefieldState {
	buildings: IBuilding[];
	troops: ITroop[];
	projectiles: IProjectile[];
	players: IPlayer[];
	soldiersPerTeam: {
		team: string;
		soldierCount: number;
	}[];
}

export type BattlefieldSerializedState = {
	buildings: BuildingSerializedState[],
	troops: TroopSerializedState[],
	projectiles: ProjectileSerializedState[];
	grid: Tile[][]
}

export interface IBattlefield {
	id: string;
	readState(): BattlefieldState;
	readState<K extends keyof BattlefieldState>(key: K): BattlefieldState[K];
	serialize(): BattlefieldSerializedState;
	update(deltaTime: number): BattleEvent[];
	addPlayer(player: IPlayer): void;
	addBuilding(building: IBuilding): void;
	sendTroops(fromId: string, toId: string, byPlayerId: string): void;
	getBuildingById(id: string): IBuilding | null;
}
