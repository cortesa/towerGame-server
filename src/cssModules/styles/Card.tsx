import clsx from "clsx"

import { Flex, type FlexProps } from "./Flex"
import { Grid, type GridProps } from "./Grid"
import styles from "./Card.module.css"

export type CardProps = {
	variant?:
		| "default"
		| "light"
		| "dark"
		| "split-top"
		| "split-bottom"
		| "transparent"
}
export const Card = {
	Flex: function({
		variant = "default",
		className,
		children,
		...props
	}: FlexProps & CardProps) {
		return (
			<Flex
				className={clsx(
					styles.card,
					styles[ variant ],
					className
				)}
				{...props}>
				{children}
			</Flex>
		)
	},
	Grid: function({
		variant = "default",
		className,
		children,
		...props
	}: GridProps & CardProps) {
		return (
			<Grid
				className={clsx(
					styles.card,
					styles[ variant ],
					className
				)}
				{...props}>
				{children}
			</Grid>
		)
	},
	styles: styles
}
