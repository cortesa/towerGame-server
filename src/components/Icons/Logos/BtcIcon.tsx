import type { IconProps } from "@/types"

export function BtcIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 90 110"
			width={9 * size / 11}
			height={size}
			fill="currentColor"
			{...props}>
			<path d="M 30,10 V 20 H 10 V 30 H 20 V 50 H 10 V 60 H 20 V 80 H 10 v 10 h 20 v 10 H 40 V 90 h 10 v 10 H 60 V 90 H 70 V 80 H 30 V 60 H 70 V 50 H 30 V 30 H 70 V 20 H 60 V 10 H 50 V 20 H 40 V 10 Z M 70,30 V 50 H 80 V 30 Z m 0,30 V 80 H 80 V 60 Z"/>
		</svg>
	)
}
