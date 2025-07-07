import type { BuildingConfig, BaseBuildingState } from "@/types"

import { Building } from "./building"
import { MAX_SOLDIERS_PRODUCTION, SOLDIERS_PRODUCTION_COOLDOWN } from "./constants"

/**
 * Represents a Barrack building that can produce soldiers over time.
 */
export class Barrack extends Building<BaseBuildingState> {
	/** Cooldown timer to control soldier production rate */
	private soldierProductionCooldownTime: number = 0

	/**
   * Creates a new Barrack building and initializes active state based on team.
   * @param config - Configuration object for the building, including team assignment.
   */
	constructor(config: BuildingConfig) {
		super("barrack", config)
		this.setState({ isActive: (config.team || "neutral") !== "neutral" })
	}

	/**
   * Updates the barrack state each frame.
   * Decreases the soldier production cooldown timer based on the elapsed delta time.
   * @param deltaTime - (s) The time elapsed since the last update call.
   */
	protected onUpdate(deltaTime: number): void {
		this.soldierProductionCooldownTime = Math.max(
			0,
			this.soldierProductionCooldownTime - deltaTime
		)
	}

	/**
   * Handles actions to perform when the barrack is conquered.
   * Activates the barrack upon conquest.
   */
	protected onConquered(): void {
		this.setState({ isActive: true })
	}

	/**
   * Initiates the production of a soldier if conditions allow.
   * Increases the soldier count and resets the production cooldown timer.
   */
	public buildingAction(): void {
		if (this.soldierProductionCooldownTime > 0) return
		const newSoldierCount = this.readState("soldierCount") + 1
		if (newSoldierCount > MAX_SOLDIERS_PRODUCTION) return

		this.setState({ soldierCount: newSoldierCount })
		const level = this.readState("level")
		this.soldierProductionCooldownTime = SOLDIERS_PRODUCTION_COOLDOWN[ level ]
	}

}
