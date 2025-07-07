import type { IconProps } from "@/types"

export function LombardIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 40 40"
			width={size}
			height={size}
			fill="currentColor"
			stroke="currentColor"
			{...props}>
			<path d="M5.89202 5.93736H13.2545V40H40V13.3467H20.617V19.5464H33.8395V34.0626H19.415V0H0V19.5464H12.0525V13.3467H5.89202V5.93736Z"/>
		</svg>
	)
}
