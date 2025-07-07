import type { DirectionalIconProps } from "@/types"

const transform: Record<string, string | undefined> = {
	up: undefined,
	downRight: "rotate(135, 12, 12)",
	downLeft: "rotate(-135, 12, 12)",
	right: "rotate(90, 12, 12)",
	upRight: "rotate(45, 12, 12)",
	upLeft: "rotate(-45, 12, 12)",
	down: "rotate(180, 12, 12)",
	left: "rotate(-90, 12, 12)"
}

export function ChevronIcon({
	size = 20,
	direction = "right",
	...props
}: DirectionalIconProps) {
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
			fill="transparent"
			{...props}>
			<g transform={transform[ direction ]}>
				<path d="M5 15.75L12.5 8.25L20 15.75" transform="translate(-0.5, 0)"/>
			</g>
		</svg>
	)
}
