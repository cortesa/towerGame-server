import type { IconProps } from "@/types"

type DropletIconProps = IconProps & {
	filled?: boolean
}
export function DropletIcon({
	size = 20,
	filled = false,
	...props
}: DropletIconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			width={size}
			height={size}
			fill="currentColor"
			{...props}>
			<rect y="10" x="35" height="20" width="10"/>
			<rect y="0" x="45" height="10" width="10"/>
			<rect width="10" height="20" x="25" y="30"/>
			<rect y="50" x="15" height="30" width="10"/>
			<rect width="10" height="10" x="25" y="80"/>
			<rect width="30" height="10" x="35" y="90"/>
			<rect width="10" height="20" x="55" y="10"/>
			<rect y="30" x="65" height="20" width="10"/>
			<rect width="10" height="30" x="75" y="50"/>
			<rect y="80" x="65" height="10" width="10"/>
			<path d="M 25,60 V 80 H 35 V 90 H 65 V 80 H 75 V 60 Z" visibility={filled ? "visible" : "hidden"}/>
		</svg>
	)
}
