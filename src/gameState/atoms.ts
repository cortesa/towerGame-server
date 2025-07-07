import { atom } from "jotai"
import { type Socket } from "socket.io-client"

import type { PlayerState } from "@/game/types"
import type { GameStateSummary } from "./types"

const initialGameState: GameStateSummary = {
	gameResult: { status: "ongoing" },
	players: [],
	soldiersPerTeam: [],
	battlefield: {
		buildings: [],
		troops: [],
		projectiles: [],
		grid: []
	}
}

export const socketAtom = atom<Socket>()
export const stateAtom = atom<GameStateSummary>(initialGameState)
export const localPlayerAtom = atom<PlayerState>()
export const gameIdAtom = atom<string>()
