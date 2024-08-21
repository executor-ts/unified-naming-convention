/// <reference no-default-lib="true"/>

declare global {
	/**
	 * Returns the name and version of the current executor.
	 *
	 * @returns A tuple containing the name and version of the executor.
	 *
	 * @alias getexecutorname
	 */
	function identifyexecutor(): LuaTuple<[string, string]>;

	/**
	 * Returns the name and version of the current executor.
	 * @alias identifyexecutor
	 */
	function getexecutorname(): LuaTuple<[string, string]>;

	/**
	 * Compresses `data` using LZ4 compression.
	 *
	 * @param data - The uncompressed data.
	 * @returns The compressed data as a string.
	 *
	 * @example
	 * ```typescript
	 * const text = "Hello, world! Hello, world! Goodbye, world!";
	 * print(text.size()); // 43
	 * print(lz4compress(text).size()); // 34
	 * ```
	 */
	function lz4compress(data: string): string;

	/**
	 * Decompresses `data` using LZ4 compression, with the decompressed size specified by `size`.
	 *
	 * @param data - The compressed data.
	 * @param size - The size of the decompressed data.
	 * @returns The decompressed data as a string.
	 *
	 * @example
	 * ```typescript
	 * const text = "Hello, world! Hello, world!";
	 * const compressed = lz4compress(text);
	 * print(lz4decompress(compressed, text.size())); // "Hello, world! Hello, world!"
	 * ```
	 */
	function lz4decompress(data: string, size: number): string;

	/**
	 * Creates a message box with the specified text, caption, and flags. Yields until the message box is closed, and returns the user input code.
	 *
	 * Documentation regarding the flags and return codes can be found [here](https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-messagebox).
	 *
	 * @param text - The text to display in the message box.
	 * @param caption - The caption of the message box.
	 * @param flags - The flags to use.
	 * @returns The user input code.
	 *
	 * @example
	 * ```typescript
	 * const MB_ICONWARNING = 0x00000030;
	 * const MB_CANCELTRYCONTINUE = 0x00000006;
	 * const MB_DEFBUTTON2 = 0x00000100;
	 *
	 * const IDCANCEL = 0x00000002;
	 * const IDTRYAGAIN = 0x00000004;
	 * const IDCONTINUE = 0x00000005;
	 *
	 * const input = messagebox(
	 *     "Resource not available\nDo you want to try again?",
	 *     "Resource not found",
	 *     bit32.bor(MB_ICONWARNING, MB_CANCELTRYCONTINUE, MB_DEFBUTTON2)
	 * );
	 *
	 * if (input === IDCANCEL) {
	 *     print("Canceled");
	 * } else if (input === IDTRYAGAIN) {
	 *     print("Try again");
	 * } else if (input === IDCONTINUE) {
	 *     print("Continue");
	 * }
	 * ```
	 */
	function messagebox(text: string, caption: string, flags: number): number;

	/**
	 * Queues the specified script to be executed after the player teleports to a different place.
	 *
	 * @param code - The script to execute.
	 *
	 * @alias queueonteleport - Will supercede this function in the future.
	 *
	 * @example
	 * ```typescript
	 * const source = game.GetObjects("rbxassetid://1234")[0].Source;
	 * queue_on_teleport(source);
	 * loadstring(source)();
	 * ```
	 */
	function queue_on_teleport(code: string): void;

	/**
	 * Queues the specified script to be executed after the player teleports to a different place.
	 * @alias queue_on_teleport
	 */
	function queueonteleport(code: string): void;

	interface HttpRequest {
		Url: string;
		Method: "GET" | "POST" | "PATCH" | "PUT";
		Body?: string;
		Headers?: Record<string, string>;
		Cookies?: Record<string, string>;
	}

	interface HttpResponse {
		Body: string;
		StatusCode: number;
		StatusMessage: string;
		Success: boolean;
		Headers: Record<string, string>;
	}

	/**
	 * Sends an HTTP request using the specified options. Yields until the request is complete, and returns the response.
	 *
	 * @param options - The options to use.
	 * @returns The HTTP response.
	 *
	 * @alias http.request
	 * @alias http_request
	 *
	 * @example
	 * ```typescript
	 * const response = request({
	 *     Url: "http://example.com/",
	 *     Method: "GET",
	 * });
	 *
	 * print(`${response.StatusCode} - ${response.StatusMessage}`); // 200 - HTTP/1.1 200 OK
	 * ```
	 */
	function request(options: HttpRequest): HttpResponse;

	/**
	 * Copies `text` to the clipboard.
	 *
	 * @param text - The text to copy.
	 *
	 * @alias toclipboard
	 *
	 * @example
	 * ```typescript
	 * const character = game.GetService("Players").LocalPlayer.Character;
	 * const components = table.pack(...character.PrimaryPart.CFrame.GetComponents());
	 * setclipboard(`CFrame.new(${components.join(", ")})`);
	 * ```
	 */
	function setclipboard(text: string): void;

	/**
	 * Copies `text` to the clipboard.
	 * @alias setclipboard
	 */
	function toclipboard(text: string): void;

	/**
	 * Sets the in-game FPS cap to `fps`. If `fps` is 0, the FPS cap is disabled.
	 *
	 * @param fps - The FPS cap.
	 *
	 * @example
	 * ```typescript
	 * setfpscap(0); // Unlocks the FPS cap
	 * ```
	 */
	function setfpscap(fps: number): void;
}

export {};
