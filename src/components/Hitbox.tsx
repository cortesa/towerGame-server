import styled from "styled-components"

import type { Hitbox as THitbox } from "../game/types"

export const Hitbox = styled.div<{ $hitbox: THitbox }>`
	position: absolute;
	top: ${({ $hitbox }) => $hitbox.y}px;
	left: ${({ $hitbox }) => $hitbox.x}px;
	width: ${({ $hitbox }) => $hitbox.width}px;
	height: ${({ $hitbox }) => $hitbox.height}px;
	background: #0000ff70;
	pointer-events: none; // opcional: para no interceptar clics
`
