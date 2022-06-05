const PEPEGA_EMOTES_HOST = "https://emotes.pepega.club";

const pepegas = [
	{ name: "33kk", url: "https://kkx.one" },
	{ name: "liphitc", url: "https://github.com/LiphiTC" },
	{ name: "qwert0p", url: "https://github.com/qwert0p" },
];

function cssRandom(min, max) {
	return (Math.random() * max + min).toFixed(2);
}

function cssScale(axis, value, unit) {
	return `calc(var(--${axis}-scale) * ${value}${unit})`;
}

function cssSlide(axis) {
	return `slide-${axis} ${cssScale(axis, cssRandom(4, 8), "s")} linear -${cssRandom(0, 8)}s ${
		cssRandom(0, 1) < 0.5 ? "alternate" : "alternate-reverse"
	} infinite`;
}

function createBouncy(src, href, round = false) {
	let el;
	if (href) {
		el = document.createElement("a");
		el.href = href;
		el.target = "_blank";
	} else {
		el = document.createElement("span");
	}

	el.classList.add("bouncy");
	if (round) {
		el.classList.add("round");
	}

	el.style = `--img: url(${src}); animation: ${cssSlide("x")}, ${cssSlide("y")}`;

	document.body.appendChild(el);
}

function arrayPick(arr, n) {
	let result = new Array(n),
		len = arr.length,
		taken = new Array(len);
	if (n > len) return result;
	while (n--) {
		const x = Math.floor(Math.random() * len);
		result[n] = arr[x in taken ? taken[x] : x];
		taken[x] = --len in taken ? taken[len] : len;
	}
	return result;
}

async function main() {
	const res = await fetch(`${PEPEGA_EMOTES_HOST}/index.json`);
	const emotes = await res.json();

	for (const pepega of pepegas) {
		createBouncy(`/avatars/${pepega.name}.jpg`, pepega.url, true);
	}

	for (const emote of arrayPick(emotes, 15 - pepegas.length)) {
		createBouncy(`${PEPEGA_EMOTES_HOST}/emotes/${emote}`);
	}

	document.querySelector(".loader").remove();
}

let scaleStyle = document.createElement("style");
document.head.appendChild(scaleStyle);

function updateScale() {
	const w = window.innerWidth;
	const h = window.innerHeight;

	scaleStyle.textContent = `:root { --x-scale: ${w > h ? 1 : w / h}; --y-scale: ${h > w ? 1 : h / w} }`;
}

updateScale();
window.addEventListener("resize", updateScale);

main();
