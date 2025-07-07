import type { IconProps } from "@/types"

export function ScrollIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 120 110"
			width={size}
			height={size * 11 / 12}
			fill="currentColor"
			{...props}>
			<rect y="30" x="40" height="10" width="40"/>
			<rect width="40" height="10" x="40" y="50"/>
			<path d="M 30,10 V 20 H 90.000001 V 90 H 100 V 50 h 10 V 20 H 100 V 10 Z"/>
			<path d="M 20,20 H 30 V 70 H 70 V 80 H 20 V 90 H 10 V 70 h 10 z"/>
			<path d="M 20,100 H 90 V 90 H 80 V 80 H 70 V 90 H 20 Z"/>
		</svg>
	)
}
