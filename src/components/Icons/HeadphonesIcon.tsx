import type { IconProps } from "@/types"

export function HeadphonesIcon({ size = 24, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 110"
			width={size * 10 / 11}
			height={size}
			fill="currentColor"
			{...props}>
			<path d="M 20,10 V 20 H 80 V 10 Z M 80,20 V 40 H 60 V 80 H 70 V 90 H 40 v 10 H 80 V 80 H 90 V 20 Z M 20,20 H 10 V 80 H 40 V 40 H 20 Z m 0,29.261719 h 10 v 20 H 20 Z M 70,50 H 80 V 70 H 70 Z"/>
		</svg>
	)
}
