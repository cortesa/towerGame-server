import type { IconProps } from "@/types"

export function ZapIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={size}
			height={size}
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}>
			<path d="M 35,10 V 20 H 25 V 30 H 15 V 40 H 5 v 20 h 40 v 40 H 55 V 90 H 65 V 80 H 75 V 70 H 85 V 60 H 95 V 40 H 55 V 0 H 45 v 10 z"/>
			<path d="M4.25 13.5L14.75 2.25L12.5 10.5H20.75L10.25 21.75L12.5 13.5H4.25Z"/>
		</svg>
	)
}
