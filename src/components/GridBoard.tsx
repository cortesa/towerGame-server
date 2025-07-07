import styled from "styled-components"
import { useMemo } from "react"
import { METERS_TO_PX } from "server/game/constants"

import type { Tile } from "server/game/types"

import { useBattlefield } from "../hooks/useBattlefield"
import { CenteredFlex } from "../styles"

type GridBoardProps = {
	show: boolean
}

export function GridBoard({ show }: GridBoardProps) {
	const { grid } = useBattlefield()

	const count = grid.reduce((add, col) => add + col.filter(t => t.inPath).length, 0)

	const tileElements = useMemo(() => {

		return grid.flatMap((col, x) => col.map((tile, y) => (
			<Tile
				key={`tile-${tile.id}`}
				$x={x}
				$y={y}
				$tile={tile}>
				<small style={{
					fontSize: 8,
					color: "#0f0"
				}}>{x},{y}
				</small>
			</Tile>
		))
		// eslint-disable-next-line react-hooks/exhaustive-deps
		)}, [ count ])

	if (!show) return null

	return tileElements
}

const Tile = styled(CenteredFlex).attrs<{
	$x: number,
	$y: number,
	$tile: Tile
}>(props => ({
	style: {
		backgroundColor: props.$tile.inPath
			? "#ffffff30"
			: props.$tile.state === "blocked"
				? "#ff000030"
				: "transparent",
		top: `${props.$y * METERS_TO_PX}px`,
		left: `${props.$x * METERS_TO_PX}px`
	},
	...props
}))`
  position: absolute;
  width: ${METERS_TO_PX}px;
  aspect-ratio: 1 / 1;
  border: 1px solid #00ff0040;
`
