import type { IconProps } from "@/types"

export function RefreshIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 110 120"
			width={size * 11 / 12}
			height={size}
			fill="currentColor"
			{...props}>
			<rect y="10" x="40" height="10" width="10"/>
			<rect width="10" height="10" x="50" y="20"/>
			<rect y="30" x="20" height="10" width="50"/>
			<rect width="10" height="10" x="50" y="40"/>
			<rect y="50" x="40" height="10" width="10"/>
			<rect width="10" height="10" x="60" y="60"/>
			<rect y="70" x="50" height="10" width="10"/>
			<rect width="50" height="10" x="40" y="80"/>
			<rect y="90" x="50" height="10" width="10"/>
			<rect width="10" height="10" x="60" y="100"/>
			<rect y="40" x="90" height="40" width="10"/>
			<rect width="10" height="40" x="10" y="40"/>
			<rect width="10" height="10" x="20" y="80"/>
			<rect y="30" x="80" height="10" width="10"/>
		</svg>
	)
}
