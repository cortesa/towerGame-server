import type { IconProps } from "@/types"

export function EditIcon({ size = 20, ...props }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			width={size}
			height={size}
			fill="currentColor"
			{...props}>
			<rect y="82.5" x="10" height="5" width="80"/>
			<path d="m 65,12.5 v 5 h -5 v 5 h 5 v 5 h 5 v 5 h 5 v -5 h 5 v -5 h -5 v -5 h -5 v -5 z m 5,20 h -5 v 5 h 5 z m -5,5 h -5 v 5 h 5 z m -5,5 h -5 v 5 h 5 z m -5,5 h -5 v 5 h 5 z m -5,5 h -5 v 5 h 5 z m -5,5 h -5 v 5 h 5 z m -5,5 h -5 v -5 h -5 v -5 h -5 v 5 h -5 v 15 h 15 v -5 h 5 z m -10,-10 h 5 v -5 h -5 z m 5,-5 h 5 v -5 h -5 z m 5,-5 h 5 v -5 h -5 z m 5,-5 h 5 v -5 h -5 z m 5,-5 h 5 v -5 h -5 z m 5,-5 h 5 v -5 h -5 z"/>
		</svg>
	)
}
