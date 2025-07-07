import type { IconProps } from "@/types"

export function FarmerIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			width={size}
			height={size}
			fill="currentColor"
			{...props}>
			<rect y="22.5" x="5" height="10" width="10"/>
			<rect width="10" height="10" x="15" y="32.5"/>
			<path d="m 25,42.5 h 50 v 10 H 65 v 40 H 55 v -20 H 45 v 20 H 35 v -40 H 25 Z"/>
			<rect y="32.5" x="75" height="10" width="10"/>
			<rect width="10" height="10" x="85" y="22.5"/>
			<path d="m 42.5,37.5 h 15 V 25 H 65 V 15 H 57.5 V 7.5 h -15 V 15 H 35 v 10 h 7.5 z"/>
		</svg>
	)
}
