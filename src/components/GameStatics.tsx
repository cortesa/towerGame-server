import styled, { css, keyframes } from "styled-components"
import { useAtomValue } from "jotai"

import type { Team } from "../game/types"
import { useGame as useGameAction } from "@/gameState/useGame"
import { Flex, Button } from "@/cssModules/styles"
import { localPlayerAtom } from "@/gameState/atoms"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"

import { CenteredFlex, ProgressBar, Text } from "../styles"
import { ProgressBarSegmented } from "./ProgressBarSegmented"
import { CheckIcon, CopyIcon } from "./Icons"

export function GameStatics() {

	const { copy, copied } = useCopyToClipboard()

	const localPlayer = useAtomValue(localPlayerAtom)
	const {
		id,
		state,
		createGame,
		setPlayerRatio
	} = useGameAction()

	return (
		<Flex
			gap={20}
			align="center"
			height="168px">
			{state.gameResult.status === "ended" && (
				<ResultBanner
					$team={localPlayer?.team as Team}>
					<Text
						$fontSize="xxl"
						$fontWeight={900}
						$textTransform="uppercase">
						{state.gameResult.status}
					</Text>
				</ResultBanner>
			)}
			<Flex
				column
				gap={8}
				justify="center"
				width="150px"
				height="100%">
				{localPlayer
					? (<>
						<CenteredFlex
							$column
							$fontSize="l"
							$grow={1}
							$color={localPlayer.team as string}>
							<Text
								$fontSize="xl"
								$fontWeight={700}
								$textTransform="capitalize">
								{`${localPlayer.name}`}
							</Text>
							<Text
								$fontSize="m"
								$textTransform="capitalize">
								{`${localPlayer.team}`}
							</Text>
						</CenteredFlex>
						<Flex
							column
							gap={12}>
							<ProgressBar
								$color="blue"
								$size="sm"
								$progress={Number(localPlayer.attackRatio)}>
								<Text
									$color="text"
									$fontSize="m"
									$fontWeight={700}>
									{`${(Number(localPlayer.attackRatio) * 100)}%`}
								</Text>
							</ProgressBar>
							<Flex justify="space-between">
									&nbsp;
									&nbsp;
								<HotKey
									$team={localPlayer.team as Team}
									onClick={() => setPlayerRatio(0.25)}
									$pushed={localPlayer.attackRatio === 0.25}>1
								</HotKey>
								<HotKey
									$team={localPlayer.team as Team}
									onClick={() => setPlayerRatio(0.50)}
									$pushed={localPlayer.attackRatio === 0.50}>2
								</HotKey>
								<HotKey
									$team={localPlayer.team as Team}
									onClick={() => setPlayerRatio(0.75)}
									$pushed={localPlayer.attackRatio === 0.75}>3
								</HotKey>
								<HotKey
									$team={localPlayer.team as Team}
									onClick={() => setPlayerRatio(1.00)}
									$pushed={localPlayer.attackRatio === 1.00}>4
								</HotKey>
							</Flex>

						</Flex>
					</>)
					: (<Button
						onClick={() => createGame("Paco", "Patio")}>
					Create Game
					</Button>)
				}
			</Flex>
			<Divider/>
			<Flex
				column
				width="100%"
				gap={20}>
				<Flex
					gap={12}>
					<Text>Game Id:</Text>
					{id && <Button variant="text" onClick={() => copy(id || "")}>{id} &nbsp; {copied ? <CheckIcon/> : <CopyIcon/>}</Button>}

				</Flex>
				<ProgressBarSegmented
					values={state.soldiersPerTeam.filter(({ team }) => team !== "neutral" || 0)
						.map(team => team.soldierCount)}
					colors={state.soldiersPerTeam.filter(({ team }) => team !== "neutral")
						.map(team => team.team)}
				/>
			</Flex>
		</Flex>
	)
}

const Divider = styled.div`
	border: 1px solid ${({ theme }) => theme.colors.backgroundLight};
	height: 100%;

`
const HotKey = styled(Text).attrs<{ $pushed: boolean;
$team: Team }>(props => ({
	$fontSize: "s",
	$lineHeight: "150%",
	...props
}))`
	border: 1px solid ${({ theme }) => theme.colors.text};
	border-radius: 8px;
	width: 20px;
	aspect-ratio: 1 / 1;

	&:hover {
		cursor: pointer;
	}

	${({ $pushed, $team, theme }) => $pushed &&
		css`
			animation: ${keyframes`
				from {
					background-color: ${theme.colors[ $team ]};
				to {
					background-color: transparent;
				}
			`} 1s forwards;
		`}
`

const ResultBanner = styled(CenteredFlex)<{ $team: Team }>`
	position: fixed;
	inset: 0px;
	background: ${({ theme, $team }) => theme.colors[ $team as keyof typeof theme.colors ]};
	z-index: 4;
`
