import type { BaseBuildingState, BuildingLevel, Hitbox } from "../types"

import { BUILDING_UPGRADE_THRESHOLDS } from "./constants"

export function calculateLevelFromSoldiers(
	soldiers: number,
	initialLevel?: BuildingLevel
): BuildingLevel {
	for (const levelStr in BUILDING_UPGRADE_THRESHOLDS) {
		const level = Number(levelStr) as BuildingLevel
		if (soldiers < BUILDING_UPGRADE_THRESHOLDS[ level ]) {
			return level
		}
	}
	return initialLevel ?? 0
}

export function evaluateUpgradeOption(
	state: BaseBuildingState,
	setState: (state: Partial<BaseBuildingState>) => void
) {
	const { team, level } = state
	if (team === "neutral") {
		setState({ canUpgrade: false })
		return
	}

	const nextLevel = (level + 1)
	if (nextLevel > 3) {
		setState({ canUpgrade: false })
		return
	}

	const threshold = BUILDING_UPGRADE_THRESHOLDS[ level ]
	setState({ canUpgrade: state[ "soldierCount" ] >= threshold })
}

/**
 * Converts an array of {x, y} points into a curved SVG path string using Catmull-Rom to Bézier conversion.
 * Ensures the curve passes through all points.
 * @param points Array of points that define the path.
 * @returns SVG path string
 */
export function toSvgPath({ points }: { points: { x: number;
y: number }[] }): string {
	if (points.length < 2) return ""

	const path: string[] = []
	path.push(`M ${points[ 0 ].x} ${points[ 0 ].y}`)

	for (let i = 0; i < points.length - 1; i++) {
		const p0 = points[ i - 1 ] || points[ i ]
		const p1 = points[ i ]
		const p2 = points[ i + 1 ]
		const p3 = points[ i + 2 ] || p2

		// Catmull-Rom to Bezier conversion
		const cp1x = p1.x + ((p2.x - p0.x) / 6)
		const cp1y = p1.y + ((p2.y - p0.y) / 6)
		const cp2x = p2.x - ((p3.x - p1.x) / 6)
		const cp2y = p2.y - ((p3.y - p1.y) / 6)

		path.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`)
	}

	return path.join(" ")
}

export function intersects(a: Hitbox, b: Hitbox): boolean {
	return (
		a.x < b.x + b.width &&
		a.x + a.width > b.x &&
		a.y < b.y + b.height &&
		a.y + a.height > b.y
	)
}
