import { useAtom, useSetAtom } from "jotai"
import { useEffect } from "react"
import { io, type Socket } from "socket.io-client"

import { localPlayerAtom, socketAtom, stateAtom } from "./atoms"

const SERVER_URL = "http://localhost:3001"

export function useSocketInit() {
	const [ socket, setSocket ] = useAtom(socketAtom)
	const setGameState = useSetAtom(stateAtom)
	const setLocalPlayer = useSetAtom(localPlayerAtom)

	useEffect(() => {
		if (socket) return
		const socketIo: Socket = io(SERVER_URL)
		setSocket(socketIo)

		socketIo.on("game:update", (state) => {
			setGameState(state)
		})

		socketIo.on("game:localPlayer", (player) => {
			setLocalPlayer({
				id: player.id,
				...player.state
			})
		})

		return () => {
			socketIo.disconnect()
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ ])
}
