import type { IconProps } from "@/types"

export function PlayIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="20 0 60 100"
			width={0.6 * size}
			height={size}
			fill="currentColor"
			{...props}>
			<path d="M 25,5 V 95 H 35 V 85 H 45 V 75 H 55 V 65 H 65 V 55 H 75 V 45 H 65 V 35 H 55 V 25 H 45 V 15 H 35 V 5 Z"/>
		</svg>
	)
}
