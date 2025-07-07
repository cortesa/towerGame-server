import { svgPathProperties } from "svg-path-properties"

import type { Position, Tile } from "@/types"

import { METERS_TO_PX } from "../constants"
import { toSvgPath } from "../utils"

const MAX_PATH_STEPS = 200

/**
 * Returns a tuple of the first and last free tile from a path before encountering a blocked tile.
 * @param svgPath The SVG path to traverse.
 * @param getTileFn Function to retrieve a tile given tileX and tileY.
 * @param tileFrom Optional tile to exclude from blocking.
 * @param endTile Optional tile to allow as last even if blocked.
 * @returns A tuple [lastFreeTile, tilesTraversed]
 */
export function getFreeSegmentUntilBlocked(
	svgPath: InstanceType<typeof svgPathProperties>,
	getTileFn: (x: number, y: number) => Tile | null,
	tileFrom?: Tile | null,
	endTile?: Tile
): [Tile | null, Tile[]] {
	const length = svgPath.getTotalLength()
	const visited = new Set<string>()

	let firstTile: Tile | null = null
	let lastFreeTile: Tile | null = null
	const traversed: Tile[] = []

	const step = METERS_TO_PX / 2
	for (let d = 0; d <= length; d += step) {
		const { x, y } = svgPath.getPointAtLength(d)
		const tileX = Math.floor(x / METERS_TO_PX)
		const tileY = Math.floor(y / METERS_TO_PX)
		const tile = getTileFn(tileX, tileY)
		if (!tile || visited.has(tile.id)) continue
		visited.add(tile.id)
		if (!firstTile) firstTile = tile
		if (
			tile.state === "blocked" &&
			tile.id !== tileFrom?.id &&
			tile.id !== endTile?.id
		) break

		lastFreeTile = tile
		traversed.push(tile)

		if (tile.id === endTile?.id) break
	}
	return [ lastFreeTile, traversed ]
}

/**
 * Converts an array of tiles to an SVG path.
 */
export function fromTileToSvgPath(tiles: (Tile | null)[]): {
	points: Position[];
	d: string;
	svgPath: InstanceType<typeof svgPathProperties>;
} {
	const points = tiles
		.filter((tile): tile is Tile => tile !== null)
		.map(tile => ({
			x: tile.x,
			y: tile.y
		}))

	const d = toSvgPath({ points })
	const svgPath = new svgPathProperties(d)

	return {
		points,
		d,
		svgPath
	}
}

/**
 * Simple Euclidean distance heuristic.
 */
function getHeuristic(fromTile: Tile, toTile: Tile) {
	const dx = fromTile.x - toTile.x
	const dy = fromTile.y - toTile.y
	return Math.hypot(dx, dy)
}

/**
 * Calculates a segmented SVG path from a start position to a destination,
 * avoiding blocked tiles on the grid.
 */
export function calculatePath(
	from: Position,
	to: Position,
	getTileFn: (x: number, y: number) => Tile | undefined
): InstanceType<typeof svgPathProperties> {

	const startTile = getTileFn(
		Math.floor(from.x / METERS_TO_PX),
		Math.floor(from.y / METERS_TO_PX)
	)

	const endTile = getTileFn(
		Math.floor(to.x / METERS_TO_PX),
		Math.floor(to.y / METERS_TO_PX)
	)

	if (!startTile || !endTile) return new svgPathProperties("M0,0")

	const segmentedTilesPath: Tile[] = [ startTile ]
	let steps = 0

	while (segmentedTilesPath.at(-1)?.id !== endTile.id) {
		if (++steps > MAX_PATH_STEPS) break

		const lastTile = segmentedTilesPath.at(-1)!
		const { svgPath } = fromTileToSvgPath([ lastTile, endTile ])

		const [ nextTo, nextTraversed ] = getFreeSegmentUntilBlocked(
			svgPath,
			(x, y) => getTileFn(x, y) ?? null,
			lastTile,
			endTile
		)

		if (!nextTo || nextTo.id === endTile.id) break
		segmentedTilesPath.push(nextTraversed.at(-3) || nextTo)

		const neighbors: Tile[] = [
			getTileFn(nextTo.tx + 1, nextTo.ty),
			getTileFn(nextTo.tx - 1, nextTo.ty),
			getTileFn(nextTo.tx, nextTo.ty + 1),
			getTileFn(nextTo.tx, nextTo.ty - 1),
			getTileFn(nextTo.tx + 1, nextTo.ty - 1),
			getTileFn(nextTo.tx + 1, nextTo.ty + 1),
			getTileFn(nextTo.tx - 1, nextTo.ty + 1),
			getTileFn(nextTo.tx - 1, nextTo.ty - 1)
		].filter(
			(tile): tile is Tile => tile !== undefined &&
				tile !== null &&
				tile.state !== "blocked" &&
				!nextTraversed.includes(tile)
		)

		const bestNeighbor = neighbors
			.map(tile => ({
				tile,
				h: getHeuristic(tile, endTile)
			}))
			.sort((a, b) => a.h - b.h)[ 0 ]?.tile

		if (bestNeighbor) segmentedTilesPath.push(bestNeighbor)
	}

	return fromTileToSvgPath([ ...segmentedTilesPath, endTile ]).svgPath
}
