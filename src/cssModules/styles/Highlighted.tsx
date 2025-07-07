import clsx from "clsx"

import { Flex, type FlexProps } from "./Flex"
import styles from "./Highlighted.module.css"

type HighlightedProps = FlexProps & {
	multiline?: boolean
}
export function Highlighted({
	multiline,
	className,
	children,
	...props
}: HighlightedProps) {
	return (
		<Flex
			className={clsx(
				styles.highlighted,
				multiline && styles.multiline,
				className
			)}
			justify="space-between"
			align={styles.multiline ? "flex-start" : "center"}
			gap={12}
			{...props}>
			{typeof children === "string"
				? <div>{children}</div>
				: children
			}
		</Flex>
	)
}

Highlighted.styles = styles
