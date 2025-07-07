import type { IconProps } from "@/types"

export function MediumIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 190 100"
			width={size}
			height={size * 10 / 19}
			fill="currentColor"
			{...props}>
			<path d="M 10,30 V 70 H 20 V 80 H 30 V 90 H 70 V 80 H 80 V 70 H 90 V 30 H 80 V 20 H 70 V 10 H 30 V 20 H 20 v 10 z"/>
			<path d="m 130,10 h -20 v 10 h -10 v 60 h 10 v 10 h 20 V 80 h 10 V 20 h -10 z"/>
			<path d="m 170,10 h -10 v 10 h -10 v 60 h 10 v 10 h 10 V 80 h 10 V 20 h -10 z"/>
		</svg>
	)
}
