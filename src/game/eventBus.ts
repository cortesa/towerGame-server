import type { IPlayer, ITroop } from "@/types"

export type GameEventMap = {
	"troop:created": ITroop;
	"player:joined": IPlayer;
}

export const allowedGameEvents: (keyof GameEventMap)[] = [
	"troop:created",
	"player:joined"
]

export class EventBus<Events extends Record<string, any>> {
	private handlers: Map<keyof Events, Set<(payload: any) => void>> = new Map()
	private readonly allowedEvents: Set<string>

	constructor() {
		this.allowedEvents = new Set(allowedGameEvents as string[])
	}

	private assertValidEvent(event: keyof Events): asserts event is keyof Events {
		if (!this.allowedEvents.has(event as string)) {
			throw new Error(`Invalid event name: "${String(event)}"`)
		}
	}

	/**
	 * Registers a handler for a given event.
	 */
	on<K extends keyof Events>(event: K, handler: (payload: Events[K]) => void): void {
		this.assertValidEvent(event as string)
		if (!this.handlers.has(event)) {
			this.handlers.set(event, new Set())
		}
		this.handlers.get(event)!.add(handler as (payload: any) => void)
	}

	/**
	 * Emits an event and calls all subscribed handlers with the payload.
	 */
	emit<K extends keyof Events>(event: K, payload: Events[K]): void {
		// console.log("ACZ event", event, payload)
		this.assertValidEvent(event as string)
		this.handlers.get(event)?.forEach(handler => handler(payload))

	}

	/**
	 * Removes a handler from a given event.
	 */
	off<K extends keyof Events>(event: K, handler: (payload: Events[K]) => void): void {
		this.assertValidEvent(event as string)
		this.handlers.get(event)?.delete(handler as (payload: any) => void)
	}
}
