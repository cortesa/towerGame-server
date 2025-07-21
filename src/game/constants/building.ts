import { BuildingLevel } from "@/types";

export const BUILDING_UPGRADE_DURATION = 5

export const BUILDING_UPGRADE_ETA: Record<BuildingLevel, number> = {
	0: 5,
	1: 35,
	2: 40,
	3: Infinity
}