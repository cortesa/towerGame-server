import { type JSX } from "react"
import clsx from "clsx"

import type { Alignment } from "./types"

import { Text, type TextProps } from "./Text"
import styles from "./Flex.module.css"

export type FlexProps = JSX.IntrinsicElements[ "div" ]
	& TextProps
	& {
		direction?: "row" | "row-reverse" | "column" | "column-reverse",
		column?: boolean,
		justify?: Alignment,
		align?: Alignment,
		wrap?: boolean,
		gap?: 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48
	}
export function Flex({
	direction,
	column,
	justify,
	align,
	wrap,
	gap,
	truncate,
	className,
	children,
	...props
}: FlexProps) {
	return (
		<Text
			className={clsx(
				styles.flex,
				column && styles.column,
				direction && styles[ direction ],
				justify && styles[ `justify-${justify}` ],
				align && styles[ `align-${align}` ],
				gap && styles[ `gap-${gap}` ],
				wrap && styles.wrap,
				truncate && styles[ `truncate-breakpoint-${truncate}` ],
				className
			)}
			{...props}>
			{children}
		</Text>
	)
}

Flex.Centered = CenteredFlex
Flex.styles = styles

function CenteredFlex({ children, ...props }: Omit<FlexProps, "justify" | "align">) {
	return (
		<Flex
			{...props}
			justify="center"
			align="center">
			{children}
		</Flex>
	)
}
