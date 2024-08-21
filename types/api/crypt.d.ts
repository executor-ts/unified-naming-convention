/// <reference no-default-lib="true"/>

declare global {
	namespace crypt {
		/**
		 * Encodes a string of bytes into Base64.
		 *
		 * @param data - The data to encode.
		 * @returns The Base64 encoded string.
		 *
		 * @alias crypt.base64.encode
		 * @alias crypt.base64_encode
		 * @alias base64.encode
		 * @alias base64_encode
		 *
		 * @example
		 * ```typescript
		 * const base64 = crypt.base64encode("Hello, World!");
		 * const raw = crypt.base64decode(base64);
		 *
		 * print(base64); // SGVsbG8sIFdvcmxkIQ==
		 * print(raw); // Hello, World!
		 * ```
		 */
		function base64encode(data: string): string;

		/**
		 * Decodes a Base64 string to a string of bytes.
		 *
		 * @param data - The data to decode.
		 * @returns The decoded string.
		 *
		 * @alias crypt.base64.decode
		 * @alias crypt.base64_decode
		 * @alias base64.decode
		 * @alias base64_decode
		 *
		 * @example
		 * ```typescript
		 * const base64 = crypt.base64encode("Hello, World!");
		 * const raw = crypt.base64decode(base64);
		 *
		 * print(base64); // SGVsbG8sIFdvcmxkIQ==
		 * print(raw); // Hello, World!
		 * ```
		 */
		function base64decode(data: string): string;

		/**
		 * Alias for crypt.base64encode.
		 * @alias crypt.base64encode
		 */
		const base64_encode: typeof base64encode;

		/**
		 * Alias for crypt.base64decode.
		 * @alias crypt.base64decode
		 */
		const base64_decode: typeof base64decode;

		// ... [Other functions remain the same]

		namespace base64 {
			/**
			 * Alias for crypt.base64encode.
			 * @alias crypt.base64encode
			 */
			export const encode: typeof base64encode;

			/**
			 * Alias for crypt.base64decode.
			 * @alias crypt.base64decode
			 */
			export const decode: typeof base64decode;
		}
	}

	/**
	 * Alias for crypt.base64encode.
	 * @alias crypt.base64encode
	 */
	const base64_encode: typeof crypt.base64encode;

	/**
	 * Alias for crypt.base64decode.
	 * @alias crypt.base64decode
	 */
	const base64_decode: typeof crypt.base64decode;

	namespace base64 {
		/**
		 * Alias for crypt.base64encode.
		 * @alias crypt.base64encode
		 */
		export const encode: typeof crypt.base64encode;

		/**
		 * Alias for crypt.base64decode.
		 * @alias crypt.base64decode
		 */
		export const decode: typeof crypt.base64decode;
	}
}

export {};
