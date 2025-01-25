import { EventEmitter } from "events"

class MockSocket extends EventEmitter {
  private static instance: MockSocket
  private _connected = false

  private constructor() {
    super()
    this.connect()
  }

  static getInstance(): MockSocket {
    if (!MockSocket.instance) {
      MockSocket.instance = new MockSocket()
    }
    return MockSocket.instance
  }

  connect() {
    setTimeout(() => {
      this._connected = true
      this.emit("connect")
    }, 1000)
  }

  disconnect() {
    this._connected = false
    this.emit("disconnect")
  }

  get connected() {
    return this._connected
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(event: string, ...args: any[]): boolean {
    setTimeout(() => {
      super.emit(event, ...args)
    }, Math.random() * 1000)
    return true
  }
}

export const socket = MockSocket.getInstance()

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect()
  }
}

