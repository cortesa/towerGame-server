import type { IconProps } from "@/types"

export function LoginIcon({
	size = 20,
	...props
}: IconProps) {
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

			<path d="M7.75 9V5.25C7.75 4.65326 7.98705 4.08097 8.40901 3.65901C8.83097 3.23705 9.40326 3 10 3H16C16.5967 3 17.169 3.23705 17.591 3.65901C18.0129 4.08097 18.25 4.65326 18.25 5.25V18.75C18.25 19.3467 18.0129 19.919 17.591 20.341C17.169 20.7629 16.5967 21 16 21H10C9.40326 21 8.83097 20.7629 8.40901 20.341C7.98705 19.919 7.75 19.3467 7.75 18.75V15"/>
			<path d="M12.25 9L15.25 12M15.25 12L12.25 15M2.75 12H15.25"/>
		</svg>
	)
}
