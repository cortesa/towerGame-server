import type { IconProps } from "@/types"

type StarIconProps = IconProps & {
	filled?: boolean
}
export function StarIcon({
	size = 24,
	filled = false,
	...props
}: StarIconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 130 120"
			width={size}
			height={size * 12 / 13}
			fill="currentColor"
			{...props}>
			<rect width="10" height="10" x="60" y="10"/>
			<rect y="20" x="55" height="10" width="20"/>
			<rect y="30" x="50" height="10" width="10"/>
			<rect width="50" height="10" x="10" y="40"/>
			<rect width="10" height="10" x="20" y="50"/>
			<rect y="60" x="30" height="10" width="20"/>
			<rect y="70" x="40" height="10" width="10"/>
			<rect y="80" x="40" height="10" width="50"/>
			<rect width="20" height="10" x="35" y="90"/>
			<rect width="10" height="10" x="30" y="100"/>
			<rect y="40" x="70" height="10" width="50"/>
			<rect width="10" height="10" x="70" y="30"/>
			<rect y="50" x="100" height="10" width="10"/>
			<rect width="20" height="10" x="80" y="60"/>
			<rect width="10" height="10" x="80" y="70"/>
			<rect y="90" x="75" height="10" width="20"/>
			<rect y="100" x="90" height="10" width="10"/>
			<polygon points="60,25 70,25 70,45 115,45 65,95 15,45 60,45 60,25" visibility={filled ? "visible" : "hidden"}/>
		</svg>
	)
}
