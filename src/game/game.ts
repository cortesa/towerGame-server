import type { GameMap, GameState, Team } from "@/types"

import { EventBus, type GameEventMap } from "./eventBus"
import { Battlefield } from "./battlefield"
import { Player } from "./player"
import { Ticker } from "./ticker"

export class Game {
	private state: GameState = {
		state: "waiting",
		winner: undefined,
		battlefield: new Battlefield(),
		players: new Map(),
		mapPlayers: 0,
		ticker: new Ticker(),
		soldiersPerTeam: [],
		gameResult: { status: "waiting" }
	}

	private selectedOrigins: Map<string, string | null> = new Map()

	private listeners: Set<() => void> = new Set()

	private eventBus = new EventBus<GameEventMap>()

	public onUpdate(listener: () => void) {
		this.listeners.add(listener)
	}

	public offUpdate(listener: () => void) {
		this.listeners.delete(listener)
	}

	private notifyUpdate() {
		// Notifies all subscribed listeners about a state update
		for (const listener of this.listeners) {
			listener()
		}
	}

	/**
	 * Constructs a new Game instance.
	 * @param map - GameMap object to use for the battlefield
	 */
	constructor(
		map: GameMap
	) {
		// Initialize core game state
		this.setState({
			mapPlayers: map.players,
			battlefield: new Battlefield(this.eventBus, map),
			ticker: new Ticker()
		})

		this.state.ticker.on((deltaTime) => this.update(deltaTime))
		// this.state.ticker.start()
	}

	public readState(): typeof this.state;
	public readState<K extends keyof typeof this.state>(key: K): typeof this.state[K];
	public readState<K extends keyof typeof this.state>(
		key?: K
	): typeof this.state | typeof this.state[K] {
		// Getter for internal state or a specific state key
		if (key) return this.state[ key ]
		return this.state
	}

	private setState(patch: Partial<typeof this.state>) {
		// Merges a partial state into the current state
		Object.assign(this.state, patch)
	}

	public getBattlefield() {
		// Returns the battlefield instance
		return this.state.battlefield
	}

	public addPlayer(name: string, team: Exclude<Team, "neutral">) {
		const player = new Player(name, team)
		this.state.players.set(player.id, player)
		this.state.battlefield.addPlayer(player)
		this.selectedOrigins.set(player.id, null)
		this.notifyUpdate()

		if (this.readState("players").size === this.state.mapPlayers) {
			this.setState({
				state: "ongoing",
				gameResult: { status: "ongoing" }
			})
			this.state.ticker.start()
		}

		return player.serialize()
	}

	public removePlayer(id: string) {
		const player = this.state.players.get(id)
		if (!player) return
		// this.state.battlefield.removePlayer(player)
		this.state.players.delete(id)
		this.selectedOrigins.delete(id)
		this.notifyUpdate()
	}

	public getPlayerById(id: string) {
		return this.state.players.get(id)
	}

	/**
	 * Sets the troop send ratio for a specific player.
	 * @param playerId Player's unique identifier
	 * @param ratio Value between 0.25 and 1
	 */
	public setSendRatioForPlayer(playerId: string, ratio: number): void {
		const player = this.state.players.get(playerId)
		if (player) {
			player.setAttackRatio(ratio)
		}
	}

	/**
	 * Updates the state of the object.
	 * @param deltaTime Time elapsed since last update, **in seconds**.
	 */
	public update(deltaTime: number) {
		const battlefield = this.readState("battlefield")
		battlefield.update(deltaTime)

		const soldiers = battlefield.readState("soldiersPerTeam")
		this.setState({ soldiersPerTeam: soldiers })
		const winner = this.evaluateGameOutcome(soldiers)
		if (winner) {
			console.log(`[Victory] Team '${winner}' has won the game!`)
			this.readState("ticker").stop()
		}
		this.notifyUpdate()
	}

	// Attempts to upgrade a building if it belongs to the player's team
	public tryUpgrade(playerId: string, buildingId: string): void {
		const building = this.state.battlefield.getBuildingById(buildingId)
		if (!building) return

		const player = this.state.players.get(playerId)
		if (!player) return

		const localTeam = player.readState("team")

		if (building.readState("team") === localTeam) {
			building.startUpgrade(localTeam)
		}
	}

	// Deselects all buildings and clears the selected origin for a player
	public resetSelection(playerId: string): void {
		this.state.battlefield.deselectAllByPlayer(playerId)
		this.selectedOrigins.set(playerId, null)
	}

	// Selects a building as the origin for troop dispatch for a player
	public selectOrigin(playerId: string, buildingId: string): boolean {
		this.resetSelection(playerId)

		const building = this.state.battlefield.getBuildingById(buildingId)
		if (!building) return false

		const player = this.state.players.get(playerId)
		if (!player) return false

		const localTeam = player.readState("team")

		if (building.readState("team") === localTeam) {
			this.selectedOrigins.set(playerId, buildingId)
			building.select(localTeam)
			return true
		}

		return false
	}

	// Sends troops from selected origin building to the specified target for a player
	public sendTroops(playerId: string, targetId: string) {
		console.log("ACZ: targetId")

		const selectedOriginBuildingId = this.selectedOrigins.get(playerId)
		if (!selectedOriginBuildingId
			|| selectedOriginBuildingId === targetId) return

		this.state.battlefield.sendTroops(
			selectedOriginBuildingId,
			targetId,
			playerId
		)
		this.selectedOrigins.set(playerId, null)
		this.resetSelection(playerId)
	}

	/**
	 * Evaluates the current game outcome (victory, defeat, or ongoing).
	 * @param soldiers - Array of soldier counts per team
	 */
	public evaluateGameOutcome(soldiers: { team: string;
soldierCount: number }[]): Team | null {
		const players = Array.from(this.state.players.values())
		let winner: Team | null = null

		for (const player of players) {
			const playerTeam = player.readState("team")
			const playerStats = soldiers.find(s => s.team === playerTeam)
			if (!playerStats || playerStats.soldierCount <= 0) {
				console.log(`[Defeat] Team '${playerTeam}' has no soldiers left!`)
				this.setState({
					state: "ended",
					gameResult: { status: "ended" }
				})
				continue
			}
			const enemies = soldiers.filter(s => s.team !== playerTeam && s.soldierCount > 0)
			if (enemies.length === 0) {
				console.log(`[Victory] Team '${playerTeam}' has conquered all barracks!`)
				winner = playerTeam as Team
				this.setState({
					state: "ended",
					winner: playerTeam as Team,
					gameResult: {
						status: "ended",
						winner: playerTeam as Team
					}
				})
				break
			}
		}

		if (!winner) {
			this.setState({
				state: "ongoing",
				gameResult: { status: "ongoing" }
			})
		} else {
			this.readState("ticker").stop()
		}

		return winner
	}

	public serializeState() {
		const {
			state,
			winner,
			mapPlayers,
			players,
			soldiersPerTeam,
			gameResult,
			battlefield
		} = this.readState()

		const simplePlyerInfo = Array.from(players.values()).map(p => {
			const playerState = p.serialize()
			const { id, name, team } = playerState

			return {
				id,
				name,
				team
			}
		})

		const serializedBattlefield = battlefield.serialize()

		return {
			state,
			winner,
			mapPlayers,
			players: simplePlyerInfo,
			soldiersPerTeam,
			battlefield: serializedBattlefield,
			gameResult
		}
	}

}
