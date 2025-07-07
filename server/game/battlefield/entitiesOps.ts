import type {
	BattleEvent,
	BattlefieldState,
	Hitbox,
	IBuilding,
	IProjectile,
	ITroop
} from "@/game/types"

import { checkAndHandleCollision } from "../collision"

export function updateEntities(
	state: BattlefieldState,
	deltaTime: number
): {
	newState: Partial<BattlefieldState>;
	events: BattleEvent[];
} {
	const events: BattleEvent[] = []
	const count: Record<string, number> = Object.fromEntries(
		state.soldiersPerTeam.map(({ team }) => [ team, 0 ])
	)
	const troops = [ ...state.troops ]
	const projectiles = [ ...state.projectiles ]
	const trashCan: (ITroop | IProjectile)[] = []

	// 1. Update all buildings and accumulate soldier counts
	for (const building of state.buildings) {
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
