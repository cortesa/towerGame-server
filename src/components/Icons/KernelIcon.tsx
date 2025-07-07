import type { IconProps } from "@/types"

type KernelIconProps = IconProps & {
	filled?: boolean
}
export function KernelIcon({
	size = 20,
	filled = false,
	...props
}: KernelIconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			width={size}
			height={size}
			fill="currentColor"
			{...props}>
			<rect y="5" x="30" height="10" width="40"/>
			<rect width="10" height="10" x="20" y="15"/>
			<rect y="25" x="10" height="40" width="10"/>
			<rect y="65" x="20" height="10" width="10"/>
			<rect width="10" height="10" x="30" y="75"/>
			<rect y="85" x="40" height="10" width="20"/>
			<rect y="55" x="30" height="10" width="10"/>
			<rect width="20" height="10" x="40" y="45"/>
			<rect y="15" x="70" height="10" width="10"/>
			<rect width="10" height="40" x="80" y="25"/>
			<rect width="10" height="10" x="70" y="65"/>
			<rect y="75" x="60" height="10" width="10"/>
			<rect width="10" height="10" x="60" y="55"/>
			<path d="M 20,65 V 25 H 30 V 15 H 70 V 25 H 80 V 65 H 70 V 55 H 60 V 45 H 40 V 55 H 30 v 10 z" visibility={filled ? "visible" : "hidden"} stroke="currentColor" strokeWidth="2"/>
		</svg>
	)
}
