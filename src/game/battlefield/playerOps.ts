import type { BattlefieldState } from "@/types"
import type { Player } from "@/game/player"

/**
 * Adds a player to the battlefield state.
 * @param state The current battlefield state.
 * @param player The player to add.
 */
export function addPlayer(state: BattlefieldState, player: Player): void {
	state.players.push(player)
}