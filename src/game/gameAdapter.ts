import type { Server, Socket } from "socket.io"
import type { Game } from "./game"
import type { BuildingType, Team } from "@/types"

interface GameRoomAdapterOptions {
	roomId: string
	io: Server
	game: Game
	gameName: string
}

export class GameAdapter {
	private readonly io: Server
	private readonly roomId: string
	private readonly game: Game

	constructor({
		io,
		roomId,
		game,
	}: GameRoomAdapterOptions) {
		this.io = io
		this.roomId = roomId
		this.game = game

		// Escuchar actualizaciones de estado del juego
		this.game.onUpdate(() => {
			this.io.to(this.roomId).emit("game:update", this.game.serializeState())
		})
	}

	public handlePlayerJoin(
		socket: Socket,
		name: string,
		team: Exclude<Team, "neutral">
	) {
		socket.join(this.roomId)
		const playerInfo = this.game.addPlayer(name, team)
		const playerId = playerInfo.id

		this.game.onUpdate(() => {
			socket.emit("game:localPlayer", this.game.getPlayerById(playerId))
		})

		socket.on("game:sendTroop", (originId:string, targetId: string) => {
			console.log("ACZ sendTroop:", originId, "->", targetId)
			this.game.sendTroops(playerId, originId, targetId)
		})
		
		socket.on("game:upgrade", (buildingId: string) => {
			this.game.tryUpgrade(playerId, buildingId)
		})
		
		socket.on("game:changeBuildingType", (buildingId: string, newType: BuildingType) => {
			console.log("ACZ change to:", newType)
			this.game.tryChangeBuildingType(playerId, buildingId, newType)
		})

		socket.on("game:setPlayerRatio", (ratio: number) => {
			this.game.setSendRatioForPlayer(playerId, ratio)
		})

		socket.on("disconnect", () => {
			this.game.removePlayer(playerId)
		})

		return playerInfo
	}
}
