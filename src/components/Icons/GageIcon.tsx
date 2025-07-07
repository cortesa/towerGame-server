import type { IconProps } from "@/types"

export function GageIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 130 90"
			width={size}
			height={size * 9 / 13}
			fill="currentColor"
			{...props}>
			<rect y="50" x="55" height="20" width="20"/>
			<rect width="10" height="30" x="10" y="40"/>
			<rect y="70" x="20" height="10" width="10"/>
			<rect width="10" height="10" x="20" y="30"/>
			<rect y="20" x="30" height="10" width="20"/>
			<rect width="30" height="10" x="50" y="10"/>
			<rect y="40" x="110" height="30" width="10"/>
			<rect width="10" height="10" x="100" y="70"/>
			<rect y="40" x="75" height="10" width="10"/>
			<rect width="10" height="10" x="85" y="30"/>
			<rect y="20" x="95" height="10" width="10"/>
		</svg>
	)
}
