import type { IconProps } from "@/types"

export function ChecklistIcon({ size = 24, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={size}
			height={size}
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}>
			<path d="M3.5 17L5.5 19L9.5 15"/>
			<path d="M3.5 7L5.5 9L9.5 5"/>
			<path d="M13.5 6H21.5"/>
			<path d="M13.5 12H21.5"/>
			<path d="M13.5 18H21.5"/>
		</svg>
	)
}

<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
</svg>
