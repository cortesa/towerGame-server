import type { IconProps } from "@/types"

export function ArrowsUpDownIcon({
	size = 20,
	...props
}: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 25 25"
			width={size}
			height={size}
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}>
			<path d="M3.5 16.3574L7.5 20.3574L11.5 16.3574"/>
			<path d="M7.5 20.3574V4.35742"/>
			<path d="M21.5 8.35742L17.5 4.35742L13.5 8.35742"/>
			<path d="M17.5 4.35742V20.3574"/>
		</svg>
	)}
