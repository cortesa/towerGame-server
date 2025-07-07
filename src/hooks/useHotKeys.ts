import { useEffect } from "react"

type HotKeyMap = {
	[key: string]: () => void;
}

/**
 * Listen to key presses and execute callbacks defined in the map.
 * @param hotKeys - Object where each key corresponds to a handler
 */
export function useHotKeys(hotKeys: HotKeyMap): void {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const callback = hotKeys[ event.key ]
			if (callback) {
				event.preventDefault()
				callback()
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	}, [ hotKeys ])
}
