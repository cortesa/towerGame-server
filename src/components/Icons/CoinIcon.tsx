import type { IconProps } from "@/types"

export function CoinIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={size}
			height={size}
			fill="none"
			stroke="currentcolor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}>
			<path d="M18.5 12C20.433 12 22 10.433 22 8.5C22 6.567 20.433 5 18.5 5C16.567 5 15 6.567 15 8.5C15 10.433 16.567 12 18.5 12Z"/>
			<path d="M7.5 22C10.5376 22 13 19.5376 13 16.5C13 13.4624 10.5376 11 7.5 11C4.46243 11 2 13.4624 2 16.5C2 19.5376 4.46243 22 7.5 22Z"/>
			<path d="M7.5 7C8.88071 7 10 5.88071 10 4.5C10 3.11929 8.88071 2 7.5 2C6.11929 2 5 3.11929 5 4.5C5 5.88071 6.11929 7 7.5 7Z"/>
		</svg>
	)
}
