import type { BattlefieldState } from "@/game/types"
import type { Player } from "@/game/player"

/**
 * Adds a player to the battlefield state.
 * @param state The current battlefield state.
 * @param player The player to add.
 */
export function addPlayer(state: BattlefieldState, player: Player): void {
	state.players.push(player)
}

/**
 * Deselects all buildings owned by the given player's team.
 * @param state The current battlefield state.
 * @param playerId ID of the player.
 */
export function deselectAllByPlayer(state: BattlefieldState, playerId: string): void {
	const player = state.players.find(p => p.id === playerId)
	if (!player) return

	const playerTeam = player.readState("team")

	for (const building of state.buildings) {
		building.deselect(playerTeam)
	}
}

/**
 * Selects a building by its ID for the specified player's team.
 * @param state The current battlefield state.
 * @param buildingId ID of the building to select.
 * @param playerId ID of the player performing the selection.
 */
export function selectBuildingById(
	state: BattlefieldState,
	buildingId: string,
	playerId: string
): void {
	const player = state.players.find(p => p.id === playerId)
	if (!player) return

	const building = state.buildings.find(b => b.id === buildingId)
	if (!building) return

	const playerTeam = player.readState("team")
	building.select(playerTeam)
}
