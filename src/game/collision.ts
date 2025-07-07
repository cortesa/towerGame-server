import type { Hitbox, IBuilding, IProjectile, ITroop } from "@/types"

import { intersects } from "./utils"

/**
 * Checks if two hitboxes intersect and, if so, delegates to the collision handler.
 */
export function checkAndHandleCollision(
	a: { box: Hitbox;
entity: ITroop | IProjectile | IBuilding },
	b: { box: Hitbox;
entity: ITroop | IProjectile | IBuilding },
	trashCan: (ITroop | IProjectile)[]
): void {
	if (intersects(a.box, b.box)) {
		handleCollision(a, b, trashCan)
	}
}

/**
 * Resolves the collision between two entities based on their types.
 * Handles interactions between troops, projectiles, and buildings.
 */
function handleCollision(
	a: { box: Hitbox;
entity: ITroop | IProjectile | IBuilding },
	b: { box: Hitbox;
entity: ITroop | IProjectile | IBuilding },
	trashCan: (ITroop | IProjectile)[]
): void {
	const typeA = a.box.entityType
	const typeB = b.box.entityType

	// Handle troop-projectile collisions (regardless of order)
	if (
		(typeA === "projectile" && typeB === "troop") ||
		(typeB === "projectile" && typeA === "troop")
	) {
		const projectile = (typeA === "projectile" ? a.entity : b.entity) as IProjectile
		const troop = (typeA === "troop" ? a.entity : b.entity) as ITroop
		if (projectile.readState("team") !== troop.readState("team")) {
			troop.takeDamage(1)
			if (!trashCan.includes(projectile)) trashCan.push(projectile)
		}
	}

	// Handle troop-building collisions (only trigger arrival at destination)
	if (
		(typeA === "troop" && isBuildingType(typeB)) ||
		(typeB === "troop" && isBuildingType(typeA))
	) {
		const troop = (typeA === "troop" ? a.entity : b.entity) as ITroop
		const building = (typeA === "troop" ? b.entity : a.entity) as IBuilding
		if (building.id !== troop.originId && building.id === troop.targetId) {
			building.onTroopArrival(troop.readState("team"), troop.readState("soldiers"))
			if (!trashCan.includes(troop)) trashCan.push(troop)
		}
	}
}

/**
 * Type guard for detecting if the entity type is a building.
 */
function isBuildingType(type: string): type is "barrack" | "tower" {
	return type === "barrack" || type === "tower"
}
