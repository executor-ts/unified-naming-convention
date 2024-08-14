function func(a: number) {
	print(a);
	return "";
}

const old = hookfunction(func, (a: number) => {
	return old(a);
});

const LocalPlayer = game.GetService("Players").LocalPlayer;
const __index = hookmetamethod(game, "__namecall", function (...args) {
	const method = getnamecallmethod();
	if (this === LocalPlayer && method === "Kick") {
		coroutine.yield();
	}
	return __index(this, ...args);
});
