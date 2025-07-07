import type {
	BuildingSerializedState,
	ProjectileSerializedState,
	Tile,
	TroopSerializedState
} from "server/game/types"

export type GameStateSummary = {
	state: "waiting" | "ongoing" | "ended"
	battlefield: {
		buildings: BuildingSerializedState[],
		troops: TroopSerializedState[],
		projectiles: ProjectileSerializedState[],
		grid: Tile[][]
	}
	gameResult: {
		status: "waiting" | "ongoing" | "ended"
		winner?: string // podría ser Team si lo tienes tipado
	}
	players: {
		id: string
		name: string
		team: string // o Team si tienes ese tipo definido
	}[]
	soldiersPerTeam: {
		team: string // o Team
		soldierCount: number
	}[]
}
