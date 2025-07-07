import type { IconProps } from "@/types"

export function DocsIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 110 120"
			width={size * 11 / 12}
			height={size}
			fill="currentColor"
			{...props}>
			<path d="m 10,10 v 100 h 90 V 40 H 90 V 30 H 80 V 40 H 70 V 30 H 80 V 20 H 70 V 10 Z m 10,10 h 40 v 30 h 30 v 50 H 20 Z"/>
			<rect y="40" x="30" height="10" width="20"/>
			<rect width="50" height="10" x="30" y="60"/>
			<rect y="80" x="30" height="10" width="30"/>
		</svg>
	)
}
