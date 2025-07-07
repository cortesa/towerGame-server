import type { IconProps } from "@/types"

type EyeIconProps = IconProps & {
	closed?: boolean
}
export function EyeIcon({
	size = 20,
	closed = false,
	...props
}: EyeIconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 140 100"
			width={size}
			height={size * 5 / 7}
			fill="currentColor"
			{...props}>
			<rect x="10" y="45" width="10" height="10"/>
			<rect x="20" y="55" width="10" height="10"/>
			<rect x="30" y="65" width="20" height="10"/>
			<rect x="50" y="75" width="40" height="10"/>
			<rect x="90" y="65" width="20" height="10"/>
			<rect x="110" y="55" width="10" height="10"/>
			<rect x="120" y="45" width="10" height="10"/>

			<g visibility={closed ? "hidden" : "visible"}>
				<rect x="20" y="35" width="10" height="10"/>
				<rect x="30" y="25" width="20" height="10"/>
				<rect x="50" y="15" width="40" height="10"/>
				<rect x="90" y="25" width="20" height="10"/>
				<rect x="110" y="35" width="10" height="10"/>
				<rect x="60" y="40" width="20" height="20"/>
			</g>
			<g visibility={closed ? "visible" : "hidden"}>
				<rect x="20" y="75" width="10" height="10"/>
				<rect x="40" y="85" width="10" height="10"/>
				<rect x="90" y="85" width="10" height="10"/>
				<rect x="110" y="75" width="10" height="10"/>
			</g>
		</svg>
	)
}
