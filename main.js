function random(min, max) {
	return (Math.random() * max + min).toFixed(2);
}

function scale(axis, value, unit) {
	return `calc(var(--${axis}-scale) * ${value}${unit})`;
}

function slide(axis) {
	return `slide-${axis} ${scale(axis, random(4, 8), "s")} linear ${scale(axis, -random(0, 8), "s")} ${
		random(0, 1) < 0.5 ? "alternate" : "alternate-reverse"
	} infinite`;
}

function createPepega(src) {
	let el = document.createElement("img");

	el.src = src;
	el.classList.add("pepega");
	el.style = `animation: ${slide("x")}, ${slide("y")}`;

	document.body.appendChild(el);
}

createPepega("https://cdn.betterttv.net/emote/5fa1a08b1b017902db15a630/3x");
createPepega("https://cdn.betterttv.net/emote/5fa1a08b1b017902db15a630/3x");
createPepega("https://cdn.betterttv.net/emote/5fa1a08b1b017902db15a630/3x");
createPepega("https://cdn.betterttv.net/emote/5fa1a08b1b017902db15a630/3x");
createPepega("https://cdn.betterttv.net/emote/5fa1a08b1b017902db15a630/3x");

let scaleStyle = document.createElement("style");
document.head.appendChild(scaleStyle);

function updateScale() {
	const w = window.innerWidth;
	const h = window.innerHeight;

	scaleStyle.textContent = `:root { --x-scale: ${w > h ? 1 : w / h}; --y-scale: ${h > w ? 1 : h / w} }`;
}

updateScale();
window.addEventListener("resize", updateScale);
