/// <reference no-default-lib="true"/>

/**
 * Represents a WebSocket connection.
 */
interface WebSocket {
	/**
	 * Sends a message over the WebSocket connection.
	 *
	 * @param message - The message to send.
	 */
	Send(message: string): void;

	/**
	 * Closes the WebSocket connection.
	 */
	Close(): void;

	/**
	 * Fired when a message is received over the WebSocket connection.
	 */
	OnMessage: RBXScriptSignal<(message: string) => void>;

	/**
	 * Fired when the WebSocket connection is closed.
	 */
	OnClose: RBXScriptSignal<() => void>;
}

declare global {
	/**
	 * The WebSocket namespace provides methods for creating and managing WebSocket connections.
	 */
	namespace WebSocket {
		/**
		 * Establishes a WebSocket connection to the specified URL.
		 *
		 * @param url - The URL to connect to.
		 * @returns A new WebSocket instance.
		 *
		 * @example
		 * ```typescript
		 * const ws = WebSocket.connect("ws://localhost:8080");
		 *
		 * ws.OnMessage.Connect((message) => {
		 *     print(message);
		 * });
		 *
		 * ws.OnClose.Connect(() => {
		 *     print("Closed");
		 * });
		 *
		 * ws.Send("Hello, World!");
		 * ```
		 */
		function connect(url: string): WebSocket;
	}
}

export {};
