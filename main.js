const PEPEGA_EMOTES_HOST = "https://emotes.pepega.club";

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

function createPepega(src) {
	let el = document.createElement("img");

	el.src = src;
	el.classList.add("pepega");
	el.style = `animation: ${cssSlide("x")}, ${cssSlide("y")}`;

	document.body.appendChild(el);
}

function arrayPick(arr, n) {
    let result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        return result;
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

	for (const emote of arrayPick(emotes, 15)) {
		createPepega(`${PEPEGA_EMOTES_HOST}/emotes/${emote}`);
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
