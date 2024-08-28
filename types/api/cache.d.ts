/// <reference no-default-lib="true"/>

declare global {
	namespace cache {
		/**
		 * Deletes `object` from the Instance cache. Effectively invalidates `object` as a reference to the underlying Instance.
		 *
		 * @param object - The object to invalidate.
		 *
		 * @example
		 * ```typescript
		 * const Lighting = game.GetService("Lighting");
		 * cache.invalidate(game.GetService("Lighting"));
		 * print(Lighting, Lighting === game.GetService("Lighting")); // Lighting, false
		 * ```
		 */
		function invalidate(object: Instance): void;

		/**
		 * Checks whether `object` exists in the Instance cache.
		 *
		 * @param object - The object to find.
		 * @returns A boolean indicating if the object is cached.
		 *
		 * @example
		 * ```typescript
		 * const Lighting = game.GetService("Lighting");
		 * cache.invalidate(Lighting);
		 * print(cache.iscached(Lighting)); // false
		 * ```
		 */
		function iscached(object: Instance): boolean;

		/**
		 * Replaces `object` in the Instance cache with `newObject`.
		 *
		 * @param object - The object to replace.
		 * @param newObject - The new object to replace `object` with.
		 *
		 * @example
		 * ```typescript
		 * const Lighting = game.GetService("Lighting");
		 * const Players = game.GetService("Players");
		 *
		 * cache.replace(Lighting, Players);
		 *
		 * print(Lighting); // Players
		 * ```
		 */
		function replace(object: Instance, newObject: Instance): void;
	}

	/**
	 * Returns a copy of the Instance reference to `object`.
	 * This is useful for managing an Instance without directly referencing it.
	 *
	 * @param object - The Instance to clone.
	 * @returns A cloned reference to the Instance.
	 *
	 * @example
	 * ```typescript
	 * const Lighting = game.GetService("Lighting");
	 * const LightingClone = cloneref(Lighting);
	 *
	 * print(Lighting === LightingClone); // false
	 * ```
	 */
	function cloneref<O extends Instance>(object: O): O;

	/**
	 * Returns whether objects `a` and `b` both reference the same Instance.
	 *
	 * @param a - The first Instance to compare.
	 * @param b - The second Instance to compare.
	 * @returns A boolean indicating if the instances are the same.
	 *
	 * @example
	 * ```typescript
	 * const Lighting = game.GetService("Lighting");
	 * const LightingClone = cloneref(Lighting);
	 *
	 * print(Lighting === LightingClone); // false
	 * print(compareinstances(Lighting, LightingClone)); // true
	 * ```
	 */
	function compareinstances(a: Instance, b: Instance): boolean;
}

export {};
