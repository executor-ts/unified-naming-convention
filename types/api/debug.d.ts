/// <reference no-default-lib="true"/>

/* eslint-disable roblox-ts/no-namespace-merging */
declare global {
	namespace debug {
		/**
		 * Returns the constant at `index` in the constant table of the function or level `func`.
		 * Throws an error if the constant does not exist.
		 *
		 * @param func - A function or stack level.
		 * @param index - The numerical index of the constant to retrieve.
		 * @returns The constant at the specified index.
		 *
		 * @example
		 * ```typescript
		 * function foo() {
		 *     print("Hello, world!");
		 * }
		 *
		 * print(debug.getconstant(foo, 1)); // "print"
		 * print(debug.getconstant(foo, 2)); // undefined
		 * print(debug.getconstant(foo, 3)); // "Hello, world!"
		 * ```
		 */
		function getconstant(func: Callback | number, index: number): unknown;

		/**
		 * Returns the constant table of the function or level `func`.
		 *
		 * @param func - A function or stack level.
		 * @returns An array of constants.
		 *
		 * @example
		 * ```typescript
		 * function foo() {
		 *     const num = 5000 + "50000";
		 *     print("Hello, world!", num, warn);
		 * }
		 *
		 * for (const [i, v] of pairs(debug.getconstants(foo))) {
		 *     print(i, v);
		 * }
		 * // 1 50000
		 * // 2 "print"
		 * // 4 "Hello, world!"
		 * // 5 "warn"
		 * ```
		 */
		function getconstants(func: Callback | number): unknown[];

		interface DebugInfo {
			source: string;
			short_src: string;
			func: Callback;
			what: "Lua" | "C";
			currentline: number;
			name: string;
			nups: number;
			numparams: number;
			is_vararg: 0 | 1;
		}

		/**
		 * Returns debugger information about a function or stack level.
		 *
		 * @param func - A function or stack level.
		 * @returns Debugger information about the function.
		 *
		 * @example
		 * ```typescript
		 * function foo() {
		 *     print("Hello, world!");
		 * }
		 *
		 * for (const [k, v] of pairs(debug.getinfo(foo))) {
		 *     print(k, v, `(${typeOf(v)})`);
		 * }
		 * ```
		 */
		function getinfo(func: Callback | number): DebugInfo;

		/**
		 * Returns the proto at `index` in the function or level `func` if `active` is false.
		 * If `active` is true, then every active function of the proto is returned.
		 *
		 * @param func - A function or stack level.
		 * @param index - The numerical index of the proto to retrieve.
		 * @param active - Whether to return its list of active closures.
		 * @returns A function or an array of functions.
		 *
		 * @example
		 * ```typescript
		 * function myFunction() {
		 *     function proto() {
		 *         print("Hello, world!");
		 *     }
		 * }
		 *
		 * const proto = debug.getproto(myFunction, 1, true)[0];
		 * proto(); // Hello, world!
		 * ```
		 */
		function getproto(func: Callback | number, index: number, active?: boolean): Callback | Callback[];

		/**
		 * Returns a list of protos of the function or level `func`.
		 *
		 * @param func - A function or stack level.
		 * @returns An array of functions.
		 *
		 * @example
		 * ```typescript
		 * function myFunction() {
		 *     function _1() {
		 *         print("Hello,");
		 *     }
		 *     function _2() {
		 *         print("world!");
		 *     }
		 * }
		 *
		 * for (const i of ipairs(debug.getprotos(myFunction))) {
		 *     const proto = debug.getproto(myFunction, i, true)[0];
		 *     proto();
		 * }
		 * // Hello,
		 * // world!
		 * ```
		 */
		function getprotos(func: Callback | number): Callback[];

		/**
		 * Returns the value at `index` in the stack frame `level`.
		 * If `index` is not specified, then the entire stack frame is returned.
		 *
		 * @param level - The stack frame to look up.
		 * @param index - The numerical index of the value to retrieve.
		 * @returns The value at the specified index or the entire stack frame.
		 *
		 * @example
		 * ```typescript
		 * const _ = "a" + "b";
		 * print(debug.getstack(1, 1)); // ab
		 * ```
		 */
		function getstack(level: number, index?: number): unknown | unknown[];

		/**
		 * Returns the upvalue at `index` in the function or level `func`.
		 *
		 * @param func - A function or stack level.
		 * @param index - The numerical index of the upvalue to retrieve.
		 * @returns The upvalue at the specified index.
		 *
		 * @example
		 * ```typescript
		 * const upvalue = () => {};
		 *
		 * function foo() {
		 *     print(upvalue);
		 * }
		 *
		 * print(debug.getupvalue(foo, 1)); // upvalue
		 * ```
		 */
		function getupvalue(func: Callback | number, index: number): unknown;

		/**
		 * Returns a list of upvalues of the function or level `func`.
		 *
		 * @param func - A function or stack level.
		 * @returns An array of upvalues.
		 *
		 * @example
		 * ```typescript
		 * const upvalue1 = () => {};
		 * const upvalue2 = () => {};
		 *
		 * function foo() {
		 *     print(upvalue1, upvalue2);
		 * }
		 *
		 * for (const [k, v] of pairs(debug.getupvalues(foo))) {
		 *     print(k, v, `(${typeOf(v)})`);
		 * }
		 * // 1 upvalue1() (function)
		 * // 2 upvalue2() (function)
		 * ```
		 */
		function getupvalues(func: Callback | number): unknown[];

		/**
		 * Sets the constant at `index` in the function or level `func` to `value`.
		 *
		 * @param func - A function or stack level.
		 * @param index - The numerical index of the constant to set.
		 * @param value - The value to set.
		 *
		 * @example
		 * ```typescript
		 * function foo() {
		 *     print("Goodbye, world!");
		 * }
		 *
		 * debug.setconstant(foo, 3, "Hello, world!");
		 * foo(); // Hello, world!
		 * ```
		 */
		function setconstant(func: Callback | number, index: number, value: unknown): void;

		/**
		 * Sets the register at `index` in the stack frame `level` to `value`.
		 *
		 * @param level - The stack frame to look up.
		 * @param index - The numerical index of the register to set.
		 * @param value - The value to set.
		 *
		 * @example
		 * ```typescript
		 * function foo() {
		 *     // Change the first value from "Goodbye, world!" to "Hello, world!"
		 *     return "Goodbye, world!", debug.setstack(1, 1, "Hello, world!");
		 * }
		 *
		 * print(foo()); // Hello, world!
		 * ```
		 */
		function setstack(level: number, index: number, value: unknown): void;

		/**
		 * Sets the upvalue at `index` in the function or level `func` to `value`.
		 *
		 * @param func - A function or stack level.
		 * @param index - The numerical index of the upvalue to set.
		 * @param value - The value to set.
		 *
		 * @example
		 * ```typescript
		 * function somethingImportant() {
		 *     print("Goodbye, world!");
		 * }
		 *
		 * function foo() {
		 *     somethingImportant();
		 * }
		 *
		 * debug.setupvalue(foo, 1, () => {
		 *     print("Hello, world!");
		 * });
		 *
		 * foo(); // Hello, world!
		 * ```
		 */
		function setupvalue(func: Callback | number, index: number, value: unknown): void;
	}
}
export {};
