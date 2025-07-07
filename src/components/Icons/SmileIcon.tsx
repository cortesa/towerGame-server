import type { IconProps } from "@/types"

type SmileIconProps = IconProps & {
	filled?: boolean,
	sad?: boolean
}
export function SmileIcon({
	size = 20,
	filled = false,
	sad = false,
	...props
}: SmileIconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			width={size}
			height={size}
			fill="currentColor"
			{...props}>
			<rect width="60" height="10" x="20" y="80"/>
			<rect width="10" height="60" x="10" y="20"/>
			<rect y="20" x="80" height="60" width="10"/>
			<rect y="10" x="20" height="10" width="60"/>

			<g visibility={filled ? "hidden" : "visible"}>
				<rect y="30" x="30" height="10" width="10"/>
				<rect width="10" height="10" x="60" y="30"/>
				{!sad
					? (<g>
						<rect width="10" height="10" x="25" y="50"/>
						<rect y="50" x="65" height="10" width="10"/>
						<rect y="60" x="35" height="10" width="30"/>
					</g>)
					: (<g>
						<rect width="10" height="10" x="25" y="60"/>
						<rect y="60" x="65" height="10" width="10"/>
						<rect y="50" x="35" height="10" width="30"/>
					</g>)
				}
			</g>

			<path d="M 20 20 L 20 80 L 80 80 L 80 20 L 20 20 z M 30 30 L 40 30 L 40 40 L 30 40 L 30 30 z M 60 30 L 70 30 L 70 40 L 60 40 L 60 30 z M 25 50 L 35 50 L 35 60 L 65 60 L 65 50 L 75 50 L 75 60 L 65 60 L 65 70 L 35 70 L 35 60 L 25 60 L 25 50 z " visibility={filled ? "visible" : "hidden"}/>
		</svg>
	)
}
