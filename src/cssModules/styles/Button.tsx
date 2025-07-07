import { type JSX } from "react"
import clsx from "clsx"

import { Flex, type FlexProps } from "./Flex"
import styles from "./Button.module.css"

export type ButtonProps = JSX.IntrinsicElements[ "button" ]
	& FlexProps
	& {
		variant?:
			| "default"
			| "bordered"
			| "simple"
			| "contrast"
			| "navigation"
			| "text-branded"
			| "text",
		icon?: boolean,
		bordered?: boolean,
		active?: boolean
	}
export function Button({
	variant = "default",
	icon,
	bordered,
	active,
	className,
	disabled,
	children,
	...props
}: ButtonProps) {
	return (
		<Flex
			as="button"
			justify="center"
			align="center"
			className={clsx(
				styles.button,
				styles[ variant ],
				icon && styles.icon,
				bordered && styles.bordered,
				active && styles.active,
				disabled && styles.disabled,
				className
			)}
			{...props}>
			{typeof children === "string"
				? <span>{children}</span>
				: children
			}
		</Flex>
	)
}

Button.styles = styles
