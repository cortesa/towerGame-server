import type { IconProps } from "@/types"

type LockIconProps = IconProps & {
	unlocked?: boolean
}
export function LockIcon({
	size = 20,
	unlocked = false,
	...props
}: LockIconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			width={size}
			height={size}
			fill="currentColor"
			{...props}>
			<rect width="10" height="20" x="45" y="55"/>
			<path d="m 35,7.5 v 10 h 30 v -10 z m 30,10 v 20 H 15 v 55 h 70 v -55 H 75 v -20 z m -40,30 h 50 v 35 H 25 Z"/>
			<rect y="17.5" x="25" height="20" width="10" visibility={unlocked ? "hidden" : "visible"}/>
			<rect width="10" height="10" x="25" y="17.5" visibility={!unlocked ? "hidden" : "visible"}/>
		</svg>
	)
}
