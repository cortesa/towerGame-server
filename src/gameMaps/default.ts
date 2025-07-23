import type { BuildingConfig, GameMap } from "@/types"

const INITIAL_BARRACKS: BuildingConfig[] = [
	{
		buildingType: "barrack",
		tx: 12,
		ty: 16,
		initialSoldiers: 5,
		team: "blue",
		blockedArea: [{
			tx: 12,
			ty: 16
		}]
	},
	{
		buildingType: "barrack",
		tx: 10,
		ty: 8,
		initialSoldiers: 5,
		team: "neutral",
		blockedArea: [{
			tx: 10,
			ty: 8
		}]
	},
	{
		buildingType: "barrack",
		tx: 8,
		ty: 2,
		initialSoldiers: 5,
		team: "red",
		blockedArea: [{
			tx: 8,
			ty: 2
		}]
	}
]

export const INITIAL_TOWERS: BuildingConfig[] = [
	{
		buildingType: "tower",
		tx: 9,
		ty: 14,
		initialSoldiers: 3,
		team: "blue",
		blockedArea: [{
			tx: 9,
			ty: 14
		}]
	},
	{
		buildingType: "tower",
		tx: 9,
		ty: 10,
		initialSoldiers: 3,
		team: "neutral",
		blockedArea: [
			{
				tx: 9,
				ty: 10
			},
			{
				tx: 10,
				ty: 10
			},
			{
				tx: 8,
				ty: 10
			}
		]
	},
	{
		buildingType: "tower",
		tx: 5,
		ty: 7,
		initialSoldiers: 3,
		team: "neutral",
		blockedArea: [{
			tx: 5,
			ty: 7
		}]
	},
	{
		buildingType: "tower",
		tx: 5,
		ty: 4,
		initialSoldiers: 36,
		team: "red",
		blockedArea: [{
			tx: 5,
			ty: 4
		}]
	}
]

export const DEFAULT_MAP: GameMap = {
	name: "default",
	players: 2,
	barracks: INITIAL_BARRACKS,
	towers: INITIAL_TOWERS
}
