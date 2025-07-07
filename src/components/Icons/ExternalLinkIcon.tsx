import type { IconProps } from "@/types"

export function ExternalLinkIcon({
	size = 20,
	...props
}: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 33 33"
			width={size}
			height={size}
			fill="none"
			stroke="currentcolor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}>
			<path d="M18.333 8.35742H7.33301C6.53736 8.35742 5.7743 8.67349 5.21169 9.2361C4.64908 9.79871 4.33301 10.5618 4.33301 11.3574V25.3574C4.33301 26.1531 4.64908 26.9161 5.21169 27.4787C5.7743 28.0414 6.53736 28.3574 7.33301 28.3574H21.333C22.1287 28.3574 22.8917 28.0414 23.4543 27.4787C24.0169 26.9161 24.333 26.1531 24.333 25.3574V14.3574M10.333 22.3574L28.333 4.35742M28.333 4.35742H21.333M28.333 4.35742V11.3574"/>
		</svg>
	)
}
