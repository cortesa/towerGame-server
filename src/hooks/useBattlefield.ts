import { useGame } from "@/gameState/useGame"

export function useBattlefield() {
	const { state } = useGame()
	const { battlefield } = state

	const {
		buildings,
		troops,
		projectiles,
		grid
	} = battlefield

	return {
		buildings,
		troops,
		projectiles,
		grid
	}
}
