import { atom, useAtom } from "jotai"

import { useGame } from "@/gameState/useGame"

const selectedAtom = atom<string | null>(null)

export function useBuildingActions() {
	const [ selected, setSelected ] = useAtom(selectedAtom)
	const {
		selectOrigin,
		sendTroop,
		resetSelection
	} = useGame()

	async function handleBuildingClick(buildingId: string | undefined) {

		if (!buildingId) return

		if (selected === buildingId) {
			resetSelection()
			return
		}

		if (selected) {
			sendTroop(buildingId)
			setSelected(null)
			return
		}

		const isSelected = await selectOrigin(buildingId)
		if (isSelected) setSelected(buildingId)
		else setSelected(null)
	}

	return { handleBuildingClick }
}
