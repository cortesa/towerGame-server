import type { IconProps } from "@/types"

export function EmailIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 120 100"
			width={size}
			height={size * 5 / 6}
			fill="currentColor"
			{...props}>
			<path d="M 10,10 V 90 H 110 V 10 Z m 10,10 h 80 V 80 H 20 Z"/>
			<path d="M 30,30 H 40 V 40 H 50 V 50 H 70 V 40 H 80 V 30 H 90 V 40 H 80 V 50 H 70 V 60 H 50 V 50 H 40 V 40 H 30 Z"/>
		</svg>
	)
}
