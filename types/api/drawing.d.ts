/// <reference no-default-lib="true"/>

declare global {
	/**
	 * The Drawing class provides an interface for drawing shapes and text above the game window.
	 */
	const Drawing: Drawing;
	interface Drawing {
		/**
		 * Create a new drawing object of the specified type.
		 *
		 * @param type The type of drawing object to create.
		 * @returns A new Drawing object.
		 *
		 * @remarks
		 * The possible types are "Line", "Text", "Image", "Circle", "Square", "Quad", and "Triangle".
		 *
		 * @example
		 * ```typescript
		 * const circle = Drawing.new("Circle");
		 * circle.Radius = 50;
		 * circle.Color = Color3.fromRGB(255, 0, 0);
		 * circle.Filled = true;
		 * circle.NumSides = 32;
		 * circle.Position = new Vector2(300, 300);
		 * circle.Transparency = 0.7;
		 * circle.Visible = true;
		 *
		 * task.wait(1);
		 * circle.Destroy();
		 * ```
		 */
		new <T extends keyof InstantiableDrawings>(type: T): InstantiableDrawings[T];

		/**
		 * A table containing the available font names. The style of each font varies depending on the executor.
		 *
		 * @readonly
		 */
		readonly Fonts: { UI: 0; System: 1; Plex: 2; Monospace: 3 };
	}

	/**
	 * Destroys every drawing object in the cache. Invalidates references to the drawing objects.
	 *
	 * @example
	 * ```typescript
	 * for (let i = 1; i <= 10; i++) {
	 *     const circle = Drawing.new("Circle");
	 *     circle.Radius = 50;
	 *     circle.Color = Color3.fromRGB(255, 0, 0);
	 *     circle.Filled = true;
	 *     circle.NumSides = 32;
	 *     circle.Position = new Vector2(Math.random() * 900 + 300, Math.random() * 900 + 300);
	 *     circle.Transparency = 0.7;
	 *     circle.Visible = true;
	 * }
	 *
	 * task.wait(1);
	 * cleardrawcache();
	 * ```
	 */
	function cleardrawcache(): void;

	/**
	 * Gets the value of a property of a drawing. Functionally identical to `drawing[property]`.
	 *
	 * @param drawing The drawing to get the property of.
	 * @param property The property to get.
	 * @returns The value of the property.
	 *
	 * @example
	 * ```typescript
	 * const circle = Drawing.new("Circle");
	 * getrenderproperty(circle, "Color");
	 * ```
	 */
	function getrenderproperty<D extends InstantiableDrawings[keyof InstantiableDrawings], P extends keyof D>(
		drawing: D,
		property: P,
	): D[P];

	/**
	 * Sets the value of a property of a drawing. Functionally identical to `drawing[property] = value`.
	 *
	 * @param drawing The drawing to set the property of.
	 * @param property The property to set.
	 * @param value The value to set the property to.
	 *
	 * @example
	 * ```typescript
	 * const circle = Drawing.new("Circle");
	 * setrenderproperty(circle, "Color", Color3.fromRGB(255, 0, 0));
	 * ```
	 */
	function setrenderproperty<D extends InstantiableDrawings[keyof InstantiableDrawings], P extends keyof D>(
		drawing: D,
		property: P,
		value: D[P],
	): void;

	/**
	 * Returns whether the given object is a valid Drawing.
	 *
	 * @param object Any object.
	 * @returns A boolean indicating if the object is a valid Drawing.
	 *
	 * @example
	 * ```typescript
	 * print(isrenderobj(Drawing.new("Circle"))); // true
	 * print(isrenderobj({})); // false
	 * ```
	 */
	function isrenderobj(object: unknown): object is BaseDrawing;

	type InstantiableDrawings = {
		Line: Line;
		Text: Text;
		Image: Image;
		Circle: Circle;
		Square: Square;
		Quad: Quad;
		Triangle: Triangle;
	};

	/**
	 * The base class of which all drawing objects inherit. Cannot be instantiated.
	 */
	interface BaseDrawing {
		/** Whether the drawing is visible. Defaults to `false` on some executors. */
		Visible: boolean;
		/** Determines the order in which a Drawing renders relative to other drawings. */
		ZIndex: number;
		/** The opacity of the drawing (1 is opaque, 0 is transparent). */
		Transparency: number;
		/** The color of the drawing. */
		Color: Color3;
		/** Destroys the drawing. */
		Destroy(): void;
	}

	/**
	 * Renders a line starting at `From` and ending at `To`.
	 */
	interface Line extends BaseDrawing {
		/** The starting point of the line. */
		From: Vector2;
		/** The ending point of the line. */
		To: Vector2;
		/** The thickness of the line. */
		Thickness: number;
	}

	/**
	 * Renders text at `Position`.
	 */
	interface Text extends BaseDrawing {
		/** The text to render. */
		Text: string;
		/** The size of the text. Cannot be set. */
		readonly TextBounds: Vector2;
		/** The font to use. */
		Font: number;
		/** The size of the text. */
		Size: number;
		/** The position of the text. */
		Position: Vector2;
		/** Whether the text should be centered horizontally. */
		Center: boolean;
		/** Whether the text should be outlined. */
		Outline: boolean;
		/** The color of the outline. */
		OutlineColor: Color3;
	}

	/**
	 * Draws the image data to the screen. `Data` must be the raw image data.
	 */
	interface Image extends BaseDrawing {
		/** The raw image data. */
		Data: string;
		/** The size of the image. */
		Size: Vector2;
		/** The position of the image. */
		Position: Vector2;
		/** The rounding of the image. */
		Rounding: number;
	}

	/**
	 * Draws a circle that is centered at `Position`.
	 *
	 * @remarks
	 * This is not a perfect circle! The greater the value for `NumSides`, the more accurate the circle will be.
	 */
	interface Circle extends BaseDrawing {
		/** The number of sides of the circle. */
		NumSides: number;
		/** The radius of the circle. */
		Radius: number;
		/** The position of the center of the circle. */
		Position: Vector2;
		/** If `Filled` is false, specifies the thickness of the outline. */
		Thickness: number;
		/** Whether the circle should be filled. */
		Filled: boolean;
	}

	/**
	 * Draws a rectangle starting at `Position` and ending at `Position` + `Size`.
	 */
	interface Square extends BaseDrawing {
		/** The size of the square. */
		Size: Vector2;
		/** The position of the top-left corner of the square. */
		Position: Vector2;
		/** If `Filled` is false, specifies the thickness of the outline. */
		Thickness: number;
		/** Whether the square should be filled. */
		Filled: boolean;
	}

	/**
	 * Draws a four-sided figure connecting to each of the four points.
	 */
	interface Quad extends BaseDrawing {
		/** The first point. */
		PointA: Vector2;
		/** The second point. */
		PointB: Vector2;
		/** The third point. */
		PointC: Vector2;
		/** The fourth point. */
		PointD: Vector2;
		/** If `Filled` is false, specifies the thickness of the outline. */
		Thickness: number;
		/** Whether the quad should be filled. */
		Filled: boolean;
	}

	/**
	 * Draws a triangle connecting to each of the three points.
	 */
	interface Triangle extends BaseDrawing {
		/** The first point. */
		PointA: Vector2;
		/** The second point. */
		PointB: Vector2;
		/** The third point. */
		PointC: Vector2;
		/** If `Filled` is false, specifies the thickness of the outline. */
		Thickness: number;
		/** Whether the triangle should be filled. */
		Filled: boolean;
	}
}
export {};
