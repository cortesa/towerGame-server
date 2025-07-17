const INITIAL_TICK = 0
const INITIAL_TPS = 25

export class Ticker {
	// Timestamp of the last update (in milliseconds)
	private lastTime = performance.now()

	// Whether the ticker is currently running
	private running = false

	// Callback function to invoke on each tick
	private callback: ((deltaTime: number) => void) | null = null

	// Number of ticks that have occurred since start
	private tick = INITIAL_TICK
	private dt = 0

	// Target ticks per second
	private tps = INITIAL_TPS

	// Whether the ticker is paused
	private paused = false

	private nextTimeout: NodeJS.Timeout | null = null

	/**
	 * Starts the ticker loop.
	 */
	start() {
		if (this.running) return
		this.running = true
		this.lastTime = performance.now()
		this._scheduleNextTick()
	}

	/**
	 * Stops the ticker loop.
	 */
	stop() {
		this.running = false
		if (this.nextTimeout) {
			clearTimeout(this.nextTimeout)
			this.nextTimeout = null
		}
	}

	/**
	 * Resets the tick count and timestamp.
	 */
	reset() {
		this.tick = INITIAL_TICK
		this.lastTime = performance.now()
	}

	/**
	 * Registers a callback to execute on each update.
	 * @param callback Receives deltaTime in seconds
	 */
	public on(callback: (deltaTime: number) => void) {
		this.callback = callback
	}

	/**
	 * Sets the desired ticks per second.
	 */
	public setTPS(tps: number) {
		this.tps = tps
	}

	/**
	 * Pauses or resumes the ticker.
	 */
	public setPaused(paused: boolean) {
		this.paused = paused
	}

	/**
	 * Returns the current tick count.
	 */
	public getTick() {
		return {
			tick: this.tick,
			deltaTime: this.dt
		}
	}

	private _tick = () => {
		if (this.paused) return

		const now = performance.now()
		const dt = (now - this.lastTime) / 1000 // Delta time in seconds

		this.lastTime = now
		this.tick += 1
		this.dt = dt
		if (this.callback) {
			this.callback(dt)
		}
	}

	private _scheduleNextTick() {
		const interval = 1000 / this.tps
		this.nextTimeout = setTimeout(() => {
			this._tick()
			if (this.running) {
				this._scheduleNextTick()
			}
		}, interval)
	}
}
