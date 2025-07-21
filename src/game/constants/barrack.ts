import { BuildingLevel } from "@/types";

export const BARRACKS_PRODUCTION_CAP = 64 //soldiers

export const BARRACKS_PRODUCTION_COOLDOWN: Record<BuildingLevel, number> = {
	0: 2.5, // seconds per soldier (slowest)
	1: 2,
	2: 1.5,
	3: 1 // fastest
}