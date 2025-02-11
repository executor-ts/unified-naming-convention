/// <reference no-default-lib="true"/>

interface HookableMetatable {
	__namecall(obj: unknown, ...args: unknown[]): unknown;
	__index(obj: unknown, key: unknown): unknown;
	__newindex(obj: unknown, key: unknown, value: unknown): void;
	__call(obj: unknown, ...args: unknown[]): unknown;
	__tostring(obj: unknown): string;
	__len(obj: unknown): number;
	__unm(obj: unknown): unknown;
	__add(obj: unknown, rhs: unknown): unknown;
	__sub(obj: unknown, rhs: unknown): unknown;
	__mul(obj: unknown, rhs: unknown): unknown;
	__div(obj: unknown, rhs: unknown): unknown;
	__mod(obj: unknown, rhs: unknown): unknown;
	__pow(obj: unknown, rhs: unknown): unknown;
	__concat(obj: unknown, rhs: unknown): unknown;
	__eq(obj: unknown, rhs: unknown): boolean;
	__lt(obj: unknown, rhs: unknown): boolean;
	__le(obj: unknown, rhs: unknown): boolean;
	__gc(obj: unknown): void;
}
interface CoreMetatable extends HookableMetatable {
	__mode?: "k" | "v" | "kv" | "s";
	__metatable?: string;
}
type HookableMetamethods = keyof HookableMetatable;

declare global {
	/**
	 * Returns the metatable of `object`, where the `__metatable` field would normally lock the metatable.
	 *
	 * @param object An object with a metatable.
	 * @returns The metatable of the object.
	 *
	 * @example
	 * ```typescript
	 * const object = setmetatable({}, { __metatable: "Locked!" });
	 * print(getmetatable(object)); // Locked!
	 * print(getrawmetatable(object)); // [object Object]
	 * ```
	 */
	function getrawmetatable<O>(object: O): CoreMetatable;

	/**
	 * Sets the metatable of `object` to `metatable`, where the `__metatable` field would normally lock the metatable.
	 *
	 * @param object A table or userdata.
	 * @param metatable The metatable to set.
	 *
	 * @example
	 * ```typescript
	 * const object = setmetatable({}, {});
	 * print(getmetatable(object)); // [object Object]
	 * setrawmetatable(object, { __metatable: "Hello, world!" });
	 * print(getmetatable(object)); // Hello, world!
	 * ```
	 */
	function setrawmetatable(object: unknown, metatable: CoreMetatable): void;

	/**
	 * Replaces `func` with `hook` internally, where `hook` will be invoked in place of `func` when called.
	 *
	 * @param object An object with a metatable.
	 * @param method The name of the method to hook.
	 * @param hook The function to replace `func` with.
	 * @returns A new function that can be used to access the original definition of `func`.
	 *
	 * @remarks
	 * The function `hook` is **not** allowed to yield or block the thread.
	 * Try not to invoke the hooked metamethod directly, as it will be recursive and potentially crash!
	 * Ensure that you are explicitly defining the types for the replacement closure (TS limitations!).
	 *
	 *
	 * @example
	 * Prevents the use of `LocalPlayer:Kick()`:
	 * ```typescript
	 * const __namecall = hookmetamethod(game, "__namecall",  (obj, ...args: unknown[]): unknown => {
	 * 	const method = getnamecallmethod();
	 * 	if (obj === LocalPlayer && method === "Kick") {
	 * 		coroutine.yield();
	 * 	}
	 * 	return __namecall(obj, ...args);
	 * });
	 * ```
	 */
	function hookmetamethod<O, M extends HookableMetamethods>(
		object: O,
		method: M,
		hook: HookableMetatable[M],
	): (...args: unknown[]) => never;

	/**
	 * Returns the name of the method that invoked the `__namecall` metamethod.
	 *
	 * @returns The name of the method that invoked `__namecall`.
	 *
	 * @example
	 * Prevents the use of `LocalPlayer:Kick()`:
	 * ```typescript
	 * const LocalPlayer = game.GetService("Players").LocalPlayer;
	 * const __index = hookmetamethod(game, "__namecall", function (...args) {
	 *      const method = getnamecallmethod();
	 *      if (obj === LocalPlayer && method === "Kick") {
	 *          coroutine.yield();
	 *      }
	 *      return __index(obj, ...args);
	 * });
	 * ```
	 */
	function getnamecallmethod(): string;

	/**
	 * Returns whether `object` is frozen or read-only. Identical to `table.isfrozen`.
	 *
	 * @param object A table or userdata.
	 * @returns A boolean indicating if the object is read-only.
	 *
	 * @example
	 * ```typescript
	 * const object = {};
	 * table.freeze(object);
	 * print(isreadonly(object)); // true
	 * ```
	 */
	function isreadonly(object: unknown): boolean;

	/**
	 * Sets whether `object` is frozen or read-only.
	 *
	 * @param object A table or userdata.
	 * @param readonly Whether or not `object` should be frozen.
	 *
	 * @example
	 * ```typescript
	 * const object = {};
	 *
	 * table.freeze(object);
	 * print(isreadonly(object)); // true
	 *
	 * setreadonly(object, false);
	 * print(isreadonly(object)); // false
	 * ```
	 */
	function setreadonly(object: unknown, readonly: boolean): void;
}

export {};
