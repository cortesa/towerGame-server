import type { IconProps } from "@/types"

export function FastForwardIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 110"
			width={size * 10 / 11}
			height={size}
			fill="currentColor"
			{...props}>
			<path d="M 50,10 H 60 V 20 H 70 V 40 H 80 V 50 H 90 V 60 H 80 V 70 H 70 V 90 H 60 v 10 H 50 V 60 H 40 V 70 H 30 V 90 H 20 v 10 H 10 V 10 h 10 v 10 h 10 v 20 h 10 v 10 h 10 z"/>
		</svg>
	)
}
