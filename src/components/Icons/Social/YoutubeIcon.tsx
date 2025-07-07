import type { IconProps } from "@/types"

export function YoutubeIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 80"
			width={size}
			height={size * 4 / 5}
			fill="currentColor"
			{...props}>
			<path d="M 20 10 L 20 20 L 10 20 L 10 60 L 20 60 L 20 70 L 80 70 L 80 60 L 90 60 L 90 20 L 80 20 L 80 10 L 20 10 z M 40 27.5 L 45 27.5 L 45 32.5 L 55 32.5 L 55 37.5 L 65 37.5 L 65 42.5 L 55 42.5 L 55 47.5 L 45 47.5 L 45 52.5 L 40 52.5 L 40 27.5 z "/>
		</svg>
	)
}
