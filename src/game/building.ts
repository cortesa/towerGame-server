import {
	type BaseBuildingState,
	type BuildingType,
	type Team,
	type TroopArrivalOutcome,
	type BuildingConfig,
	type BuildingLevel,
	type IBuilding,
	type BuildingSerializedState,
	BuildingStatus
} from "../types"


import { calculateLevelFromSoldiers, evaluateUpgradeOption } from "./utils"
import {
	BUILDING_UPGRADE_ETA,
	METERS_TO_PX,
	BUILDING_UPGRADE_DURATION
} from "./constants"

export abstract class Building<
	BuildingState extends BaseBuildingState
> implements IBuilding {
	public readonly id: string
	public readonly buildingType: BuildingType
	private state: BuildingState
	private upgradeCooldownTime: number

	/**
	 * Abstract method representing the main action of the building.
	 * Subclasses must implement this to define their specific behavior.
	 */
	protected abstract buildingAction(...args: unknown[]): void;

	/**
	 * Abstract method called during update lifecycle.
	 * Subclasses should implement this to update internal state or perform periodic checks.
	 * @param deltaTime - (s) The time elapsed since the last update call.
	 */
	protected onUpdate?(deltaTime: number, ...args: unknown[]): void;

	/**
	 * Optional hook called when the building finishes upgrading.
	 * Subclasses can override this to implement custom behavior on upgrade completion.
	 */
	protected onUpgrade?(): void;

	/**
	 * Optional hook called when the building is conquered by an enemy team.
	 * Subclasses can override this to implement custom behavior on conquest.
	 */
	protected onConquered?(): void;

	/**
	 * Optional hook called when the building successfully defends against an attack.
	 * Subclasses can override this to implement custom behavior on defense.
	 */
	protected onDefended?(): void;

	/**
	 * Optional hook called when the building is reinforced by allied troops.
	 * Subclasses can override this to implement custom behavior on reinforcement.
	 */
	protected onReinforced?(): void;

	constructor(buildingType: BuildingType, config: BuildingConfig) {
		this.id = crypto.randomUUID()
		this.buildingType = buildingType
		this.upgradeCooldownTime = BUILDING_UPGRADE_DURATION
		const initialSoldiers = config.initialSoldiers ?? 0
		const level = calculateLevelFromSoldiers(initialSoldiers, config.initialLevel)
		// Default to neutral team if no team is specified
		const team: Team = config.team ?? "neutral"
		const position = {
			x: config.x,
			y: config.y
		}
		this.state = {
			status: BuildingStatus.IDLE,
			position,
			level,
			soldierCount: initialSoldiers,
			team,
			hitbox: {
				x: (config.x ?? 0) - (METERS_TO_PX / 2),
				y: (config.y ?? 0) - (METERS_TO_PX / 2),
				width: METERS_TO_PX,
				height: METERS_TO_PX,
				entityId: this.id,
				entityType: this.buildingType
			},
			canUpgrade: false,
			canChange: false
		} as BuildingState
	}

	/**
	* @param deltaTime Time elapsed since last update, **in seconds**.
 	*/
	private handleUpgrade(deltaTime: number): void {
		this.upgradeCooldownTime -= deltaTime
		if (this.upgradeCooldownTime <= 0) {
			const nextLevel = (this.readState("level") + 1) as BuildingLevel
			this.setState({
				level: nextLevel,
				status: BuildingStatus.IDLE
			} as Partial<BuildingState>)
			this.onUpgrade?.()
		}
	}

	/**
	 * Final method. Should not be overridden in subclasses.
	 * Handles the building update lifecycle by calling `onUpdate` and conditionally `buildingAction`.
	 */
	public update(deltaTime: number, ...args: unknown[]): void {
		const level = this.readState("level")
		this.onUpdate?.(deltaTime, ...args)
		evaluateUpgradeOption(
			this.readState(),
			(
				patch: Partial<BaseBuildingState>
			) => this.setState(patch as Partial<BuildingState>)
		)
				
		if (this.readState("status") === BuildingStatus.UPGRADING) {
			this.handleUpgrade(deltaTime)
		}

		if (this.readState("status") === BuildingStatus.ACTIVE && this.readState("status") !== BuildingStatus.UPGRADING) {
			this.buildingAction(level, ...args)
		}
	}

	/**
	 * Reads the current state or a specific property of the building's state.
	 * @param key Optional key of the state property to read.
	 * @returns The entire state or the value of the specified property.
	 */
	public readState(): BuildingState;
	public readState<K extends keyof BuildingState>(key: K): BuildingState[K];
	public readState<K extends keyof BuildingState>(
		key?: K
	): BuildingState | BuildingState[K] {
		if (key !== undefined) {
			return this.state[ key ] as BuildingState[K]
		}
		return { ...this.state }
	}

	/**
	 * Updates the building's state with the provided partial state.
	 * Protected to restrict direct external modification.
	 * @param patch Partial state to merge into current state.
	 */
	protected setState(patch: Partial<BuildingState>) {
		Object.assign(this.state, patch)
		if (patch.position) {
			this.updateHitbox()
		}
	}

	/**
	 * Serializes the building's public state for transfer or storage.
	 * Can be extended in subclasses to add more properties.
	 */
	public serialize(): BuildingSerializedState {
		return {
			id: this.id,
			status: this.readState("status"),
			type: this.buildingType,
			team: this.readState("team"),
			position: this.readState("position"),
			level: this.readState("level"),
			soldierCount: this.readState("soldierCount"),
			canUpgrade: this.readState("canUpgrade"),
			canChange: this.readState("canChange")
		}
	}

	/**
	 * Updates the soldier count of the building.
	 * @param soldierCount New soldier count to set.
	 */
	public updateSoldierCount(soldierCount: number): void {
		this.setState({ soldierCount } as Partial<BuildingState>)
	}


	/**
	 * Initiates the upgrade process if the building belongs to the given team and meets the requirements.
	 * Deducts the soldier cost and sets the building as upgrading.
	 * @param playerTeam The team attempting to upgrade this building.
	 */
	public startUpgrade(playerTeam: Team) {
		const buildingTeam = this.readState("team")
		const level = this.readState("level")
		const status = this.readState("status")
		
		const canUpgrade =
			this.readState("canUpgrade")
			&& buildingTeam === playerTeam 
			&&(status === BuildingStatus.IDLE || status === BuildingStatus.ACTIVE)
			&& level !== 3

		if (!canUpgrade) return
		
		this.setState({
			soldierCount: this.readState("soldierCount") - BUILDING_UPGRADE_ETA[ level ],
			status: BuildingStatus.UPGRADING
		} as Partial<BuildingState>)
	
		this.upgradeCooldownTime = BUILDING_UPGRADE_DURATION
	}

	public startTypeChange(newType: BuildingType) {
		console.log("ACZ: startTypeChange", newType)
	}

	/**
	 * Handles the arrival of attacking troops at the building.
	 * Updates state based on attack outcome and triggers corresponding hooks.
	 * @param attackingTeam The team of the attacking troops.
	 * @param attackingSoldiers Number of attacking soldiers.
	 * @returns Outcome of the troop arrival: "reinforced", "defended", or "conquered".
	 */
	public onTroopArrival(
		attackingTeam: Team,
		attackingSoldiers: number
	): TroopArrivalOutcome {
		const currentTeam = this.readState("team")
		const currentSoldiers = this.readState("soldierCount")

		if (currentTeam === attackingTeam) {
			this.setState(
				{ soldierCount: currentSoldiers + attackingSoldiers } as Partial<BuildingState>)
			this.onReinforced?.()
			return "reinforced"
		}

		const survivors = currentSoldiers - attackingSoldiers

		if (survivors >= 0) {
			this.setState({ soldierCount: survivors, status: BuildingStatus.IDLE } as Partial<BuildingState>)
			this.onDefended?.()
		} else {
			this.setState({
				team: attackingTeam,
				soldierCount: Math.abs(survivors),
				level: 0,
				status: BuildingStatus.IDLE
			} as Partial<BuildingState>)
			this.onConquered?.()
			return "conquered"
		}

		return "defended"
	}

	/**
	 * Updates the hitbox position based on current building position.
	 */
	protected updateHitbox(): void {
		const { x, y } = this.state.position
		this.state.hitbox = {
			x: x - (METERS_TO_PX / 2),
			y: y - (METERS_TO_PX / 2),
			width: METERS_TO_PX,
			height: METERS_TO_PX,
			entityId: this.id,
			entityType: this.buildingType
		}
	}

}
