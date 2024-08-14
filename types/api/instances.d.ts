type Callback = (...args: any[]) => any;
type ClickDetectorEvents = "MouseClick" | "RightMouseClick" | "MouseHoverEnter" | "MouseHoverLeave";

declare global {
	/**
	 * Dispatches a click or hover event to the given ClickDetector.
	 *
	 * @param object The ClickDetector to dispatch to.
	 * @param distance Optional distance to the object. Defaults to zero.
	 * @param event Optional event to fire. Defaults to "MouseClick".
	 *
	 * @remarks
	 * Possible input events include 'MouseClick', 'RightMouseClick', 'MouseHoverEnter', and 'MouseHoverLeave'.
	 *
	 * @example
	 * ```typescript
	 * const clickDetector = workspace.Door.Button.ClickDetector;
	 * fireclickdetector(clickDetector, 10 + Math.random(), "MouseClick");
	 * ```
	 */
	function fireclickdetector(object: ClickDetector, distance?: number, event?: ClickDetectorEvents): void;

	/**
	 * Returns the function assigned to a callback property of `object`, which cannot be indexed normally.
	 *
	 * @param object The object to get the callback property from.
	 * @param property The name of the callback property.
	 * @returns The callback function, or undefined if not found.
	 *
	 * @example
	 * ```typescript
	 * const bindable = new Instance("BindableFunction");
	 * bindable.OnInvoke = () => {
	 *     print("Hello, world!");
	 * };
	 *
	 * print(getcallbackvalue(bindable, "OnInvoke")); // Prints the function
	 * print(bindable.OnInvoke); // Throws an error
	 * ```
	 */
	function getcallbackvalue(object: Instance, property: string): Callback | undefined;

	/**
	 * Creates a list of Connection objects for the functions connected to `signal`.
	 *
	 * @param signal The signal to retrieve connections from.
	 * @returns An array of Connection objects.
	 *
	 * @example
	 * ```typescript
	 * const connections = getconnections(game.DescendantAdded);
	 * for (const connection of connections) {
	 *     connection.Disable();
	 * }
	 * ```
	 */
	function getconnections(signal: RBXScriptSignal): Connection[];

	/**
	 * Represents a connection to a signal.
	 */
	interface Connection {
		/** Whether the connection can receive events. */
		Enabled: boolean;
		/** Whether the function was connected by a foreign Luau state (i.e. CoreScripts). */
		ForeignState: boolean;
		/** Whether the connection was created in Luau code. */
		LuaConnection: boolean;
		/** The function bound to this connection. Null when `ForeignState` is true. */
		Function: Callback | undefined;
		/** The thread that created the connection. Null when `ForeignState` is true. */
		Thread: unknown | undefined;

		/**
		 * Fires this connection with the provided arguments.
		 * @param args Any arguments to pass to the connection.
		 */
		Fire(...args: any[]): void;

		/**
		 * Defers an event to connection with the provided arguments.
		 * @see https://devforum.roblox.com/t/beta-deferred-lua-event-handling/1240569
		 * @param args Any arguments to pass to the connection.
		 */
		Defer(...args: any[]): void;

		/** Disconnects the connection. */
		Disconnect(): void;

		/** Prevents the connection from firing. */
		Disable(): void;

		/** Allows the connection to fire if it was previously disabled. */
		Enable(): void;
	}

	/**
	 * Returns a `rbxasset://` content id for the asset located at `path`, allowing you to use unmoderated assets.
	 * @param path The path to the asset.
	 * @param noCache Whether or not to cache the asset.
	 * @returns A string representing the content id.
	 *
	 * @remarks
	 * Internally, files are copied to the game's content directory.
	 * If `noCache` is false, the file will be cached, allowing subsequent calls to return the same content id.
	 *
	 * @example
	 * ```typescript
	 * const image = new Instance("ImageLabel");
	 * image.Image = getcustomasset("image.png");
	 * print(image.Image);
	 * ```
	 */
	function getcustomasset(path: string, noCache: boolean): string;

	/**
	 * Returns the value of a hidden property of `object`, which cannot be indexed normally.
	 *
	 * If the property is hidden, the second return value will be `true`. Otherwise, it will be `false`.
	 *
	 * @param object The object to index.
	 * @param property The name of the hidden property.
	 * @returns A tuple containing the property value and a boolean indicating if it's hidden.
	 *
	 * @example
	 * ```typescript
	 * const fire = new Instance("Fire");
	 * print(gethiddenproperty(fire, "size_xml")); // Output: [5, true]
	 * print(gethiddenproperty(fire, "Size")); // Output: [5, false]
	 * ```
	 */
	function gethiddenproperty<V>(object: Instance, property: string): LuaTuple<[V, boolean]>;

	/**
	 * Sets the value of a hidden property of `object`, which cannot be set normally.
	 *
	 * @param object The object to index.
	 * @param property The name of the hidden property.
	 * @param value The value to set.
	 * @returns A boolean indicating whether the property was hidden.
	 *
	 * @example
	 * ```typescript
	 * const fire = new Instance("Fire");
	 * print(sethiddenproperty(fire, "Size", 5)); // false (not hidden)
	 * print(sethiddenproperty(fire, "size_xml", 15)); // true (hidden)
	 * print(gethiddenproperty(fire, "size_xml")); // [15, true] (hidden)
	 * ```
	 */
	function sethiddenproperty(object: Instance, property: string, value: any): boolean;

	/**
	 * Returns a hidden GUI container.
	 *
	 * @returns A Folder instance representing the hidden GUI container.
	 *
	 * @remarks
	 * Should be used as an alternative to CoreGui and PlayerGui.
	 * GUI objects parented to this container will be protected from common detection methods.
	 *
	 * @example
	 * ```typescript
	 * const gui = new Instance("ScreenGui");
	 * gui.Parent = gethui();
	 * ```
	 */
	function gethui(): Instance;

	/**
	 * Returns a list of every Instance referenced on the client.
	 *
	 * @returns An array of Instance objects.
	 *
	 * @example
	 * ```typescript
	 * const objects = getinstances();
	 * let gameCount = 0;
	 * let miscCount = 0;
	 * for (const object of objects) {
	 *      if (object.IsDescendantOf(game)) gameCount++;
	 *      else miscCount++;
	 * }
	 * print(gameCount); // The number of objects in the `game` hierarchy.
	 * print(miscCount); // The number of objects outside of the `game` hierarchy.
	 * ```
	 */
	function getinstances(): Instance[];

	/**
	 * Returns a list of Instances that are not descendants of a service provider.
	 *
	 * @returns An array of Instances not descending from a service provider.
	 *
	 * @example
	 * ```typescript
	 * const objects = getnilinstances();
	 * for (const object of objects) {
	 *     if (object.IsA("LocalScript")) print(object, "is a LocalScript");
	 * }
	 * ```
	 */
	function getnilinstances(): Instance[];

	/**
	 * Returns whether the given property is scriptable (does not have the `notscriptable` tag).
	 *
	 * @param object The object to index.
	 * @param property The name of the property.
	 * @returns A boolean indicating if the property is scriptable, or undefined if it doesn't exist.
	 *
	 * @remarks
	 * If `true`, the property is scriptable and can be indexed normally.
	 * If `undefined`, the property does not exist.
	 */

	function isscriptable(object: Instance, property: string): boolean | undefined;

	/**
	 * Set whether the given property is scriptable.
	 *
	 * @param object The object to index.
	 * @param property The name of the property.
	 * @param value Whether the property should be scriptable.
	 * @returns A boolean indicating whether the property was scriptable prior to changing it.
	 */
	function setscriptable(object: Instance, property: string, value: boolean): boolean;

	/**
	 * Sets the Studio client's clipboard to the given `rbxm` or `rbxmx` model data.
	 *
	 * @param data The model data to copy to the clipboard.
	 * @returns A boolean indicating success.
	 *
	 * @remarks
	 * This allows data from the game to be copied into a Studio client.
	 *
	 * @example
	 * ```typescript
	 * const data = readfile("model.rbxm");
	 * setrbxclipboard(data); // Can be pasted into Studio
	 * ```
	 */
	function setrbxclipboard(data: string): boolean;
}
export {};
