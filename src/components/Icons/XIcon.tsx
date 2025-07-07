import type { IconProps } from "@/types"

export function XIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={size}
			height={size}
			fill="none"
			stroke="currentColor"
			{...props}>
			<path d="M18.5 6L6.5 18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
			<path d="M6.5 6L18.5 18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	)
}

