/// <reference no-default-lib="true"/>
/// <reference types="@rbxts/types"/>
/// <reference path="api/cache.d.ts" />
/// <reference path="api/closures.d.ts" />
/// <reference path="api/console.d.ts" />
/// <reference path="api/crypt.d.ts" />
/// <reference path="api/debug.d.ts" />
/// <reference path="api/drawing.d.ts" />
/// <reference path="api/filesystem.d.ts" />
/// <reference path="api/input.d.ts" />
/// <reference path="api/instances.d.ts" />
/// <reference path="api/metatable.d.ts" />
/// <reference path="api/misc.d.ts" />
/// <reference path="api/scripts.d.ts" />
/// <reference path="api/websocket.d.ts" />

interface DataModel {
	HttpGet(url: string): string;
}
