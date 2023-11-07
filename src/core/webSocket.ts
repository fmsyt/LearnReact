export interface WebSocketConnection {
  protocol: "ws" | "wss",
  hostname: string,
  port: number,
  token: string | null,
}

const defaultProtocol = "ws"
const defaultPort = 5173
const defaultHost = "localhost"

export function toURL(conditions: WebSocketConnection): string {
  const { protocol, hostname, port, token } = conditions;
  return `${protocol}://${hostname}:${port}/ws${token ? `?token=${token}` : ""}`;
}

export const defaultConnection: WebSocketConnection = {
  protocol: defaultProtocol as "ws" | "wss",
  hostname: defaultHost,
  port: defaultPort,
  token: null,
}
