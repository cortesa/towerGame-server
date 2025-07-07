import type { IconProps } from "@/types"

export function ClockIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={size * 22 / 23}
			height={size}
			fill="none"
			stroke="currentcolor"
			strokeWidth="2"
			{...props}>
			<path d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z"/>
			<path d="M12.5 7V12L15.7135 14.9005"/>
		</svg>
	)
}
