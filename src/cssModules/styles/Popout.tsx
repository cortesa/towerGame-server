import clsx from "clsx"

import { Flex, type FlexProps } from "./Flex"
import styles from "./Popout.module.css"

export type PopoutProps = FlexProps & {
	withCorn?: boolean,
	// variant?: "default" | "dropdown" | "transparent",
	float?: "left" | "center" | "right",
	anchor?: "top" | "bottom",
	margin?: string,
	disableAnimation?: boolean
}
export function Popout({
	withCorn,
	float = "center",
	anchor = "top",
	margin,
	disableAnimation,
	className,
	style,
	children,
	...props
}: PopoutProps) {
	return (
		<Flex
			className={clsx(
				styles.popout,
				withCorn && styles.corn,
				styles[ `float-${float}` ],
				styles[ `anchor-${anchor}` ],
				!disableAnimation && styles.animated,
				className
			)}
			style={{
				...style,
				[ `margin${anchor === "top" ? "Top" : "Bottom"}` ]: margin
			}}
			{...props}>
			{children}
		</Flex>
	)
}

Popout.styles = styles
