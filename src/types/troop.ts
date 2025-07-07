import type { Team, Position, Hitbox } from "./basic"

export type TroopState = {
	team: Team;
	soldiers: number;
	position: Position;
	hitbox: Hitbox;
};

export type TroopSerializedState = TroopState & {
	id: string,
	originId: string,
	targetId: string
 };

export interface ITroop {
	id: string;
	readState(): TroopState;
	readState<K extends keyof TroopState>(key: K): TroopState[K];
	serialize(): TroopSerializedState;
	updateSoldierCount(soldierCount: number): void;
	update(deltaTime: number): { arrived: true } | { arrived: false };
	takeDamage(amount: number): void;
	originId: string;
	targetId: string;
}
