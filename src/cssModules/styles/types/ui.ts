import type { JSX, ReactNode, SVGProps } from "react"

export type ReactChildren = JSX.Element | ReactNode | ReactNode[]

export type GenericSizes =
	| "xxs"
	| "xs"
	| "s"
	| "ms"
	| "m"
	| "ml"
	| "l"
	| "xl"
	| "xxl"

export type GenericRelativeSizes =
	| "tinier"
	| "smaller"
	| "bigger"
	| "larger"

export type Alignment =
	| "stretch"
	| "flex-start"
	| "center"
	| "flex-end"
	| "space-between"
	| "space-around"
	| "space-evenly"

export type IconProps = Omit<SVGProps<SVGElement>, "ref"> & {
	size?: number
}

export type DirectionalIconProps = IconProps & {
	direction?:
		| "up"
		| "upLeft"
		| "left"
		| "downLeft"
		| "down"
		| "downRight"
		| "right"
		| "upRight"
}

export type Sorting<T = string> = {
	key: T,
	direction: "desc" | "asc"
}

export type SortableHeader<T = string> = {
	label: T,
	tooltip?: ReactChildren,
	unsortable?: boolean
}
