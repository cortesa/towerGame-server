import { Team } from "./game/types"

export type GameCreatePayload = {
	payload: {
	playerId: string
	team: Exclude<Team, "neutral">
	gameName: string
},
	callback?: (...args: any[]) => void
}

export type GameCreateResponse =
	| { gameId: string }
	| { error: string }
