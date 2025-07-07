import type { IconProps } from "@/types"

export function EthIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 130 150"
			width={13 * size / 15}
			height={size}
			fill="currentColor"
			{...props}>
			<path d="M 60,10 V 20 H 70 V 10 Z M 70,20 V 30 H 80 V 20 Z M 80,30 V 40 H 90 V 30 Z m 10,10 v 10 h 10 V 40 Z m 10,10 V 60 H 90 v 10 h 30 V 60 H 110 V 50 Z M 90,70 H 70 v 10 h 20 z m 0,10 v 10 h 10 v 10 h 10 V 90 h 10 V 80 Z m 10,20 H 90 v 10 h 10 z M 90,110 H 80 v 10 H 90 Z M 80,120 H 70 v 10 H 80 Z M 70,130 H 60 v 10 h 10 z m -10,0 V 120 H 50 v 10 z M 50,120 V 110 H 40 v 10 z M 40,110 V 100 H 30 v 10 z M 30,100 V 90 H 40 V 80 H 10 v 10 h 10 v 10 z M 40,80 H 60 V 70 H 40 Z M 40,70 V 60 H 30 V 50 H 20 V 60 H 10 V 70 Z M 30,50 H 40 V 40 H 30 Z M 40,40 H 50 V 30 H 40 Z M 50,30 H 60 V 20 H 50 Z M 60,80 V 90 H 70 V 80 Z m 10,10 v 10 H 90 V 90 Z m 0,10 H 60 v 10 h 10 z m -10,0 V 90 H 40 v 10 z"/>
		</svg>
	)
}
