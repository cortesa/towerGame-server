import type { IconProps } from "@/types"

export function ReturnArrowIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			width={size}
			height={size}
			fill="currentColor"
			{...props}>
			<rect y="80" x="60" height="10" width="20"/>
			<rect width="10" height="40" x="80" y="40"/>
			<rect width="70" height="10" x="10" y="30"/>
			<rect width="10" height="10" x="20" y="20"/>
			<rect y="10" x="30" height="10" width="10"/>
			<rect y="50" x="30" height="10" width="10"/>
			<rect width="10" height="10" x="20" y="40"/>
		</svg>
	)
}
