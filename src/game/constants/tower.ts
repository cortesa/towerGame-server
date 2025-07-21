import { BuildingLevel } from "@/types"

export const PROJECTILE_SPEED: Record<BuildingLevel, number> = {
	0: 400, // in px/second
	1: 400,
	2: 400,
	3: 400
}

export const TOWER_ATTACK_RANGE: Record<BuildingLevel, number> = {
	0: 90, // pixels
	1: 120,
	2: 160,
	3: 210
}

export const TOWER_ATTACK_COOLDOWN: Record<BuildingLevel, number> = {
	0: 2.0, // seconds
	1: 1.5,
	2: 1.0,
	3: 0.5
}

