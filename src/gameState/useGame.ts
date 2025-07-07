import { useAtom, useAtomValue } from "jotai"

import type { PlayerState } from "@/game/types"

import { gameIdAtom, localPlayerAtom, socketAtom, stateAtom } from "./atoms"

export function useGame() {
	const socket = useAtomValue(socketAtom)
	const state = useAtomValue(stateAtom)
	const [ id, setId ] = useAtom(gameIdAtom)
	const [ localPlayer, setLocalPlayer ] = useAtom(localPlayerAtom)

	// Game interaction methods
	const createGame = (playerName: string, gameName: string) => {
		socket?.emit("game:create", {
			playerName,
			gameName
		}, ({
			gameId,
			player
		}: {
			gameId: string,
			player: PlayerState
		}) => {
			setId(gameId)
			setLocalPlayer(player)}
		)
	}

	const joinGame = (playerName: string, gameId: string) => {
		socket?.emit("game:join", {
			playerName,
			gameId
		}, ({
			gameId,
			player
		}: {
			gameId: string,
			player: PlayerState
		}) => {
			setId(gameId)
			setLocalPlayer(player)}
		)
	}

	const selectOrigin = (buildingId: string): Promise<boolean> => {
		return new Promise((resolve) => {
			socket?.emit("game:selectOrigin", buildingId, (selected: boolean) => {
				resolve(selected)
			})
		})
	}

	const resetSelection = () => {
		socket?.emit("game:resetSelection")
	}

	const sendTroop = (targetId: string) => {
		socket?.emit("game:sendTroop", targetId)
	}

	const upgrade = (buildingId: string) => {
		socket?.emit("game:upgrade", buildingId)
	}

	const setPlayerRatio = (ratio: number) => {
		socket?.emit("game:setPlayerRatio", ratio)
	}

	return {
		id,
		state,
		localPlayer,
		createGame,
		joinGame,
		selectOrigin,
		resetSelection,
		sendTroop,
		upgrade,
		setPlayerRatio
	}
}
