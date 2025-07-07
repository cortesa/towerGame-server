import "./App.css"
import styled from "styled-components"

import { Battlefield } from "./components/Battlefield"
import { GameStatics } from "./components/GameStatics"
import { Flex } from "./styles"
import { useSocketInit } from "./gameState/useSocketInit"
import { useGame } from "./gameState/useGame"
import { GameForm } from "./components/GameForm"

function App() {
	const { id } = useGame()

	useSocketInit()

	return (
		<GameContainer
			$column
			$gap={20}>
			{ (
				<>
					{id ? <GameStatics/> : <GameForm/>}
					<Battlefield/>
				</>
			)}
		</GameContainer>
	)
}

export default App

const GameContainer = styled(Flex)`
  position: fixed;
  inset: 20px;
`
