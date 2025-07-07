import type { Tile } from "../types"

import { METERS_TO_PX } from "../constants"

export function createTile(tx: number, ty: number): Tile {
	return {
		id: crypto.randomUUID(),
		tx,
		ty,
		state: "free",
		x: (tx * METERS_TO_PX) + (METERS_TO_PX / 2),
		y: (ty * METERS_TO_PX) + (METERS_TO_PX / 2)
	}
}

export function isWithinBounds(grid: unknown[][], x: number, y: number): boolean {
	return x >= 0 && y >= 0 && x < grid.length && y < grid[ 0 ].length
}

export class GridManager {
	private grid: Tile[][]

	constructor(width: number, height: number) {
		this.grid = Array.from(
			{ length: width },
			(_, tx) => Array.from(
				{ length: height },
				(_, ty) => createTile(tx, ty)
			)
		)
	}

	public getGrid(): Tile[][] {
		return this.grid
	}

	public getTile(x: number, y: number): Tile | undefined {
		if (!isWithinBounds(this.grid, x, y)) return
		return this.grid[ x ][ y ]
	}

	public setTile(x: number, y: number, state: Partial<Tile>): void {
		if (!isWithinBounds(this.grid, x, y)) return
		const oldTile = this.grid[ x ][ y ]
		this.grid[ x ][ y ] = {
			...oldTile,
			...state
		}
	}
}
