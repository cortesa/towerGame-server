import { svgPathProperties } from "svg-path-properties"

import type {
	BattleEvent,
	BattlefieldSerializedState,
	BattlefieldState,
	GameMap,
	IBattlefield,
	IBuilding,
	Position,
	Tile,
	TilePosition
} from "../types"
import type { EventBus, GameEventMap } from "../eventBus"

import { Barrack } from "../barrack"
import { Player } from "../player"
import { Tower } from "../tower"
import { Projectile } from "../projectile"
import { GridManager } from "./gridManager"
import * as entitiesOps from "./entitiesOps"
import * as pathfindingOps from "./pathfindingOps"
import * as PlayerOps from "./playerOps"
import * as troopOps from "./troopOps"

export class Battlefield implements IBattlefield {
	/** Unique identifier for this battlefield instance */
	public readonly id = crypto.randomUUID()

	private gridManager: GridManager
	private eventBus: EventBus<GameEventMap> | undefined

	/**
	 * Returns the tile grid used for pathfinding and collision.
	 */
	public getGrid(): Tile[][] {
		return this.gridManager.getGrid()
	}

	/**
	 * Sets the walkability of a specific tile on the grid, replacing the Tile object but preserving its position.
	 * @param x The x index of the tile.
	 * @param y The y index of the tile.
	 * @param walkable Whether the tile should be walkable (true) or not (false).
	 */
	public setTile(x: number, y: number, state: Partial<Tile>): void {
		this.gridManager.setTile(x, y, state)
	}

	/**
	 * Returns the tile at the specified coordinates, or undefined if out of bounds.
	 * @param x The x index of the tile.
	 * @param y The y index of the tile.
	 * @returns The Tile object or undefined if invalid.
	 */
	public getTile(tx: number, ty: number): Tile | undefined {
		return this.gridManager.getTile(tx, ty)
	}

	/** Internal state of the battlefield */
	private state: BattlefieldState = {
		buildings: [],
		troops: [],
		projectiles: [],
		players: [],
		soldiersPerTeam: []
	}

	/**
	 * Constructs a new Battlefield with required initial barracks and towers.
	 * @param eventBus Event bus for game events.
	 * @param map Game map containing barracks and towers.
	 */
	constructor(eventBus?: EventBus<GameEventMap>, map?: GameMap) {

		this.gridManager = new GridManager(25, 25)
		this.eventBus = eventBus

		const barracks = map?.barracks?.flatMap(cfg => {
			const tile = this.getTile(cfg.tx, cfg.ty)
			if (!tile) return []

			cfg.blockedArea.forEach((blockedTile: TilePosition) => {
				this.setTile(blockedTile.tx, blockedTile.ty, { state: "blocked" })
			})

			return [ new Barrack({
				...cfg,
				x: tile.x,
				y: tile.y
			}) ]
		}) ?? []

		const towers = map?.towers?.flatMap(cfg => {
			const tile = this.getTile(cfg.tx, cfg.ty)
			if (!tile) return []

			const tower = new Tower({
				...cfg,
				x: tile.x,
				y: tile.y
			})
			tower.onProjectileCreated = (projectile: Projectile) => {
				this.state.projectiles.push(projectile)
			}

			cfg.blockedArea.forEach((blockedTile: TilePosition) => {
				this.setTile(blockedTile.tx, blockedTile.ty, { state: "blocked" })
			})

			return [ tower ]
		}) ?? []

		const buildings = [ ...towers, ...barracks ]
		const initialCounts: Record<string, number> = {}
		for (const building of buildings) {
			if (!building) return
			const { team, soldierCount } = building.readState()
			initialCounts[ team ] = (initialCounts[ team ] || 0) + soldierCount
		}
		this.state = {
			players: [],
			buildings,
			troops: [],
			soldiersPerTeam: Object.entries(initialCounts).map(([ team, soldierCount ]) => ({
				team,
				soldierCount
			})),
			projectiles: []
		}
	}

	/**
	 * Merges the provided partial state into the current battlefield state.
	 * @param patch Partial battlefield state to merge.
	 */
	private setState(patch: Partial<BattlefieldState>) {
		Object.assign(this.state, patch)
	}

	/**
	 * Reads the entire battlefield state or a specific key.
	 * @param key Optional key of the battlefield state to read.
	 * @returns The entire battlefield state or the value at the given key.
	 */
	public readState(): BattlefieldState;
	public readState<K extends keyof BattlefieldState>(key: K): BattlefieldState[K];
	public readState<K extends keyof BattlefieldState>(key?: K) {
		return key ? this.state[ key ] : { ...this.state }
	}

	public serialize(): BattlefieldSerializedState {
		return {
			buildings: this.state.buildings
				.map(b => b.serialize())
				.filter(Boolean),

			troops: this.state.troops
				.map(t => t.serialize())
				.filter(Boolean),

			projectiles: this.state.projectiles
				.map(p => p.serialize())
				.filter(Boolean),

			grid: this.getGrid()

		}
	}

	/**
	 * Updates the battlefield state by advancing all entities and handling collisions.
	 * @param deltaTime - Time elapsed since last update in seconds.
	 * @returns Array of battle events that occurred during the update.
	 */
	public update(deltaTime: number): BattleEvent[] {
		const { newState, events } = entitiesOps.updateEntities(this.state, deltaTime)
		this.setState(newState)
		return events
	}

	/**
	 * Adds a player to the battlefield.
	 * @param player Player to add.
	 */
	public addPlayer(player: Player) {
		PlayerOps.addPlayer(this.state, player)
	}

	/**
	 * Deselects all buildings for the given player's team.
	 * @param playerId ID of the player whose buildings to deselect.
	 */
	public deselectAllByPlayer(playerId: string): void {
		PlayerOps.deselectAllByPlayer(this.state, playerId)
	}

	/**
	 * Adds a building (Barrack or Tower) to the battlefield.
	 * @param building Building to add.
	 */
	public addBuilding(building: Barrack | Tower): void {
		this.state.buildings.push(building)
	}

	/**
	 * Selects a building by its ID for the given player.
	 * @param buildingId ID of the building to select.
	 * @param playerId ID of the player selecting the building.
	 */
	public selectBuildingById(buildingId: string, playerId: string): void {
		PlayerOps.selectBuildingById(this.state, buildingId, playerId)
	}

	/**
	 * Sends troops from one building to another on behalf of a player.
	 * @param fromId ID of the origin building.
	 * @param toId ID of the target building.
	 * @param byPlayerId ID of the player sending troops.
	 */
	public sendTroops(fromId: string, toId: string, byPlayerId: string) {
		const player = this.state.players.find(p => p.id === byPlayerId)
		if (!player) return

		const newTroop = troopOps.sendTroops(
			this.state,
			fromId,
			toId,
			player,
			this.calculatePath.bind(this)
		)
		if (!newTroop) return

		this.setState({ troops: [ ...this.state.troops, newTroop ] })
		this.eventBus?.emit("troop:created", newTroop)
	}

	/**
	 * Retrieves a building by its ID.
	 * @param id ID of the building to retrieve.
	 * @returns The building if found, otherwise null.
	 */
	public getBuildingById(id: string): IBuilding | null {
		const building = this.state.buildings.find(b => b.id === id)
		return building ?? null
	}

	/**
	 * Calculates a path from a starting point to a destination, avoiding obstacles.
	 * @param from Starting coordinates.
	 * @param to Destination coordinates.
	 * @returns The SVG path properties instance representing the path.
	 */
	public calculatePath(
		from: Position,
		to: Position
	): InstanceType<typeof svgPathProperties> {
		return pathfindingOps.calculatePath(
			from,
			to,
			(x, y) => this.gridManager.getTile(x, y)
		)
	}
}
