/// <reference no-default-lib="true"/>

declare global {
	/**
	 * Returns the contents of the file located at `path`.
	 *
	 * @param path - The path to the file.
	 * @returns The contents of the file as a string.
	 *
	 * @example
	 * ```typescript
	 * writefile("file.txt", "Hello, world!");
	 * print(readfile("file.txt")); // Hello, world!
	 * ```
	 */
	function readfile(path: string): string;

	/**
	 * Returns a list of files and folders in the folder located at `path`.
	 * The returned list contains whole paths.
	 *
	 * @param path - The path to the folder.
	 * @returns An array of file and folder paths.
	 *
	 * @example
	 * ```typescript
	 * function descend(path: string, level = 0) {
	 *     for (const file of listfiles(path)) {
	 *         print("  ".repeat(level) + file);
	 *         if (isfolder(file)) {
	 *             descend(file, level + 1);
	 *         }
	 *     }
	 * }
	 *
	 * descend(".");
	 * ```
	 */
	function listfiles(path: string): string[];

	/**
	 * Writes `data` to the file located at `path` if it is not a folder.
	 *
	 * @param path - A path to the file.
	 * @param data - The data to write.
	 *
	 * @example
	 * ```typescript
	 * writefile("file.txt", "Hello, world!");
	 * print(readfile("file.txt")); // Hello, world!
	 * ```
	 */
	function writefile(path: string, data: string): void;

	/**
	 * Creates a folder at `path` if it does not already exist.
	 *
	 * @param path - The target location.
	 *
	 * @example
	 * ```typescript
	 * makefolder("folder");
	 * writefile("folder/file.txt", "Hello, world!");
	 * print(readfile("folder/file.txt")); // Hello, world!
	 * ```
	 */
	function makefolder(path: string): void;

	/**
	 * Appends `data` to the end of the file located at `path`.
	 * Creates the file if it does not exist.
	 *
	 * @param path - A path to the file.
	 * @param data - The data to append.
	 *
	 * @example
	 * ```typescript
	 * writefile("services.txt", "A list of services:\n");
	 *
	 * for (const service of game.GetChildren()) {
	 *     if (service.ClassName !== "") {
	 *         appendfile("services.txt", service.ClassName + "\n");
	 *     }
	 * }
	 * ```
	 */
	function appendfile(path: string, data: string): void;

	/**
	 * Returns whether or not `path` points to a file.
	 *
	 * @param path - The path to check.
	 * @returns A boolean indicating if the path points to a file.
	 *
	 * @example
	 * ```typescript
	 * writefile("file.txt", "Hello, world!");
	 * print(isfile("file.txt")); // true
	 * ```
	 */
	function isfile(path: string): boolean;

	/**
	 * Returns whether or not `path` points to a folder.
	 *
	 * @param path - The path to check.
	 * @returns A boolean indicating if the path points to a folder.
	 *
	 * @example
	 * ```typescript
	 * makefolder("folder");
	 * print(isfolder("folder")); // true
	 * ```
	 */
	function isfolder(path: string): boolean;

	/**
	 * Removes the file located at `path`.
	 *
	 * @param path - The path to the file.
	 *
	 * @example
	 * ```typescript
	 * writefile("file.txt", "Hello, world!");
	 * print(isfile("file.txt")); // true
	 *
	 * delfile("file.txt");
	 * print(isfile("file.txt")); // false
	 * ```
	 */
	function delfile(path: string): void;

	/**
	 * Removes the folder located at `path`.
	 *
	 * @param path - The path to the folder.
	 *
	 * @example
	 * ```typescript
	 * makefolder("folder");
	 * print(isfolder("folder")); // true
	 *
	 * delfolder("folder");
	 * print(isfolder("folder")); // false
	 * ```
	 */
	function delfolder(path: string): void;

	/**
	 * Generates a chunk from the file located at `path`.
	 * The environment of the returned function is the global environment.
	 *
	 * @param path - A path to the file containing Luau code.
	 * @param chunkname - Optional name of the chunk.
	 * @returns A tuple containing the loaded function and an error message if applicable.
	 *
	 * @example
	 * ```typescript
	 * writefile("file.lua", "local number = ...; return number + 1");
	 * const [func, err] = loadfile("file.lua");
	 * const output = assert(func, err)(1);
	 * print(output); // 2
	 * ```
	 */
	function loadfile(path: string, chunkname?: string): Callback | LuaTuple<[undefined, string]>;

	/**
	 * Attempts to load the file located at `path` and execute it on a new thread.
	 *
	 * @param path - The path to the file.
	 *
	 * @example
	 * ```typescript
	 * writefile("code.lua", "print('Hello, world!')");
	 * dofile("code.lua"); // "Hello, world!"
	 * ```
	 */
	function dofile(path: string): void;
}

export {};
