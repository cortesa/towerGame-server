import { BuildingLevel, BuildingTypeChangeData } from "@/types";

export const BUILDING_UPGRADE_DURATION = 5

export const BUILDING_UPGRADE_ETA: Record<BuildingLevel, number> = {
	0: 5,
	1: 35,
	2: 40,
	3: Infinity
}

export const BUILDING_TYPE_CHANGE_DATA: BuildingTypeChangeData = {
		soldiersRequired: 32,
		duration: 10,
};