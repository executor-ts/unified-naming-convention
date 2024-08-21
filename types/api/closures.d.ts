/// <reference no-default-lib="true"/>

type Callback = (...args: any[]) => any;

declare global {
	/**
	 * Returns whether the function currently running was called by the executor.
	 *
	 * @returns A boolean indicating if the current function was called by the executor.
	 *
	 * @remarks
	 * This is useful for metamethod hooks that behave differently when called by the game.
	 *
	 * @example
	 * Prevent the executor from invoking `__namecall` with the global `game` object:
	 * ```typescript
	 * const refs: { __namecall?: Function } = {};
	 *
	 * refs.__namecall = hookmetamethod(game, "__namecall", function(this: unknown, ...args: unknown[]) {
	 *     const isRunningOnExecutor = checkcaller();
	 *
	 *     if (isRunningOnExecutor) {
	 *         // The executor invoked the __namecall method, so this will not affect the
	 *         // scripts in the game.
	 *         if (this === game) {
	 *             error("No __namecall on game allowed");
	 *         }
	 *     }
	 *
	 *     return refs.__namecall!.call(this, ...args);
	 * });
	 *
	 * game.Destroy(); // Error "No __namecall on game allowed"
	 * ```
	 */
	function checkcaller(): boolean;

	/**
	 * Generates a new closure based on the bytecode of function `func`.
	 *
	 * @param func The function to recreate.
	 * @returns A new function with the same behavior as the input function.
	 *
	 * @example
	 * ```typescript
	 * function foo() { print("Hello, world!") };
	 * const bar = clonefunction(foo);
	 * foo(); // Hello, world!
	 * bar(); // Hello, world!
	 * print(foo === bar); // false
	 * ```
	 */
	function clonefunction<F extends (...args: any[]) => any>(func: F): F;

	/**
	 * Returns the script responsible for the currently running function.
	 *
	 * @returns The BaseScript that is currently executing.
	 *
	 * @example
	 * Prevent scripts in PlayerGui from invoking the `__namecall` hook:
	 * ```typescript
	 * const refs: { __namecall?: Function } = {};
	 * const bannedScripts = game.GetService("Players").LocalPlayer!.PlayerGui;
	 *
	 * refs.__namecall = hookmetamethod(game, "__namecall", function(this: unknown, ...args: unknown[]) {
	 *     const caller = getcallingscript();
	 *
	 *     // Use '.' notation to call the IsDescendantOf method without invoking
	 *     // __namecall and causing a recursive loop.
	 *     const isBanned = (caller as any).IsDescendantOf(caller, bannedScripts);
	 *
	 *     if (isBanned) {
	 *         error("Not allowed to invoke __namecall");
	 *     }
	 *
	 *     return refs.__namecall!.call(this, ...args);
	 * });
	 * ```
	 */
	function getcallingscript(): BaseScript;

	/**
	 * Replaces `func` with `hook` internally, where `hook` will be invoked in place of `func` when called.
	 *
	 * @param func The function to hook.
	 * @param hook The function to redirect calls to.
	 * @returns A new function that can be used to access the original definition of `func`.
	 *
	 * @remarks
	 * If `func` is a Luau function (`islclosure(func) --> true`), the upvalue count of `hook` must be less than or equal to that of `func`.
	 * Read more about upvalues on [Lua visibility rules](http://www.lua.org/manual/5.1/manual.html#2.6).
	 *
	 * @alias replaceclosure
	 *
	 * @example
	 * ```typescript
	 * function foo(a: number) {
	 *     print(a);
	 * }
	 * const fooRef = hookfunction(foo, function(a: number]) {
	 *     print("Hooked Function")
	 * });
	 * foo("Test"); // Hooked Function
	 * fooRef("Test"); // Test
	 * ```
	 */
	function hookfunction<F extends Callback>(func: F, hook: (...args: Parameters<F>) => any): F;

	/**
	 * Replaces `func` with `hook` internally, where `hook` will be invoked in place of `func` when called.
	 * @alias hookfunction
	 */
	function replaceclosure<F extends Callback>(func: F, hook: (...args: Parameters<F>) => any): F;

	/**
	 * Returns whether or not `func` is a closure whose source is written in C.
	 *
	 * @param func The function to check.
	 * @returns A boolean indicating if the function is a C closure.
	 *
	 * @example
	 * ```typescript
	 * print(iscclosure(print)); // true
	 * print(iscclosure(function() {})); // false
	 * ```
	 */
	function iscclosure(func: Callback): boolean;

	/**
	 * Returns whether or not `func` is a closure whose source is written in Luau.
	 *
	 * @param func The function to check.
	 * @returns A boolean indicating if the function is a Luau closure.
	 *
	 * @example
	 * ```typescript
	 * print(islclosure(print)); // false
	 * print(islclosure(function() {})); // true
	 * ```
	 */
	function islclosure(func: Callback): boolean;

	/**
	 * Returns whether or not `func` was created by the executor.
	 *
	 * @param func The function to check.
	 * @returns A boolean indicating if the function was created by the executor.
	 *
	 * @example
	 * ```typescript
	 * print(isexecutorclosure(isexecutorclosure)); // true
	 * print(isexecutorclosure(function() {})); // true
	 * print(isexecutorclosure(print)); // false
	 * ```
	 */
	function isexecutorclosure(func: Callback): boolean;

	/**
	 * Generates a chunk from the given source code. The environment of the returned function is the global environment.
	 *
	 * @param source The source code to compile.
	 * @param chunkname Optional name of the chunk.
	 * @returns The compiled function
	 *
	 * @example
	 * ```typescript
	 * const func = loadstring("print('Hello, world!')");
	 * func(); // Hello, world!
	 * ```
	 */
	function loadstring(source: string, chunkname?: string): Callback;

	/**
	 * Returns a C closure that wraps `func`. The result is functionally identical to `func`, but identifies as a C closure, and may have different metadata.
	 *
	 * @param func The function to wrap.
	 * @returns A new C closure wrapping the input function.
	 *
	 * @remarks
	 * Attempting to yield inside a C closure will throw an error.
	 * Instead, use the task library to defer actions to different threads.
	 *
	 * @example
	 * ```typescript
	 * const foo = function() {};
	 * const bar = newcclosure(foo);
	 *
	 * print(iscclosure(foo)); // false
	 * print(iscclosure(bar)); // true
	 * ```
	 */
	function newcclosure<F extends (...args: any[]) => any>(func: F): F;
}
export {};
