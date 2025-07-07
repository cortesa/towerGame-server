import type { IconProps } from "@/types"

export function LogoutIcon({
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
			<path d="M16.25 9V5.25C16.25 4.65326 16.0129 4.08097 15.591 3.65901C15.169 3.23705 14.5967 3 14 3H8C7.40326 3 6.83097 3.23705 6.40901 3.65901C5.98705 4.08097 5.75 4.65326 5.75 5.25V18.75C5.75 19.3467 5.98705 19.919 6.40901 20.341C6.83097 20.7629 7.40326 21 8 21H14C14.5967 21 15.169 20.7629 15.591 20.341C16.0129 19.919 16.25 19.3467 16.25 18.75V15M19.25 15L22.25 12M22.25 12L19.25 9M22.25 12H9.5"/>
		</svg>
	)
}
