import type { IconProps } from "@/types"

export function ShuffleIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 120 90"
			width={size}
			height={size * 3 / 4}
			fill="currentColor"
			{...props}>
			<rect width="30" height="10" x="10" y="30"/>
			<rect width="40" height="10" x="70" y="70"/>
			<path d="M 10,70 H 50 V 40 H 60 V 30 H 90 V 20 H 80 V 10 h 10 v 10 h 10 v 10 h 10 V 40 H 100 V 50 H 90 V 60 H 80 V 50 H 90 V 40 H 60 V 70 H 50 V 80 H 10 Z"/>
		</svg>
	)
}
