import styled from "styled-components"

import type { ProjectileSerializedState } from "server/game/types"

import { CenteredFlex } from "../styles"

export function Projectile({ projectileState }: {
	projectileState: ProjectileSerializedState
}) {
	const { position, team } = projectileState

	return (
		<ProjectileDot
			style={{ transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))` }}
			$team={team}
		/>
	)
}

const ProjectileDot = styled(CenteredFlex).attrs<{ $team: string }>(props => ({
	$fontSize: "xs",
	$fontWeight: 700,
	$color: "black",
	...props
}))`
	position: absolute;
	width: max-content;
	height: max-content;
	padding: 2px 2px;
	border-radius: 8px;
	background-color: ${({ theme, $team }) => theme.colors[ $team as keyof typeof theme.colors ]};
	box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.2);
	pointer-events: none;
	// transition: transform 0.1s linear;
`
