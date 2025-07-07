import styled from "styled-components"

import { Text } from "../styles"

type ProgressBarSegmentedProps = {
	values: number[];
	colors?: string[]; // Optional: one color per segment
};

/**
 * Renders a segmented progress bar based on input values.
 * Each value is represented as a portion of the total.
 */
const DEFAULT_COLORS: string[] = []

export function ProgressBarSegmented(
	{ values, colors = DEFAULT_COLORS }: ProgressBarSegmentedProps
) {
	const total = values.reduce((sum, v) => sum + v, 0)
	return (
		<BarContainer>
			{values.map((value, i) => {
				if (!value) return null
				const width = (value / total) * 100
				const background = colors[ i ] ?? "gray"
				const key = `${value}-${background}-${i}`
				return (
					<Segment
						key={key}
						$width={width}
						$background={background}>
						<Text $fontWeight={700} $color="neutralDark">{value}</Text>
					</Segment>
				)
			})}
		</BarContainer>
	)
}

const BarContainer = styled.div`
	position: relative;
	display: flex;
	width: 100%;
	height: 1.2em;
	background-color: ${({ theme }) => theme.colors.background};
	border-radius: 8px;
	// overflow: hidden;
	
	& > *:first-child {
		border-radius: 8px 0px 0px 8px;
	}
	
	& > *:last-child {
		border-radius: 0px 8px 8px 0px;
	}
	
	&:after {
		content: "";
		position: absolute;
		inset: -5px;
		border-radius: 12px;
		border: 2px solid ${({ theme }) => theme.colors.textDark};
	}
`

const Segment = styled.div<{ $width: number;
$background: string }>`
	width: ${({ $width }) => $width}%;
	background-color: ${({ theme, $background }) => theme.getColor($background)};
	transition: width 0.3s ease;
`
