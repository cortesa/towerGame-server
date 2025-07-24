import type { Troop } from "./troop"

import {
	type BuildingConfig,
	type Hitbox,
	type IBuilding,
	type BuildingSerializedState,
	type TowerState,
	BuildingStatus
} from "../types"
import { Building } from "./building"
import { TOWER_ATTACK_COOLDOWN, TOWER_ATTACK_RANGE } from "./constants"
import { Projectile } from "./projectile"
import { intersects } from "./utils"

/**
 * Represents a Tower building that can attack enemy troops within range.
 */
export class Tower extends Building<TowerState> implements IBuilding<TowerState> {
	// Time left before the tower can attack again
	private attackCooldownTime: number = 0

	// Closest troop currently within range
	private closestTroopInRange: Troop | null = null

	// Callback to notify when a projectile is created
	public onProjectileCreated?: (projectile: Projectile) => void

	/**
	 * Creates a new Tower instance.
	 * @param config - The configuration for the building.
	 */
	constructor(config: BuildingConfig) {
		super("tower", config)
		this.setState({ status: BuildingStatus.IDLE })
		this.recalculateAttackZone()
	}

	/**
	 * Serializes the Tower state, including attack range and zone.
	 */
	public override serialize(): BuildingSerializedState<{
		attackRange: number,
		attackZone: Hitbox
}> {
		return {
			...super.serialize(),
			attackRange: this.readState("attackRange"),
			attackZone: this.readState("attackZone")
		}
	}

	/**
	 * Finds all enemy troops within the tower's attack zone.
	 */
	private findTroopsInRange(troops: Troop[]): Troop[] {
		const { team, attackZone } = this.readState()
		return troops.filter(t => {
			const state = t.readState()
			return state.team !== team
			&& state.soldiers > 0
			&& intersects(attackZone, state.hitbox)
		})
	}

	/**
	 * Called each frame to update the tower's state.
	 */
	protected onUpdate(deltaTime: number, troops: Troop[]): void {

		this.attackCooldownTime = Math.max(0, this.attackCooldownTime - deltaTime)
		const inRange = this.findTroopsInRange(troops)
		this.closestTroopInRange = inRange[ 0 ] ?? null
		if (this.closestTroopInRange) {
			this.setState({ status: BuildingStatus.ACTIVE })
		}
	}

	/**
	 * Called when the tower is upgraded.
	 */
	protected onUpgrade(): void {
		this.recalculateAttackZone()
	}

	/**
	 * Called when the tower is conquered by another team.
	 */
	protected onConquered(): void {
		this.recalculateAttackZone()
	}

	/**
	 * Performs the tower's attack action if cooldown has elapsed and a target is available.
	 */
	public buildingAction(): void {
		if (this.attackCooldownTime > 0 || !this.closestTroopInRange) {
			this.setState({ status: BuildingStatus.IDLE })
			return
		}

		if (this.onProjectileCreated) {
			const to = this.closestTroopInRange
			const team = this.readState("team")
			this.onProjectileCreated(new Projectile(this, to, team))
		}
		const level = this.readState("level")
		this.attackCooldownTime =
		TOWER_ATTACK_COOLDOWN[ level ]
		this.closestTroopInRange = null
	}

	/**
	 * Recalculates the attack zone based on the tower's level and position.
	 */
	private recalculateAttackZone(): void {
		const level = this.readState("level")
		const range = TOWER_ATTACK_RANGE[ level ]
		const position = this.readState("position")
		this.setState({
			attackRange: range,
			attackZone: {
				x: position.x - range,
				y: position.y - range,
				width: range * 2,
				height: range * 2,
				entityId: this.id,
				entityType: "tower"
			}
		})
	}
}

