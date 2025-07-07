import type { IconProps } from "@/types"

export function MicrowaveIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 38 32"
			width={size}
			height={size * 32 / 38}
			fill="currentColor"
			{...props}>
			<path d="M0.738281 0.438995H37.1055V29.5327H0.738281V0.438995ZM33.4688 25.896V4.07571H4.375V25.896H33.4688Z"/>
			<rect x="8.0957" y="7.52121" width="14.9171" height="14.9171"/>
			<rect x="26.04" y="7.52121" width="3.91507" height="3.89176"/>
			<rect x="26.04" y="18.5466" width="3.91507" height="3.89176"/>
			<rect x="26.04" y="29.5327" width="3.91507" height="2.07051"/>
			<rect x="8.0957" y="29.5327" width="3.91507" height="2.07051"/>
			<rect x="26.04" y="13.034" width="3.91507" height="3.89176"/>
		</svg>
	)
}
