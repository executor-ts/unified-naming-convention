/**
 * CoreGui used to render Roblox's core user interface found in every game.
 * @service
 * @identity 3
 */
interface CoreGui extends BasePlayerGui {
	Version: number;
}

/**
 * VirtualInputManager is an internal service used by Roblox to record inputs and play them back during performance benchmarking tests.
 * @identity 3
 */
interface VirtualInputManager extends Instance {
	SendKeyEvent(isPressed: boolean, keyCode: Enum.KeyCode, isRepeatedKey: boolean, pluginGui: GuiObject): void;
	SendMouseWheelEvent(x: number, y: number, isForwardScroll: boolean, pluginGui: GuiObject): void;
	SendMouseButtonEvent(x: number, y: number, mouseButton: number, isDown: boolean, pluginGui: GuiObject): void;
	SendMouseMovementEvent(x: number, y: number, pluginGui: GuiObject): void;
	SendTextInputCharacterEvent(character: string, gui: GuiObject): void;
}

/**
 * VirtualUser is a service that allows you to record the inputs of a user, and then play it back to a limited extent.
 * @identity 3
 */
interface VirtualUser extends Instance {
	Button1Down(position?: Vector2, camera?: CFrame): void;
	Button1Up(position?: Vector2, camera?: CFrame): void;
	Button2Down(position?: Vector2, camera?: CFrame): void;
	Button2Up(position?: Vector2, camera?: CFrame): void;
	ClickButton1(position?: Vector2, camera?: CFrame): void;
	ClickButton2(position?: Vector2, camera?: CFrame): void;
	MoveMouse(position?: Vector2, camera?: CFrame): void;
	KeyDown(key: string): void;
	KeyUp(key: string): void;
	TypeKey(key: string): void;
}
