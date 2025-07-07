import { type JSX } from "react"
import clsx from "clsx"

import type { GenericRelativeSizes, GenericSizes } from "@/types"

import styles from "./Text.module.css"

export type TextProps = JSX.IntrinsicElements[ "div" ] & {
	as?: string,
	width?: string,
	height?: string,
	padding?: string | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48,
	color?: string,
	textAlign?: "left" | "center" | "right",
	// fontFamily?: string,
	fontSize?: GenericSizes | GenericRelativeSizes,
	fontWeight?: number | "bold" | "bolder" | "normal" | "light" | "lighter",
	whiteSpace?: "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line" | "break-spaces",
	textOverflow?: "normal" | "ellipsis" | "clip",
	textTransform?: "uppercase" | "capitalize" | "lowercase" | "none",
	textDecoration?: "none" | "underline" | "overline" | "line-through"
	letterSpacing?: string,
	lineHeight?: string,
	fontStyle?: "normal" | "italic",
	flexGrow?: number,
	flexShrink?: number,
	inline?: boolean,
	truncate?: "s" | "m" | "l",
	hidden?: boolean
}
export function Text({
	width,
	height,
	padding,
	color,
	textAlign,
	fontSize,
	fontWeight,
	whiteSpace,
	textOverflow,
	textTransform,
	textDecoration,
	letterSpacing,
	lineHeight,
	fontStyle,
	flexGrow,
	flexShrink,
	inline,
	truncate,
	children,
	className,
	style,
	hidden,
	...props
}: TextProps) {
	return (
		<div
			className={clsx(
				width === "100%" && styles[ "full-width" ],
				height === "100%" && styles[ "full-height" ],
				typeof padding === "number" && styles[ `padding-${padding}` ],
				!!fontSize && styles[ `font-size-${fontSize}` ],
				textAlign && styles[ `text-align-${textAlign}` ],
				fontWeight && styles[ `font-weight-${fontWeight}` ],
				whiteSpace && styles[ `font-style-${whiteSpace}` ],
				textOverflow && styles[ `font-style-${textOverflow}` ],
				textTransform && styles[ `font-style-${textTransform}` ],
				textDecoration && styles[ `font-style-${textDecoration}` ],
				fontStyle && styles[ `font-style-${fontStyle}` ],
				color,
				truncate && styles[ `truncate-breakpoint-${truncate}` ],
				inline && styles.inline,
				className,
				hidden && `hidden`
			)}
			style={{
				width: width === "100%" ? undefined : width,
				height: height === "100%" ? undefined : height,
				padding: typeof padding === "number" ? undefined : padding,
				letterSpacing,
				lineHeight,
				flexGrow,
				flexShrink,
				...style
			}}
			{...props}>
			{children}
		</div>
	)
}

Text.styles = styles
