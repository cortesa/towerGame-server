import type {
	IBuilding,
	IProjectile,
	ITroop,
	ProjectileSerializedState,
	ProjectileState,
	Team,
	TowerState
} from "./types"

import { PROJECTILE_SPEED } from "./constants"

export class Projectile implements IProjectile {
	public readonly id: string
	private originTower: IBuilding<TowerState>
	private targetTroop: ITroop
	private state: ProjectileState
	private projectileSpeed: number
	private readonly maxDistance: number

	/**
	 * Initializes a new projectile fired from a tower toward a troop.
	 */
	constructor(originTower: IBuilding<TowerState>, targetTroop: ITroop, team: Team) {
		this.id = crypto.randomUUID()
		this.originTower = originTower
		this.targetTroop = targetTroop
		this.projectileSpeed = PROJECTILE_SPEED[ this.originTower.readState("level") ]
		this.maxDistance = originTower.readState("attackRange") * 1.10
		this.state = {
			team,
			position: { ...originTower.readState().position },
			hitbox: {
				x: originTower.readState().position.x - 4,
				y: originTower.readState().position.y - 4,
				width: 8,
				height: 8,
				entityId: this.id,
				entityType: "projectile"
			}
		}
	}

	/**
	 * Returns the full state or a specific property of the projectile.
	 */
	public readState<K extends keyof ProjectileState>(key?: K) {
		return key ? this.state[ key ] : { ...this.state }
	}

	/**
	 * Applies a partial update to the projectile's internal state.
	 */
	private setState(patch: Partial<ProjectileState>) {
		Object.assign(this.state, patch)
	}

	/**
	 * Serializes the projectile state for client rendering.
	 */
	public serialize(): ProjectileSerializedState {
		return {
			id: this.id,
			team: this.state.team,
			position: this.state.position,
			hitbox: this.state.hitbox,
			originId: this.originTower.id,
			targetId: this.targetTroop.id
		}
	}

	/**
	 * Updates the projectile's position based on elapsed time.
	 * @param deltaTime - (s) The time elapsed since the last update call.
	 * @returns True if the projectile should be destroyed.
	 */
	public update(deltaTime: number): boolean {
		// Get origin, current, and target positions
		const from = this.originTower.readState("position")
		const current = this.readState("position")
		const to = this.targetTroop.readState("position")

		// Calculate direction vector and total distance
		const dx = to.x - from.x

		const dy = to.y - from.y
		const totalDistance = Math.sqrt((dx * dx) + (dy * dy))
		if (totalDistance === 0) return true

		const directionX = dx / totalDistance
		const directionY = dy / totalDistance

		// Move the projectile in the direction of the target
		const moveDistance = this.projectileSpeed * deltaTime
		const newX = current.x + (directionX * moveDistance)
		const newY = current.y + (directionY * moveDistance)

		// Update position and hitbox
		this.setState({
			position: {
				x: newX,
				y: newY
			},
			hitbox: {
				x: newX - 4,
				y: newY - 4,
				width: 8,
				height: 8,
				entityId: this.id,
				entityType: "projectile"
			}
		})

		// Check if the projectile has exceeded its allowed range
		const dxFromOrigin = newX - from.x
		const dyFromOrigin = newY - from.y
		const distanceFromOrigin = Math.sqrt(
			(dxFromOrigin * dxFromOrigin) + (dyFromOrigin * dyFromOrigin)
		)

		if (distanceFromOrigin > this.maxDistance) {
			return true
		}

		return false
	}
}
