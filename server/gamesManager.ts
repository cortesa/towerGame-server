import { type Server, type Socket } from "socket.io"
import { randomUUID } from "crypto"

import type { GameMap } from "./game/types"

import { Game } from "./game/game"
import { GameAdapter } from "./game/gameAdapter"
import { DEFAULT_MAP } from "./gameMaps/default"

class GamesManager {
	private games = new Map<string, GameAdapter>()

	public register(io: Server) {
		io.on("connection", (socket: Socket) => {

			socket.on("game:create", ({ playerName, gameName }, callback) => {
				const gameId = randomUUID()
				if (this.games.has(gameId)) {
					callback?.({ error: "Game already exists" })
					return
				}

				const game = new Game(DEFAULT_MAP as GameMap)
				const adapter = new GameAdapter({
					io,
					roomId: gameId,
					game,
					gameName
				})

				this.games.set(gameId, adapter)

				const player = adapter.handlePlayerJoin(socket, playerName, "blue")

				callback?.({
					gameId,
					player
				})
			})

			socket.on("game:join", ({ playerName, gameId }, callback) => {
				const adapter = this.games.get(gameId)

				if (!adapter) return
				const player = adapter.handlePlayerJoin(socket, playerName, "red")

				callback?.({
					gameId,
					player
				})
			})
		})
	}
}

export const gamesManager = new GamesManager()
