import type { IconProps } from "@/types"

export function BridgeIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={size}
			height={size}
			fill="none"
			stroke="currentcolor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}>
			<path d="M3.5 7C4 7 5.5 6.5 6.5 5C7.5 6.5 9.5 9 12.5 9C15.5 9 17.5 6.5 18.5 5C19.5 6.5 21 7 21.5 7"/>
			<path d="M6.5 4V20"/>
			<path d="M2.5 16H22.5"/>
			<path d="M18.5 4V20"/>
			<path d="M10.5 9V16"/>
			<path d="M14.5 9V16"/>
		</svg>
	)
}

