import type { IconProps } from "@/types"

export function BarChartIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			width={size}
			height={size}
			fill="currentColor"
			{...props}>
			<rect y="10" x="42.5" height="80" width="15"/>
			<rect width="15" height="50" x="72.5" y="40"/>
			<rect y="60" x="12.5" height="30" width="15"/>
		</svg>
	)
}
