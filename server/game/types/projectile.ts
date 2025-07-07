import type { Position, Team, Hitbox } from "./basic"

export interface ProjectileState {
	team: Team;
	position: Position;
	hitbox: Hitbox;
}

export type ProjectileSerializedState = ProjectileState & {
	id: string,
	originId: string,
	targetId: string
}

export interface IProjectile {
	id: string;
	readState(): ProjectileState;
	readState<K extends keyof ProjectileState>(key: K): ProjectileState[K];
	serialize(): ProjectileSerializedState
	update(deltaTime: number): boolean;
}
