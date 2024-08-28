/// <reference no-default-lib="true"/>

declare global {
	/**
	 * Returns whether the game's window is in focus. Must be true for other input functions to work.
	 * @alias isgameactive
	 * @returns Whether the game's window is in focus.
	 */
	function isrbxactive(): boolean;

	/**
	 * Returns whether the game's window is in focus. Must be true for other input functions to work.
	 * @alias isrbxactive
	 * @returns Whether the game's window is in focus.
	 */
	function isgameactive(): boolean;

	/**
	 * Dispatches a left mouse button click.
	 */
	function mouse1click(): void;

	/**
	 * Dispatches a left mouse button press.
	 */
	function mouse1press(): void;

	/**
	 * Dispatches a left mouse button release.
	 */
	function mouse1release(): void;

	/**
	 * Dispatches a right mouse button click.
	 */
	function mouse2click(): void;

	/**
	 * Dispatches a right mouse button press.
	 */
	function mouse2press(): void;

	/**
	 * Dispatches a right mouse button release.
	 */
	function mouse2release(): void;

	/**
	 * Moves the mouse cursor to the specified absolute position.
	 * @param x The x-coordinate to move the mouse to.
	 * @param y The y-coordinate to move the mouse to.
	 */
	function mousemoveabs(x: number, y: number): void;

	/**
	 * Adjusts the mouse cursor by the specified relative amount.
	 * @param x The amount to move the mouse cursor horizontally.
	 * @param y The amount to move the mouse cursor vertically.
	 */
	function mousemoverel(x: number, y: number): void;

	/**
	 * Dispatches a mouse scroll by the specified number of pixels.
	 *
	 * @param pixels The number of pixels to scroll the mouse.
	 */
	function mousescroll(pixels: number): void;

	/**
	 * Simulates a keycode press with the virtual key code.
	 * @remarks Keycodes can be found [here](https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes)
	 * @param key virtual key code to press
	 */
	function keypress(key: number): void;

	/**
	 * Simulates a keycode release with the virtual key code.
	 * @remarks Keycodes can be found [here](https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes)
	 * @param key virtual key code to release
	 */
	function keyrelease(key: number): void;
}
export {};
