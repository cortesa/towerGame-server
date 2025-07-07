import type { IconProps } from "@/types"

export function CrosshairIcon({ size = 24, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 130 130"
			width={size}
			height={size}
			fill="currentColor"
			stroke="currentColor"
			strokeWidth="2"
			{...props}>
			<rect width="10" height="10" x="60" y="60"/>
			<path d="M 60,10 V 20 H 40 V 30 H 30 V 40 H 20 V 60 H 10 v 10 h 10 v 20 h 10 v 10 h 10 v 10 h 20 v 10 H 70 V 110 H 90 V 100 H 70 l 0,-10 h -10 L 60,100 H 40 V 90 H 30 L 30,70 H 40 V 60 H 30 l 0,-20 h 10 V 30 H 60 l 0,10 h 10 L 70,30 H 90 V 20 H 70 V 10 Z M 90,30 V 40 H 100 V 30 Z M 100,40 100,60 H 90 V 70 H 100 l 0,20 H 110 V 70 h 10 V 60 H 110 V 40 Z M 90,90 v 10 H 100 V 90 Z"/>
		</svg>
	)
}
