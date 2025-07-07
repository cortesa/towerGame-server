import styled from "styled-components"

import type { TroopSerializedState } from "server/game/types"

import { CenteredFlex } from "../styles"

export function Troop({ troopState }: { troopState: TroopSerializedState }) {
	const { position, team, soldiers } = troopState

	console.log("ACZ Troop", troopState)

	return (
		<TroopDot
			style={{ transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))` }}
			$team={team}>{soldiers}
		</TroopDot>
	)
}

const TroopDot = styled(CenteredFlex).attrs<{ $team: string }>(props => ({
	$fontSize: "xs",
	$fontWeight: 700,
	$color: "black",
	...props
}))`
	position: absolute;
	width: max-content;
	height: max-content;
	padding: 2px 5px;
	border-radius: 8px;
	background-color: ${({ theme, $team }) => theme.colors[ $team as keyof typeof theme.colors ]};
	box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.2);
	pointer-events: none;
	// transition: transform 0.1s linear;
`
