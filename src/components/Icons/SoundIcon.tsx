import type { IconProps } from "@/types"

type SoundIconProps = IconProps & {
	muted?: boolean
}
export function SoundIcon({
	size = 20,
	muted = false,
	...props
}: SoundIconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 150 140"
			width={size}
			height={size * 14 / 15}
			fill="currentColor"
			{...props}
			stroke="none">
			<g visibility={muted ? "hidden" : "visible"}>
				{/* BACKGROUND */}
				<path d="M 10,100 V 40 H 30 V 30 H 40 V 20 H 50 V 10 h 70 v 10 h 10 v 10 h 10 v 80 h -10 v 10 h -10 v 10 H 50 V 120 H 40 V 110 H 30 v -10 z" fill={props.stroke || theme.colors.background}/>
				{/* SOUNDWAVE */}
				<rect y="20" x="80" height="10" width="30"/>
				<rect width="10" height="10" x="110" y="30"/>
				<rect y="40" x="120" height="60" width="10"/>
				<rect width="30" height="10" x="80" y="110"/>
				<rect y="100" x="110" height="10" width="10"/>
				<rect width="20" height="10" x="80" y="40"/>
				<rect width="10" height="40" x="100" y="50"/>
				<rect y="90" x="80" height="10" width="20"/>
				<rect y="60" x="80" height="20" width="10"/>
			</g>
			<g visibility={!muted ? "hidden" : "visible"}>
				{/* BACKGROUND */}
				<path d="M 10,100 V 40 H 30 V 30 H 40 V 20 H 50 V 10 h 30 v 35 h 40 V 95 H 80 v 35 H 50 V 120 H 40 V 110 H 30 v -10 z" fill={props.stroke || theme.colors.background}/>
				{/* X */}
				<rect y="55" x="80" height="10" width="10"/>
				<rect width="10" height="10" x="90" y="65"/>
				<rect width="10" height="10" x="100" y="55"/>
				<rect width="10" height="10" x="80" y="75"/>
				<rect y="75" x="100" height="10" width="10"/>
			</g>
			{/* MEGAPHONE */}
			<path d="m 20,50 v 40 h 20 v 10 h 10 v 10 h 10 v 10 H 70 V 20 H 60 V 30 H 50 V 40 H 40 v 10 z"/>
		</svg>
	)
}
