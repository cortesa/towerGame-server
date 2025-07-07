import type { BuildingLevel } from "../types"

export const MAX_SOLDIERS_PRODUCTION = 64 //soldiers
export const UPGRADE_COOLDOWN_TIME = 5 // in seconds

export const METERS_TO_PX = 40

export const PROJECTILE_SPEED: Record<BuildingLevel, number> = {
	0: 400, // in px/second
	1: 400,
	2: 400,
	3: 400
}

export const TROOP_SPEED: Record<BuildingLevel, number> = {
	0: 60, // in px/second
	1: 80,
	2: 90,
	3: 100
}

export const BUILDING_UPGRADE_THRESHOLDS: Record<BuildingLevel, number> = {
	0: 5,
	1: 35,
	2: 40,
	3: Infinity
}

export const SOLDIERS_PRODUCTION_COOLDOWN: Record<BuildingLevel, number> = {
	0: 2.5, // seconds per soldier (slowest)
	1: 2,
	2: 1.5,
	3: 1 // fastest
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

