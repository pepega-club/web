const PEPEGA_EMOTES_HOST = "https://emotes.pepega.club";

const pepegas = [
	{ name: "33kk", url: "https://kkx.one" },
	{ name: "liphitc", url: "https://github.com/LiphiTC" },
	{ name: "qwert0p", url: "https://github.com/qwert0p" },
	{ name: "bekert", url: "https://github.com/Bekert" },
];

function cssRandom(min, max) {
	return (Math.random() * max + min).toFixed(2);
}

function cssScale(axis, value, unit) {
	return `calc(var(--${axis}-scale) * ${value}${unit})`;
}

function cssSlide(axis) {
	return `slide-${axis} ${cssScale(axis, cssRandom(8, 14), "s")} linear -${cssRandom(0, 14)}s normal infinite`;
}

function createBouncy(src, href, round = false) {
	let el1 = document.createElement("div");
	el1.classList.add("bouncy");

	let el2;
	if (href) {
		el2 = document.createElement("a");
		el2.href = href;
		el2.target = "_blank";
	} else {
		el2 = document.createElement("span");
	}

	if (round) {
		el2.classList.add("round");
	}

	el1.style = `animation: ${cssSlide("y")}`;
	el2.style = `--img: url(${src}); animation: ${cssSlide("x")}`;

	el1.appendChild(el2);
	document.body.appendChild(el1);
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
