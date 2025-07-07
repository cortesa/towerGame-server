import type { Team } from "./basic"
import type { IBattlefield } from "./battlefield"
import type { IPlayer } from "./player"
import type { Ticker } from "../game/ticker"

export type GameState = {
		state: "waiting" | "ongoing" | "ended",
		winner?: Team
		battlefield: IBattlefield;
		players: Map<string, IPlayer>;
		mapPlayers: number;
		ticker: Ticker;
		soldiersPerTeam: {
			team: string,
			soldierCount: number
		}[];
		gameResult: {
			status: "waiting" | "ongoing" | "ended",
			winner?: Team
		};
	}
