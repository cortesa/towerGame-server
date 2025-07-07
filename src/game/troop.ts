import { svgPathProperties } from "svg-path-properties"

import type { BuildingLevel, IBuilding, ITroop, Team, TroopSerializedState, TroopState } from "../types"

import { TROOP_SPEED } from "./constants"

export class Troop implements ITroop {
	public readonly id: string
	private origin: IBuilding
	private target: IBuilding
	private state: TroopState
	private troopLevel: BuildingLevel

	// SVG path object for smooth movement along the path
	private svgPath: InstanceType<typeof svgPathProperties>

	// Total length of the path
	private totalLength: number

	// How far the troop has traveled along the path
	private travelledDistance: number

	constructor({
		origin,
		target,
		soldiers,
		team,
		svgPath
	}: {
    origin: IBuilding;
    target: IBuilding;
    soldiers: number;
    team: Team;
    svgPath: InstanceType<typeof svgPathProperties>;
  }) {
		this.id = crypto.randomUUID()
		this.origin = origin
		this.target = target
		this.troopLevel = origin.readState("level")
		this.svgPath = svgPath

		this.totalLength = this.svgPath.getTotalLength()
		this.travelledDistance = 0

		const originCount = origin.readState("soldierCount")
		origin.updateSoldierCount(originCount - soldiers)

		const start = origin.readState("position")

		this.state = {
			team,
			soldiers,
			position: start,
			hitbox: {
				x: start.x - 6,
				y: start.y - 6,
				width: 12,
				height: 12,
				entityId: this.id,
				entityType: "troop"
			}
		}
	}

	/**
   * Returns the current state or a specific key from the troop's state.
   */
	public readState(): TroopState;
	public readState<K extends keyof TroopState>(key: K): TroopState[K];
	public readState<K extends keyof TroopState>(key?: K) {
		return key ? this.state[ key ] : { ...this.state }
	}

	/**
	 * Internal helper to update the troop's state with a partial patch.
	 */
	private setState(patch: Partial<TroopState>) {
		Object.assign(this.state, patch)
	}

	/**
  * Returns a flat object representation of the troop state for sending to clients.
  */
	public serialize(): TroopSerializedState {
		return {
			id: this.id,
			team: this.state.team,
			soldiers: this.state.soldiers,
			position: this.state.position,
			hitbox: this.state.hitbox,
			originId: this.origin.id,
			targetId: this.target.id
		}
	}

	/**
   * Updates the soldier count of the troop.
   */
	public updateSoldierCount(soldierCount: number): void {
		this.setState({ soldiers: soldierCount } as Partial<TroopState>)
	}

	public get originId(): string {
		return this.origin.id
	}

	public get targetId(): string {
		return this.target.id
	}

	/**
   * Updates the troop's position along the path.
   * @param deltaTime Time elapsed since last update (in seconds).
   * @returns whether the troop has arrived at its destination.
   */
	public update(deltaTime: number): { arrived: true } | { arrived: false } {
		const speed = TROOP_SPEED[ this.troopLevel ]
		this.travelledDistance += speed * deltaTime

		// If reached the end of path, mark as arrived
		if (this.travelledDistance >= this.totalLength) {
			const pos = this.svgPath.getPointAtLength(this.totalLength)
			this.setState({
				position: {
					x: pos.x,
					y: pos.y
				},
				hitbox: {
					x: pos.x - 6,
					y: pos.y - 6,
					width: 12,
					height: 12,
					entityId: this.id,
					entityType: "troop"
				}
			})
			return { arrived: true }
		}

		// Otherwise, update position along path
		const pos = this.svgPath.getPointAtLength(this.travelledDistance)
		this.setState({
			position: {
				x: pos.x,
				y: pos.y
			},
			hitbox: {
				x: pos.x - 6,
				y: pos.y - 6,
				width: 12,
				height: 12,
				entityId: this.id,
				entityType: "troop"
			}
		})

		return { arrived: false }
	}

	/**
   * Reduces soldier count by the given damage amount.
   */
	public takeDamage(amount: number) {
		this.setState({ soldiers: Math.max(0, this.readState("soldiers") - amount) })
	}

}
