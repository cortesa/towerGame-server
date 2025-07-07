import { useState } from "react"

import { Button, Flex } from "@/cssModules/styles"
import { useGame } from "@/gameState/useGame"

export function GameForm() {
	const { createGame, joinGame } = useGame()
	const [ playerName, setPlayerName ] = useState("")
	const [ gameId, setGameId ] = useState("")

	return (
		<Flex
			gap={20}
			align="center"
			height="168px"
			direction="column"
			justify="center">
			<input
				type="text"
				placeholder="Player name"
				value={playerName}
				onChange={(e) => setPlayerName(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Game ID"
				value={gameId}
				onChange={(e) => setGameId(e.target.value)}
			/>
			<Flex gap={12}>
				<Button
					onClick={() => createGame(playerName, "Patio2")}
					disabled={!playerName || !!gameId }>
					Crear juego
				</Button>
				<Button
					onClick={() => joinGame(playerName, gameId)}
					disabled={!playerName || !gameId}>
					Unirse a juego
				</Button>
			</Flex>
		</Flex>
	)
}
