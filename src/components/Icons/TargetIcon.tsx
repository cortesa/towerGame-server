import type { IconProps } from "@/types"

export function TargetIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			width={size}
			height={size}
			fill="currentColor"
			{...props}>
			<rect y="0" x="20" height="10" width="60"/>
			<rect width="10" height="10" x="80" y="80"/>
			<rect y="10" x="80" height="10" width="10"/>
			<rect y="80" x="10" height="10" width="10"/>
			<rect width="40" height="10" x="30" y="20"/>
			<rect width="20" height="20" x="40" y="40"/>
			<rect width="10" height="10" x="10" y="10"/>
			<rect y="90" x="20" height="10" width="60"/>
			<rect y="70" x="30" height="10" width="40"/>
			<rect y="20" x="0" height="60" width="10"/>
			<rect width="10" height="60" x="90" y="20"/>
			<rect width="10" height="40" x="20" y="30"/>
			<rect y="30" x="70" height="40" width="10"/>
		</svg>
	)
}
