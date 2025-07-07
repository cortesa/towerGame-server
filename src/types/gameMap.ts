import type { BuildingConfig } from "./building"

export interface GameMap {
	name: string
	players: number
	barracks: BuildingConfig[]
	towers: BuildingConfig[]
}
