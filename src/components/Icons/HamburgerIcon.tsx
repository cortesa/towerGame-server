import type { IconProps } from "@/types"

export function HamburgerIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 120 100"
			width={size}
			height={size * 5 / 6}
			fill="currentColor"
			{...props}>
			<rect x="10" y="10" width="100" height="10"/>
			<rect x="10" y="33.3" width="100" height="10"/>
			<rect x="10" y="56.7" width="100" height="10"/>
			<rect x="10" y="80" width="100" height="10"/>
		</svg>
	)
}
