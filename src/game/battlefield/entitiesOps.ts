import {
	type BattleEvent,
	type BattlefieldState,
	type Hitbox,
	type IBuilding,
	type IProjectile,
	type ITroop,
	BuildingStatus
} from "../../types"
import { Projectile } from "../projectile"
import { checkAndHandleCollision } from "../collision"
import { Tower } from "../tower"
import { Barrack } from "../barrack"

export function updateEntities(
	state: BattlefieldState,
	deltaTime: number
): {
	newState: Partial<BattlefieldState>;
	events: BattleEvent[];
} {

	// Variable initialization
	const events: BattleEvent[] = []
	const count: Record<string, number> = Object.fromEntries(
		state.soldiersPerTeam.map(({ team }) => [ team, 0 ])
	)
	const troops = [ ...state.troops ]
	const projectiles = [ ...state.projectiles ]
	const trashCan: (ITroop | IProjectile | IBuilding)[] = []

	// 1. Update all buildings, accumulate soldier counts and swap building
	for (const building of state.buildings) {
		if (building.readState("status") === BuildingStatus.PENDING_SWAP) {
			const swapCfg = building.getNextTypeCfg()
			let newBuilding = null
			switch (swapCfg.buildingType) {
				case "barrack":
					newBuilding = new Barrack(swapCfg)
					break
				case "tower":
					newBuilding = new Tower(swapCfg)
					newBuilding.onProjectileCreated = (projectile: Projectile) => {
						state.projectiles.push(projectile)
					}
					break
				case "factory":
					newBuilding = null
					break
				default:
					newBuilding = null
					break
			}

			if (newBuilding) state.buildings.push(newBuilding)
			trashCan.push(building)
		}

		building.update(deltaTime, troops)
		const { team, soldierCount } = building.readState()
		count[ team ] = (count[ team ] || 0) + soldierCount
	}

	// 2. Update all troops and accumulate soldier counts
	for (const troop of troops) {
		const updateResult = troop.update(deltaTime)
		const { team, soldiers } = troop.readState()
		count[ team ] = (count[ team ] || 0) + soldiers
		const isDead = soldiers <= 0
		if (updateResult.arrived || isDead) trashCan.push(troop)
	}

	// 3. Update all projectiles and mark those that reached target
	for (const projectile of projectiles) {
		const updateResult = projectile.update(deltaTime)
		if (updateResult) trashCan.push(projectile)
	}

	// 4. Gather all hitboxes for collision detection
	const hitboxes: { box: Hitbox;
entity: ITroop | IProjectile | IBuilding }[] = [
	...troops.map(t => ({
		box: t.readState("hitbox"),
		entity: t
	})),
	...projectiles.map(p => ({
		box: p.readState("hitbox"),
		entity: p
	})),
	...state.buildings.map(b => ({
		box: b.readState("hitbox"),
		entity: b
	}))
]

	// 5. Check all hitbox collisions and handle them
	for (let i = 0; i < hitboxes.length; i++) {
		for (let j = i + 1; j < hitboxes.length; j++) {
			const a = hitboxes[ i ]
			const b = hitboxes[ j ]
			checkAndHandleCollision(a, b, trashCan)
		}
	}

	// 6. Return updated state and events
	return {
		newState: {
			buildings: state.buildings.filter(b => !trashCan.includes(b)),
			troops: state.troops.filter(t => !trashCan.includes(t)),
			projectiles: state.projectiles.filter(p => !trashCan.includes(p)),
			soldiersPerTeam: Object.entries(count).map(([ team, soldierCount ]) => ({
				team,
				soldierCount
			}))
		},
		events
	}
}
