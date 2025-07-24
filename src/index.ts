import express from "express"
import cors from "cors"
import { createServer } from "http"
import { Server } from "socket.io"

import { gamesManager } from "./gamesManager"

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get("/", (_, res) => {
	res.send("TowerGame server is running.")
})

const httpServer = createServer(app)

const io = new Server(httpServer, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
})

gamesManager.register(io)

httpServer.listen(PORT, () => {
	console.log(`🚀 Server running at http://localhost:${PORT}`)
})
