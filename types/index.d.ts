/// <reference no-default-lib="true"/>
/// <reference types="@rbxts/types"/>
/// <reference path="roblox.d.ts" />
/// <reference path="api/closures.d.ts" />
/// <reference path="api/drawing.d.ts" />
/// <reference path="api/input.d.ts" />
/// <reference path="api/instances.d.ts" />

// Override DataModel Methods
interface DataModel {
	HttpGet(url: string): string;
}

// Override Services
interface Services {
	CoreGui: CoreGui;
	VirtualInputManager: VirtualInputManager;
	VirtualUser: VirtualUser;
}

declare module "@rbxts/services" {
	export const CoreGui: Services["CoreGui"];
	export const VirtualInputManager: Services["VirtualInputManager"];
	export const VirtualUser: Services["VirtualUser"];
}
