import { type JSX } from "react"
import clsx from "clsx"

import type { Alignment } from "@/types"

import { Text, type TextProps } from "./Text"
import styles from "./Grid.module.css"

export type GridProps = JSX.IntrinsicElements[ "div" ]
	& TextProps
	& {
		columns?: string,
		rows?: string,
		justify?: Alignment,
		align?: Alignment,
		gap?: 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48
	}
export function Grid({
	columns,
	rows,
	justify,
	align,
	gap,
	truncate,
	className,
	style,
	children,
	...props
}: GridProps) {
	return (
		<Text
			as="div"
			className={clsx(
				styles.grid,
				justify && styles[ `justify-${justify}` ],
				align && styles[ `align-${align}` ],
				gap && styles[ `gap-${gap}` ],
				truncate && styles[ `truncate-breakpoint-${truncate}` ],
				className
			)}
			style={{
				gridTemplateColumns: columns,
				gridTemplateRows: rows,
				...style
			}}
			{...props}>
			{children}
		</Text>
	)
}

Grid.styles = styles
