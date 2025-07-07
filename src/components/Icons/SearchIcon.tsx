import type { IconProps } from "@/types"

export function SearchIcon({ size = 20, ...props }: IconProps) {
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
			<path d="M21.4998 20.9998L16.3028 15.8028M16.3028 15.8028C17.7094 14.3962 18.4996 12.4885 18.4996 10.4993C18.4996 8.51011 17.7094 6.60238 16.3028 5.19581C14.8962 3.78923 12.9885 2.99902 10.9993 2.99902C9.01011 2.99902 7.10238 3.78923 5.69581 5.19581C4.28923 6.60238 3.49902 8.51011 3.49902 10.4993C3.49902 12.4885 4.28923 14.3962 5.69581 15.8028C7.10238 17.2094 9.01011 17.9996 10.9993 17.9996C12.9885 17.9996 14.8962 17.2094 16.3028 15.8028Z"/>
		</svg>
	)
}
