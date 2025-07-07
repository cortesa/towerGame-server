import type { IPlayer, PlayerState, Team } from "@/types"

export class Player implements IPlayer {
	// Unique identifier for the player
	public readonly id: string

	// Internal state of the player
	private state: PlayerState

	/**
	 * Creates a new Player instance with initial state.
	 */
	constructor(name: string, team: Exclude<Team, "neutral">) {
		this.id = crypto.randomUUID()
		this.state = {
			name,
			team,
			attackRatio: 0.25
		}
	}

	/**
	 * Returns a serializable representation of the player state.
	 */
	public serialize() {
		const state = this.readState() as PlayerState
		return ({
			id: this.id,
			...state
		})
	}

	/**
	 * Returns the full state or a specific key from the state.
	 */
	public readState(): PlayerState;
	public readState<K extends keyof PlayerState>(key?: K): PlayerState[K];
	public readState<K extends keyof PlayerState>(
		key?: K
	): PlayerState | PlayerState[K] {
		if (key !== undefined) {
			return this.state[ key ] as PlayerState[K]
		}
		return { ...this.state }
	}

	/**
	 * Merges a partial patch into the current state.
	 */
	private setState(patch: Partial<PlayerState>) {
		Object.assign(this.state, patch)
	}

	/**
	 * Sets the attack ratio to the specified value.
	 */
	public setAttackRatio(ratio: number): void {
		this.setState({ attackRatio: ratio })
	}
}
