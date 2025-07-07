import type { IconProps } from "@/types"

export function EarnIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 120 80"
			width={size}
			height={2 * size / 3}
			fill="currentColor"
			{...props}>
			<path d="M 10,70 V 60 H 20 V 50 H 30 V 40 H 40 V 30 H 50 V 40 H 60 V 50 H 70 V 40 H 80 V 30 H 90 V 20 H 70 V 10 h 40 V 50 H 100 V 30 H 90 V 40 H 80 V 50 H 70 V 60 H 60 V 50 H 50 V 40 H 40 V 50 H 30 V 60 H 20 v 10 z"/>
		</svg>
	)
}
