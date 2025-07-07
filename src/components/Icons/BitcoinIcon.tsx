import type { IconProps } from "@/types"

export function BitcoinIcon({ size = 20, ...props }: IconProps) {
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
			<path d="M11.7669 19.089C16.6909 19.957 17.9069 13.064 12.9829 12.195M11.7669 19.089L5.85986 18.047M11.7669 19.089L11.4209 21.059M9.04386 11.501L12.9839 12.195C17.9079 13.064 19.1239 6.17 14.1989 5.302L8.28986 4.26M14.1979 5.302L14.5459 3.332M7.47986 20.364L10.6059 2.637"/>
		</svg>
	)
}
