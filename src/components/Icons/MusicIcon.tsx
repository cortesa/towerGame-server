import type { IconProps } from "@/types"

export function MusicIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			width={size}
			height={size}
			fill="currentColor"
			{...props}>
			<path d="M 35,15 H 90 V 35 H 35 Z"/>
			<rect y="55" x="15" height="25" width="25" fill="none" stroke={props.fill || "currentColor"} strokeWidth="10"/>
			<rect width="25" height="25" x="60" y="55" fill="none" stroke={props.fill || "currentColor"} strokeWidth="10"/>
			<path d="M 35,20 H 45 V 50 H 35 Z"/>
			<path d="M 80,20 H 90 V 50 H 80 Z"/>
		</svg>
	)
}
