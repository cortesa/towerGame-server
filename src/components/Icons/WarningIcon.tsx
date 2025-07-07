import type { IconProps } from "@/types"

export function WarningIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			width={size}
			height={size}
			fill="currentColor"
			{...props}>
			<rect y="5" x="40" height="10" width="20"/>
			<rect width="80" height="10" x="10" y="85"/>
			<rect width="10" height="20" x="0" y="65"/>
			<rect y="25" x="20" height="20" width="10"/>
			<rect width="10" height="10" x="30" y="15"/>
			<rect y="65" x="90" height="20" width="10"/>
			<rect width="10" height="20" x="70" y="25"/>
			<rect y="15" x="60" height="10" width="10"/>
			<rect y="45" x="10" height="20" width="10"/>
			<rect width="10" height="20" x="80" y="45"/>
			<rect width="10" height="10" x="45" y="65"/>
			<rect y="35" x="45" height="20" width="10"/>
		</svg>
	)
}
