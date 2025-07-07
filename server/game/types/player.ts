import type { Team } from "./basic"

export interface PlayerState {
	name: string;
	team: Team;
	attackRatio: number;
}

export interface IPlayer {
	id: string;
	readState(): PlayerState;
	readState<K extends keyof PlayerState>(key: K): PlayerState[K];
	serialize(): { id: string } & PlayerState;
	setAttackRatio(ratio: number): void;
}
