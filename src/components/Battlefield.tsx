import { useMemo } from "react"

import { useBattlefield } from "@/hooks/useBattlefield"
import { useClickHandlers } from "@/hooks/useClickHandlers"
import { useHotKeys } from "@/hooks/useHotKeys"
import { useGame } from "@/gameState/useGame"
import { Flex, type FlexProps } from "@/cssModules/styles"
import type {
	BuildingSerializedState,
	ProjectileSerializedState,
	TroopSerializedState
} from "server/game/types"

import { Barrack } from "./Barrack"
import { Tower } from "./Tower"
import { Troop } from "./Troop"
import { Projectile } from "./Projectile"
import { Hitbox } from "./Hitbox"
import { GridBoard } from "./GridBoard"

const SHOW_BUILDINGS = true
const SHOW_HITBOXES = false
const SHOW_GRID = false

export function Battlefield() {
	const { state, setPlayerRatio, resetSelection } = useGame()
	const { buildings, troops, projectiles } = useBattlefield()

	const {
		onMouseDown,
		onMouseUp,
		onTouchStart,
		onTouchEnd
	} = useClickHandlers({
		onClick: () => {
			resetSelection()
		},
		onDoubleClick: () => console.log("double click"),
		onLongPress: () => console.log("long press")
	})

	useHotKeys({
		"1": () => setPlayerRatio(0.25),
		"2": () => setPlayerRatio(0.5),
		"3": () => setPlayerRatio(0.75),
		"4": () => setPlayerRatio(1),
		"Escape": () => resetSelection()
	})

	const hitboxElements = useMemo(() => SHOW_HITBOXES
		? [
			// ...buildings.map((b) => ({
			// 	id: b.id,
			// 	hitbox: b.readState().hitbox
			// })),
			// ...troops.map((t) => ({
			// 	id: t.id,
			// 	hitbox: t.readState().hitbox
			// })),
			// ...projectiles.map((p) => ({
			// 	id: p.id,
			// 	hitbox: p.readState().hitbox
			// }))
		].map(({ id, hitbox }) => (
			<Hitbox key={id} $hitbox={hitbox}/>
		))
		: [], [ buildings, troops, projectiles ])

	return (
		<BattlefieldContainer
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onTouchStart={onTouchStart}
			onTouchEnd={onTouchEnd}>
			<GridBoard show={SHOW_GRID}/>
			{SHOW_BUILDINGS
			&& state.state !== "waiting"
			&& buildings.map((b: BuildingSerializedState) => {
				switch (b.type) {
					case "barrack":
						return <Barrack key={b.id} barrackState={b}/>
					case "tower":
						return <Tower key={b.id} towerState={b}/>
					default:
						break
				}
			})}

			{troops.map((t: TroopSerializedState) => (
				<Troop key={t.id} troopState={t}/>
			))}

			{projectiles.map((p: ProjectileSerializedState) => (
				<Projectile key={p.id} projectileState={p}/>
			))}
			{hitboxElements}
		</BattlefieldContainer>
	)
}

const BattlefieldContainer = ({ children, ...props }: FlexProps) => (
	<Flex
		width="100%"
		style={{
			position: "relative",
			border: "2px solid var(--color-bitcoinDark)",
			borderRadius: "12px",
			overflow: "hidden",
			flexGrow: 1
		}}
		{...props}>
		{children}
	</Flex>
)

