/// <reference no-default-lib="true"/>

type Callback = (...args: any[]) => any;

declare namespace roblox_debug {
	function traceback(message?: string, level?: number): string;
	function traceback(thread: thread, message?: string, level?: number): string;
	function profilebegin(profileName: string): void;
	function profileend(): void;

	/**
	 * Allows programmatic inspection of the call stack.
	 *
	 * - `thread` (thread) - Optional. A thread as returned by `coroutine.create`. To use the current thread, omit this
	 * entirely (don’t pass `nil`).
	 * - `functionOrLevel` - Either a `function` or `number` to describe the point at which information from the call
	 * stack information should be returned.
	 *   - A value of `1` represents the function which is calling `debug.info`. `2` represents the function that called
	 * that function, and so on. Out-of-bounds values will result in no values returned.
	 * - `options` - A string that represents the information to be returned. It must contain exactly 0 or 1 of each of
	 * the following characters and no others: `slnaf`
	 *   - `s` - `string`. The function source identifier, equal to the full name of the script the function is defined
	 * in
	 *   - `l` - `number`. If `functionOrLevel` is a function, the line the function is defined on. If `functionOrLevel`
	 * is a number (examining a stack frame), the line number of the function call
	 *   - `n` - `string`. The name of the function, may be nil for anonymous functions and C functions without an
	 * assigned debug name.
	 *   - `a` - `number`, `boolean`. Arity of the function, which refers to the parameter count and whether the function
	 * is variadic.
	 *   - `f` - `function`. The function which was inspected.
	 *
	 * This function differs from `debug.traceback` in that it guarantees the format of the data it returns. This is
	 * useful not only for general logging and filtering purposes, but also for sending the data to systems expecting
	 * structured input, such as crash aggregation.
	 *
	 * This function is similar to `debug.getinfo`, an unavailable part of the standard Lua library which serves a
	 * similar purpose.
	 */
	function info<T extends string>(
		thread: thread,
		functionOrLevel: Callback | number,
		options: T,
	): T extends `${infer A}${infer B}${infer C}${infer D}${infer E}${infer _}`
		? LuaTuple<TS.InfoFlags<[A, B, C, D, E]>>
		: T extends `${infer A}${infer B}${infer C}${infer D}${infer _}`
			? LuaTuple<TS.InfoFlags<[A, B, C, D]>>
			: T extends `${infer A}${infer B}${infer C}${infer _}`
				? LuaTuple<TS.InfoFlags<[A, B, C]>>
				: T extends `${infer A}${infer B}${infer _}`
					? LuaTuple<TS.InfoFlags<[A, B]>>
					: T extends `${infer A}${infer _}`
						? LuaTuple<TS.InfoFlags<[A]>>
						: LuaTuple<[unknown, unknown, unknown, unknown, unknown]>;
	function info<T extends string>(
		functionOrLevel: Callback | number,
		options: T,
	): T extends `${infer A}${infer B}${infer C}${infer D}${infer E}${infer _}`
		? LuaTuple<TS.InfoFlags<[A, B, C, D, E]>>
		: T extends `${infer A}${infer B}${infer C}${infer D}${infer _}`
			? LuaTuple<TS.InfoFlags<[A, B, C, D]>>
			: T extends `${infer A}${infer B}${infer C}${infer _}`
				? LuaTuple<TS.InfoFlags<[A, B, C]>>
				: T extends `${infer A}${infer B}${infer _}`
					? LuaTuple<TS.InfoFlags<[A, B]>>
					: T extends `${infer A}${infer _}`
						? LuaTuple<TS.InfoFlags<[A]>>
						: LuaTuple<[unknown, unknown, unknown, unknown, unknown]>;

	/**
	 * Assigns a custom tag name to the current thread's memory category in the Developer Console. Useful for analyzing memory usage of multiple threads in the same script which would otherwise be grouped together under the same tag/name.
	 */
	function setmemorycategory(tag: string): void;
	/**
	 * Resets the tag assigned by `debug.setmemorycategory` to the automatically assigned value (typically, the script name).
	 */
	function resetmemorycategory(): void;
}

declare global {
	/**
	 * Returns a list of objects in the Luau garbage collector.
	 *
	 * @param includeTables - Whether or not to include tables in the list.
	 * @returns An array of functions, userdata, or tables.
	 */
	function getgc<I extends boolean = false>(includeTables?: I): Array<I extends true ? unknown : Callback>;

	/**
	 * Returns the custom global environment of the executor.
	 * It can be used to add global functions or share variables between scripts.
	 *
	 * @returns An object representing the custom global environment.
	 *
	 * @example
	 * ```typescript
	 * if (getgenv().__IS_LOADED) {
	 *     error("This script is already loaded!");
	 * }
	 *
	 * getgenv().__IS_LOADED = true;
	 * ```
	 */
	function getgenv(): Record<string, any>;

	/**
	 * Returns a list of ModuleScripts that have been loaded.
	 *
	 * @param excludeCore - Whether or not to exclude core modules from the list.
	 * @returns An array of ModuleScript instances.
	 *
	 * @example
	 * ```typescript
	 * const modules = getloadedmodules(true);
	 * for (const module of modules) print(module.GetFullName());
	 * ```
	 */
	function getloadedmodules(excludeCore?: boolean): ModuleScript[];

	/**
	 * Since the _G global environment that has been replaced by the executor, Roblox_G represents the global environment of the game client rather than the executor.
	 */
	interface Roblox_G {}

	/**
	 * Returns the global environment of the game client.
	 *
	 * @returns An object representing the global environment of the game client.
	 *
	 * @example
	 * ```typescript
	 * const refs: { require?: Function } = {};
	 * const bannedScripts = game.GetService("Players").LocalPlayer.PlayerScripts;
	 *
	 * refs.require = hookfunction(getrenv().require, function(...args: unknown[]) {
	 *     const module = args[0];
	 *     if (
	 *         typeof module === "object" &&
	 *         module.IsA("ModuleScript") &&
	 *         module.IsDescendantOf(bannedScripts)
	 *     ) {
	 *         error("You are not allowed to require this module!");
	 *     }
	 *     return refs.require!(...args);
	 * });
	 * ```
	 */
	function getrenv(): {
		_G: Roblox_G;
		require: typeof require;
		print: typeof print;
		warn: typeof warn;
		error: typeof error;
		debug: typeof roblox_debug;
	};

	/**
	 * Returns a list of scripts that are currently running.
	 *
	 * @returns An array of LocalScript or ModuleScript instances.
	 *
	 * @example
	 * ```typescript
	 * const scripts = getrunningscripts();
	 * for (const object of scripts) print(`${object.GetFullName()} (${object.ClassName})`);
	 * ```
	 */
	function getrunningscripts(): Array<LocalScript | ModuleScript>;

	/**
	 * Returns the raw Luau bytecode of the given script.
	 *
	 * @param script - A client-running LocalScript or ModuleScript.
	 * @returns The raw Luau bytecode as a string.
	 *
	 * @alias dumpstring
	 *
	 * @example
	 * ```typescript
	 * const animate = game.GetService("Players").LocalPlayer.Character!.Animate;
	 * const bytecode = getscriptbytecode(animate);
	 * ```
	 */
	function getscriptbytecode(script: LocalScript | ModuleScript): string;

	/**
	 * Returns the raw Luau bytecode of the given script.
	 * @alias getscriptbytecode
	 */
	function dumpstring(script: LocalScript | ModuleScript): string;

	/**
	 * Generates a new closure using the bytecode of `script`.
	 *
	 * @param script - The script to recreate.
	 * @returns A function representing the script's closure.
	 *
	 * @alias getscriptfunction
	 *
	 * @example
	 * ```typescript
	 * const module = game.GetService("CoreGui").RobloxGui.Modules.Common.Constants;
	 *
	 * const constants = getrenv().require(module);
	 * const generatedConstants = getscriptclosure(module)();
	 *
	 * print(constants === generatedConstants); // false
	 * for (const [k, v] of Object.entries(constants)) {
	 *     print(k, typeof v === typeof generatedConstants[k]); // true
	 * }
	 * ```
	 */
	function getscriptclosure(script: LocalScript | ModuleScript): Callback;

	/**
	 * Generates a new closure using the bytecode of `script`.
	 * @alias getscriptclosure
	 */
	function getscriptfunction(script: LocalScript | ModuleScript): Callback;

	/**
	 * Returns a SHA384 hash of the script's bytecode.
	 *
	 * @param script - A client-running LocalScript or ModuleScript.
	 * @returns A SHA384 hash as a string.
	 *
	 * @example
	 * ```typescript
	 * const animate = game.GetService("Players").LocalPlayer.Character!.Animate;
	 * let hash = getscripthash(animate);
	 *
	 * task.delay(1.5, () => {
	 *     animate.Source = "print('Hello World!')";
	 * });
	 *
	 * for (let i = 1; i <= 5; i++) {
	 *     task.wait(0.5);
	 *
	 *     const newHash = getscripthash(animate);
	 *
	 *     if (hash !== newHash) {
	 *         print("The script has changed!");
	 *         hash = newHash;
	 *     } else {
	 *         print("The script has not changed.");
	 *     }
	 * }
	 * ```
	 */
	function getscripthash(script: LocalScript | ModuleScript): string;

	/**
	 * Returns a list of every script in the game.
	 *
	 * @returns An array of LocalScript or ModuleScript instances.
	 *
	 * @example
	 * ```typescript
	 * const scripts = getscripts();
	 *
	 * for (const object of scripts) {
	 *     print(`${object.GetFullName()} (${object.ClassName})`);
	 * }
	 * ```
	 */
	function getscripts(): Array<LocalScript | ModuleScript>;

	/**
	 * Returns the global environment of the given script.
	 *
	 * @param script - A client-running LocalScript or ModuleScript.
	 * @returns An object representing the script's environment.
	 *
	 * @example
	 * ```typescript
	 * const animate = game.GetService("Players").LocalPlayer.Character!.Animate;
	 * const environment = getsenv(animate);
	 *
	 * for (const [k, v] of Object.entries(environment)) {
	 *     print(`${k} ${v} (${typeof v})`);
	 * }
	 * ```
	 */
	function getsenv(script: LocalScript | ModuleScript): { [key: string]: any };

	/**
	 * Returns the identity of the current thread.
	 *
	 * @returns The thread identity as a number.
	 *
	 * @alias getidentity
	 * @alias getthreadcontext
	 *
	 * @example
	 * ```typescript
	 * const identity = getthreadidentity();
	 * print(identity); // 7
	 * ```
	 */
	function getthreadidentity(): number;

	/**
	 * Returns the identity of the current thread.
	 * @alias getthreadidentity
	 */
	function getidentity(): number;

	/**
	 * Returns the identity of the current thread.
	 * @alias getthreadidentity
	 */
	function getthreadcontext(): number;

	/**
	 * Sets the current thread identity.
	 *
	 * @param identity - The new thread identity.
	 *
	 * @alias setidentity
	 * @alias setthreadcontext
	 *
	 * @example
	 * ```typescript
	 * setthreadidentity(3);
	 * print(getthreadidentity()); // 3
	 * ```
	 */
	function setthreadidentity(identity: number): void;

	/**
	 * Sets the current thread identity.
	 * @alias setthreadidentity
	 */
	function setidentity(identity: number): void;

	/**
	 * Sets the current thread identity.
	 * @alias setthreadidentity
	 */
	function setthreadcontext(identity: number): void;
}

export {};
