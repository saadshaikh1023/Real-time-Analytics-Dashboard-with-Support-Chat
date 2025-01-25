import { io } from "socket.io-client"

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000"

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Number.POSITIVE_INFINITY,
})

socket.on("connect", () => {
  console.log("Connected to socket server")
})

socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error)
})

socket.on("error", (error) => {
  console.error("Socket error:", error)
})

socket.on("disconnect", (reason) => {
  console.log("Disconnected from socket server. Reason:", reason)
})

socket.on("reconnect", (attemptNumber) => {
  console.log("Reconnected to socket server. Attempt number:", attemptNumber)
})

socket.on("reconnect_attempt", (attemptNumber) => {
  console.log("Attempting to reconnect. Attempt number:", attemptNumber)
})

socket.on("reconnect_error", (error) => {
  console.error("Reconnection error:", error)
})

socket.on("reconnect_failed", () => {
  console.error("Failed to reconnect to socket server")
})

// Attempt to connect when the module is imported
socket.connect()

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect()
  }
}

