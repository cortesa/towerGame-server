import { svgPathProperties } from "svg-path-properties"

import type { BattlefieldState, IPlayer, Position } from "@/types"

import { Troop } from "../troop"

export function sendTroops(
	state: BattlefieldState,
	fromId: string,
	toId: string,
	player: IPlayer,
	calculatePath: (from: Position, to: Position) => InstanceType<typeof svgPathProperties>
): Troop | null {
	const fromBuilding = state.buildings.find(b => b.id === fromId)
	const toBuilding = state.buildings.find(b => b.id === toId)
	if (!fromBuilding || !toBuilding) return null

	if (fromBuilding.readState().team !== player.readState().team) return null

	const currentSoldiers = fromBuilding.readState().soldierCount
	const sendSoldiers = Math.floor(currentSoldiers * player.readState("attackRatio"))
	if (sendSoldiers <= 0) return null

	const newTroop = new Troop({
		origin: fromBuilding,
		target: toBuilding,
		soldiers: sendSoldiers,
		team: player.readState("team"),
		svgPath: calculatePath(
			fromBuilding.readState("position"),
			toBuilding.readState("position")
		)
	})

	return newTroop
}

