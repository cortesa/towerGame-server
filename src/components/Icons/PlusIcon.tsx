import type { IconProps } from "@/types"

export function PlusIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			width={size}
			height={size}
			fill="currentColor"
			{...props}>
			<path d="M 45,10 H 55 V 45 H 90 V 55 H 55 V 90 H 45 V 55 H 10 V 45 h 35 z"/>
		</svg>
	)
}
