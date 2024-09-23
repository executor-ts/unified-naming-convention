/// <reference no-default-lib="true"/>

interface HookableMetatable {
	__namecall(this: unknown, ...args: any[]): any;
	__index(this: unknown, key: any): any;
	__newindex(this: unknown, key: any, value: any): void;
	__call(this: unknown, ...args: any[]): any;
	__tostring(this: unknown): string;
	__len(this: unknown): number;
	__unm(this: unknown): any;
	__add(this: unknown, rhs: any): any;
	__sub(this: unknown, rhs: any): any;
	__mul(this: unknown, rhs: any): any;
	__div(this: unknown, rhs: any): any;
	__mod(this: unknown, rhs: any): any;
	__pow(this: unknown, rhs: any): any;
	__concat(this: unknown, rhs: any): any;
	__eq(this: unknown, rhs: any): boolean;
	__lt(this: unknown, rhs: any): boolean;
	__le(this: unknown, rhs: any): boolean;
	__gc(this: unknown): void;
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
	function setrawmetatable(object: any, metatable: CoreMetatable): void;

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
	 * Try not to invoke `method` from within the function `hook`!
	 * For example, do not index a property of an Instance from within a hook to `__index`.
	 *
	 * @example
	 * Prevents the use of `LocalPlayer:Kick()`:
	 * ```typescript
	 * const LocalPlayer = game.GetService("Players").LocalPlayer;
	 * const __index = hookmetamethod(game, "__namecall", function (...args) {
	 *      const method = getnamecallmethod();
	 *      if (this === LocalPlayer && method === "Kick") {
	 *          coroutine.yield();
	 *      }
	 *      return __index(this, ...args);
	 * });
	 * ```
	 */
	function hookmetamethod<O, M extends HookableMetamethods>(
		object: O,
		method: M,
		hook: HookableMetatable[M],
	): (object: unknown, ...args: Parameters<HookableMetatable[M]>) => unknown;

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
	 *      if (this === LocalPlayer && method === "Kick") {
	 *          coroutine.yield();
	 *      }
	 *      return __index(this, ...args);
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
	function isreadonly(object: any): boolean;

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
	function setreadonly(object: any, readonly: boolean): void;
}

export {};
