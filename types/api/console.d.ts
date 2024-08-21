/// <reference no-default-lib="true"/>

declare global {
	/**
	 * Clears the output of the console window.
	 *
	 * @alias consoleclear
	 *
	 * @example
	 * ```typescript
	 * // Create the console window
	 * rconsolesettitle("New console");
	 * rconsoleprint("Hello, world!");
	 * rconsolecreate();
	 *
	 * // Clears the output "Hello, world!"
	 * rconsoleclear();
	 * ```
	 */
	function rconsoleclear(): void;

	/**
	 * Clears the output of the console window.
	 * @alias rconsoleclear
	 */
	function consoleclear(): void;

	/**
	 * Opens the console window. Text previously output to the console will not be cleared.
	 *
	 * @alias consolecreate
	 *
	 * @example
	 * ```typescript
	 * // Create the console window
	 * rconsolesettitle("Beautiful Mountains");
	 * rconsolecreate();
	 *
	 * function generate() {
	 *     // Generate a random decimal number for noise
	 *     const seed = math.random(100, 999) + math.random();
	 *
	 *     // Prints 25 lines of text
	 *     for (let i = 1; i <= 25; i++) {
	 *         const noise = math.noise(i / 8, seed) + 0.5;
	 *         const height = math.floor(noise * 50);
	 *         const line = "*".repeat(height);
	 *         rconsoleprint(line + "\n");
	 *     }
	 *
	 *     // Prompts the user to generate a new set of mountains
	 *     // or exit the console window
	 *     rconsoleprint("\nEnter 'Y' to generate a new landscape, or nothing to exit\n");
	 *
	 *     const input = rconsoleinput();
	 *
	 *     if (input.toLowerCase() === "y") {
	 *         rconsoleclear();
	 *         generate();
	 *     } else {
	 *         rconsoledestroy();
	 *     }
	 * }
	 *
	 * generate();
	 * ```
	 */
	function rconsolecreate(): void;

	/**
	 * Opens the console window. Text previously output to the console will not be cleared.
	 * @alias rconsolecreate
	 */
	function consolecreate(): void;

	/**
	 * Closes the console window and clears its output. The title will not be changed.
	 *
	 * @alias consoledestroy
	 *
	 * @example
	 * ```typescript
	 * // Create a console window titled "New console" and with the output "Hello, world!"
	 * rconsolesettitle("New console");
	 * rconsoleprint("Hello, world!");
	 * rconsolecreate();
	 *
	 * // Close the console window, clearing its output
	 * rconsoledestroy();
	 *
	 * // Reopen the console window titled "New console" with no output
	 * rconsolecreate();
	 * ```
	 */
	function rconsoledestroy(): void;

	/**
	 * Closes the console window and clears its output. The title will not be changed.
	 * @alias rconsoledestroy
	 */
	function consoledestroy(): void;

	/**
	 * Waits for the user to input text into the console window. Returns the result.
	 *
	 * @returns The user's input as a string.
	 *
	 * @alias consoleinput
	 *
	 * @example
	 * ```typescript
	 * // Create the console window
	 * rconsolesettitle("Your Info");
	 * rconsoleprint("What is your name?\nMy name is: ");
	 * rconsolecreate();
	 *
	 * // Retrieve the user's input
	 * const name = rconsoleinput();
	 * rconsoleprint("Hello, " + name + "!");
	 *
	 * // Cleanup
	 * task.wait(1);
	 * rconsoledestroy();
	 * ```
	 */
	function rconsoleinput(): string;

	/**
	 * Waits for the user to input text into the console window. Returns the result.
	 * @alias rconsoleinput
	 */
	function consoleinput(): string;

	/**
	 * Prints `text` to the console window. Does not clear existing text or create a new line.
	 *
	 * @param text - The text to append to the output.
	 *
	 * @alias consoleprint
	 *
	 * @example
	 * ```typescript
	 * // Create a console window titled "New console" with the
	 * // output "Hello, world!! How are you today?"
	 * rconsolesettitle("New console");
	 * rconsoleprint("Hello, world!");
	 * rconsoleprint("! How are you today?");
	 * rconsolecreate();
	 * ```
	 */
	function rconsoleprint(text: string): void;

	/**
	 * Prints `text` to the console window. Does not clear existing text or create a new line.
	 * @alias rconsoleprint
	 */
	function consoleprint(text: string): void;

	/**
	 * Sets the title of the console window to `title`.
	 *
	 * @param title - The new title.
	 *
	 * @alias rconsolename
	 * @alias consolesettitle
	 *
	 * @example
	 * ```typescript
	 * // Create a console window titled "My console"
	 * rconsolesettitle("My console");
	 * rconsolecreate();
	 * ```
	 */
	function rconsolesettitle(title: string): void;

	/**
	 * Sets the title of the console window to `title`.
	 * @alias rconsolesettitle
	 */
	function rconsolename(title: string): void;

	/**
	 * Sets the title of the console window to `title`.
	 * @alias rconsolesettitle
	 */
	function consolesettitle(title: string): void;
}

export {};
