import { useState, useCallback, useRef, useEffect } from "react"

export function useCopyToClipboard(timeout = 2000) {
	const [ copied, setCopied ] = useState(false)
	const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

	const copy = useCallback((text: string) => {
		if (!navigator?.clipboard) {
			console.warn("Clipboard not supported")
			return false
		}

		clearTimeout(timeoutRef.current)

		navigator.clipboard.writeText(text)
			.then(() => {
				setCopied(true)
				timeoutRef.current = setTimeout(() => setCopied(false), timeout)
			})
			.catch((err) => {
				console.error("Copy failed", err)
				setCopied(false)
			})
	}, [ timeout ])

	useEffect(() => {
		return () => clearTimeout(timeoutRef.current)
	}, [])

	return {
		copy,
		copied
	}
}
