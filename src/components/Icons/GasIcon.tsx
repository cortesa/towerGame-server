import type { IconProps } from "@/types"

export function GasIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={size}
			height={size}
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}>
			<path d="M3.5 22H15.5"/>
			<path d="M4.5 9H14.5"/>
			<path d="M14.5 22V4C14.5 3.46957 14.2893 2.96086 13.9142 2.58579C13.5391 2.21071 13.0304 2 12.5 2H6.5C5.96957 2 5.46086 2.21071 5.08579 2.58579C4.71071 2.96086 4.5 3.46957 4.5 4V22"/>
			<path d="M14.5 13H16.5C17.0304 13 17.5391 13.2107 17.9142 13.5858C18.2893 13.9609 18.5 14.4696 18.5 15V17C18.5 17.5304 18.7107 18.0391 19.0858 18.4142C19.4609 18.7893 19.9696 19 20.5 19C21.0304 19 21.5391 18.7893 21.9142 18.4142C22.2893 18.0391 22.5 17.5304 22.5 17V9.83C22.5002 9.56609 22.4482 9.30474 22.3469 9.06103C22.2457 8.81732 22.0972 8.59606 21.91 8.41L18.5 5"/>
		</svg>
	)
}

