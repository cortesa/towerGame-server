import type { IconProps } from "@/types"

export function TelegramIcon({
	size = 20,
	strokeWidth = 8,
	...props
}: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			width={size}
			height={size}
			fill="currentColor"
			stroke="currentColor"
			strokeWidth={strokeWidth}
			{...props}>
			<path d="m 10,25 h 15 v -5 h 15 v -5 h 15 v -5 h 25 v 5 h 10 v 22.5 h -5 v 25 H 80 V 85 h -5 v 5 H 50 V 85 H 45 V 80 H 40 V 75 H 35 V 65 H 25 v -5 h -5 v -5 h -5 v -5 h -5 z"/>
			<path d="m 32.5,65 v -5 h 5 v -5 h 5 v -5 h 5 v -5 h 5 V 40 H 60" fill="none" strokeWidth={parseFloat(strokeWidth.toString()) / 2}/>
		</svg>
	)
}
