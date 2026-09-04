const spots = ["nw", "n", "ne", "w", "c", "e", "sw", "s", "se"];
const langs = ["en", "es", "ru"];

const state = {
    page: "home",
    lang: "en",
    theme: "light",
    set: { images: true, detailed: false, study: 30, wait: 30, distraction: false, directions: "cardinal" },
    counts: Object.fromEntries(cats.map(cat => [cat.id, 0])),
    room: [],
    tray: [],
    picks: [],
    detail: {},
    place: {},
    focus: null,
    timer: null,
    task: -1,
    taskset: []
};

const el = id => document.getElementById(id);
const local = text => text[state.lang];
const text = key => words[state.lang][key] || key;
const fill = (key, vars = {}) => Object.entries(vars).reduce((value, pair) => value.replace(`{${pair[0]}}`, pair[1]), text(key));
const entry = id => catalog.find(item => item.id === id);
const group = id => cats.find(cat => cat.id === id);
const total = () => Object.values(state.counts).reduce((sum, value) => sum + value, 0);
function shuffled(list) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}
const chosen = list => list[Math.floor(Math.random() * list.length)];
const clamp = value => Math.max(1, Math.min(600, Number(value) || 1));

function asset(item, detail = null, base = false) {
    const cat = group(item.cat);
    const file = detail && !base ? detail.img : item.img;
    const dir = detail && !base ? "Colored" : "Colorless";
    return `Source/Assets/${cat.dir}/${dir}/${file}.png`;
}

function label(item, detail = null) {
    if (state.set.detailed && detail) return local(detail.name);
    return local(item.name);
}

function place(id) {
    return local(places[state.set.directions][id]);
}

function image(item, detail = null, base = false) {
    if (!state.set.images) return "";
    return `<img class="itemimg${detail && !base ? "" : " mono"}" src="${asset(item, detail, base)}" alt="${label(item, base ? null : detail)}">`;
}

function clear() {
    if (state.timer) clearInterval(state.timer);
    state.timer = null;
}

function reset() {
    clear();
    state.room = [];
    state.tray = [];
    state.picks = [];
    state.detail = {};
    state.place = {};
    state.focus = null;
    state.task = -1;
    state.taskset = [];
}

function show(page) {
    clear();
    state.page = page;
    document.querySelectorAll(".page").forEach(node => node.classList.toggle("active", node.id === page));
    window.scrollTo({ top: 0, behavior: "auto" });
    paint();
}

function theme() {
    document.documentElement.dataset.theme = state.theme;
    const dark = state.theme === "dark";
    el("theme").querySelector("i").className = dark ? "ph ph-moon" : "ph ph-sun";
    el("theme").querySelector("span").textContent = dark ? "DM" : "LM";
    document.querySelector('meta[name="theme-color"]').content = dark ? "#151715" : "#f4f4f1";
}

function translate() {
    document.documentElement.lang = state.lang;
    document.title = game;
    document.querySelectorAll("[data-title]").forEach(node => node.textContent = game);
    document.querySelectorAll("[data-logo]").forEach(node => node.innerHTML = `<span>${game.slice(0, 2)}</span>${game.slice(2)}`);
    document.querySelectorAll("[data-t]").forEach(node => node.textContent = text(node.dataset.t));
    el("lang").querySelector("span").textContent = state.lang.toUpperCase();
    el("directions").textContent = text(state.set.directions);
    document.querySelectorAll("[data-go='home']").forEach(node => node.setAttribute("aria-label", text("home")));
}

function paint() {
    translate();
    theme();
    if (state.page === "setup") setup();
    if (state.page === "preview") scene(document.querySelector('[data-room="preview"]'));
    if (state.page === "study") scene(document.querySelector('[data-room="study"]'));
    if (state.page === "wait") distract(false);
    if (state.page === "recognition") recognize();
    if (state.page === "details") features();
    if (state.page === "location") locate();
    if (state.page === "results") scores();
    if (state.page === "help") guide();
    if (state.page === "location") document.querySelector("#location .eyebrow").textContent = text(state.set.detailed ? "phase5" : "phase4");
}

function setup() {
    const box = el("cats");
    box.innerHTML = "";
    const sum = total();
    cats.forEach(cat => {
        const max = catalog.filter(item => item.cat === cat.id).length;
        const next = { ...state.counts, [cat.id]: state.counts[cat.id] + 1 };
        const row = document.createElement("div");
        row.className = "cat";
        row.innerHTML = `<span>${local(cat.name)}</span><div class="stepper"><button data-cat="${cat.id}" data-step="-1" aria-label="-">−</button><b>${state.counts[cat.id]}</b><button data-cat="${cat.id}" data-step="1" aria-label="+">+</button></div>`;
        const buttons = row.querySelectorAll("button");
        buttons[0].disabled = state.counts[cat.id] === 0;
        buttons[1].disabled = sum >= 9 || state.counts[cat.id] >= max || !possible(next);
        box.append(row);
    });
    el("total").textContent = `${sum} / 9`;
    el("generate").disabled = sum === 0;
}

function build() {
    const plan = {};
    const order = shuffled(cats.filter(cat => state.counts[cat.id])).sort((a, b) => fits[a.id][state.counts[a.id]].size - fits[b.id][state.counts[b.id]].size);
    if (!layout(order, 0, 0, plan)) return false;

    const room = [];
    for (const cat of order) {
        const rows = assign(cat.id, plan[cat.id]);
        if (!rows) return false;
        room.push(...rows);
    }

    state.room = shuffled(room);
    return true;
}

function layout(list, index, used, plan) {
    if (index === list.length) return true;
    const cat = list[index];
    const count = state.counts[cat.id];
    for (const mask of shuffled([...fits[cat.id][count]])) {
        if (used & mask) continue;
        plan[cat.id] = mask;
        if (layout(list, index + 1, used | mask, plan)) return true;
    }
    delete plan[cat.id];
    return false;
}

function assign(cat, mask) {
    const pool = shuffled(catalog.filter(item => item.cat === cat));
    const open = item => spots.filter(spot => mask & bits[spot] && item.pos.includes(spot)).length;
    const targets = shuffled(spots.filter(spot => mask & bits[spot])).sort((a, b) => pool.filter(item => item.pos.includes(a)).length - pool.filter(item => item.pos.includes(b)).length);
    const rows = [];
    const used = new Set();

    function fill(index) {
        if (index === targets.length) return true;
        const spot = targets[index];
        const choices = shuffled(pool.filter(item => !used.has(item.id) && item.pos.includes(spot))).sort((a, b) => open(a) - open(b));
        for (const item of choices) {
            used.add(item.id);
            rows.push({ item, detail: null, place: spot });
            if (fill(index + 1)) return true;
            rows.pop();
            used.delete(item.id);
        }
        return false;
    }

    if (!fill(0)) return null;
    rows.forEach(row => row.detail = state.set.detailed ? chosen(row.item.detail) : null);
    return rows;
}

const bits = Object.fromEntries(spots.map((spot, index) => [spot, 1 << index]));
const fits = Object.fromEntries(cats.map(cat => {
    const sets = Array.from({ length: 10 }, () => new Set());
    sets[0].add(0);
    catalog.filter(item => item.cat === cat.id).forEach(item => {
        for (let count = 8; count >= 0; count--) {
            for (const mask of [...sets[count]]) {
                for (const spot of item.pos) {
                    const flag = bits[spot];
                    if (!(mask & flag)) sets[count + 1].add(mask | flag);
                }
            }
        }
    });
    return [cat.id, sets];
}));

function possible(counts) {
    if (Object.values(counts).reduce((sum, count) => sum + count, 0) > 9) return false;
    let layouts = new Set([0]);

    for (const cat of cats) {
        const options = fits[cat.id][counts[cat.id] || 0];
        if (!options || !options.size) return false;
        const next = new Set();
        for (const used of layouts) {
            for (const mask of options) {
                if (!(used & mask)) next.add(used | mask);
            }
        }
        if (!next.size) return false;
        layouts = next;
    }

    return true;
}

function scene(box) {
    if (!box) return;
    box.innerHTML = "";
    spots.forEach(spot => {
        const slot = document.createElement("div");
        slot.className = "slot";
        const found = state.room.find(row => row.place === spot);
        slot.innerHTML = `<small>${place(spot)}</small>`;
        if (found) slot.innerHTML += `${image(found.item, found.detail)}<span class="itemname">${label(found.item, found.detail)}</span>`;
        box.append(slot);
    });
}

function generate() {
    el("setupnote").className = "notice";
    el("setupnote").textContent = "";
    if (!total()) {
        el("setupnote").className = "notice error";
        el("setupnote").textContent = text("empty");
        return;
    }
    let ok = false;
    for (let pass = 0; pass < 30 && !ok; pass++) ok = build();
    if (!ok) {
        el("setupnote").className = "notice error";
        el("setupnote").textContent = text("impossible");
        return;
    }
    state.picks = [];
    state.detail = {};
    state.place = {};
    show("preview");
}

function reroll() {
    let ok = false;
    for (let pass = 0; pass < 30 && !ok; pass++) ok = build();
    if (!ok) {
        el("previewnote").className = "notice error";
        el("previewnote").textContent = text("impossible");
        return;
    }
    el("previewnote").textContent = "";
    scene(document.querySelector('[data-room="preview"]'));
}

function format(seconds) {
    const value = Math.max(0, Math.ceil(seconds));
    const min = String(Math.floor(value / 60)).padStart(2, "0");
    const sec = String(value % 60).padStart(2, "0");
    return `${min}:${sec}`;
}

function timer(kind, seconds, done, step = null) {
    clear();
    const clock = el(`${kind}clock`);
    const bar = el(`${kind}bar`);
    const start = Date.now();
    const length = seconds * 1000;
    const tick = () => {
            const elapsed = Date.now() - start;
            const remain = Math.max(0, length - elapsed);
            clock.textContent = format(remain / 1000);
            bar.style.width = `${remain / length * 100}%`;
            if (step) step(elapsed / 1000);
            if (remain <= 0) {
            clear();
            done();
        }
    };
    tick();
    state.timer = setInterval(tick, 100);
}

function study() {
    show("study");
    scene(document.querySelector('[data-room="study"]'));
    timer("study", state.set.study, wait);
}

function wait() {
    show("wait");
    state.task = -1;
    state.taskset = maketasks(state.set.wait);
    distract(true);
    timer("wait", state.set.wait, recall, elapsed => {
        if (!state.set.distraction) return;
        const index = Math.min(state.taskset.length - 1, Math.floor(elapsed / 15));
        if (index !== state.task) {
            state.task = index;
            distract(true);
        }
    });
}

function maketasks(seconds) {
    const count = Math.ceil(seconds / 15);
    const list = [];
    while (list.length < count) {
        const next = Math.floor(Math.random() * tasks.length);
        if (!list.length || list[list.length - 1] !== next) list.push(next);
    }
    return list;
}

function distract(force) {
    const box = el("task");
    if (!state.set.distraction) {
        box.classList.add("hidden");
        return;
    }
    box.classList.remove("hidden");
    if (!state.taskset.length) state.taskset = maketasks(state.set.wait);
    if (state.task < 0) state.task = 0;
    const current = state.taskset[state.task] ?? state.taskset[0];
    if (force || !box.textContent) box.textContent = local(tasks[current]);
    else box.textContent = local(tasks[current]);
}

function recall() {
    clear();
    const real = state.room.map(row => row.item.id);
    const wanted = real.length;
    const selected = cats.filter(cat => state.counts[cat.id] > 0).map(cat => cat.id);
    const preferred = catalog.filter(item => selected.includes(item.cat) && !real.includes(item.id));
    const extra = catalog.filter(item => !selected.includes(item.cat) && !real.includes(item.id));
    const decoys = [...shuffled(preferred), ...shuffled(extra)].slice(0, wanted);
    state.tray = shuffled([...state.room.map(row => row.item), ...decoys]);
    state.picks = [];
    state.detail = {};
    state.place = {};
    state.focus = null;
    show("recognition");
}

function recognize() {
    const box = el("tray");
    const need = state.room.length;
    el("picklead").textContent = fill("picklead", { n: need });
    el("pickcount").textContent = `${state.picks.length} / ${need}`;
    box.innerHTML = "";
    state.tray.forEach(item => {
        const button = document.createElement("button");
        button.className = `card${state.picks.includes(item.id) ? " selected" : ""}`;
        button.dataset.item = item.id;
        button.innerHTML = `${image(item, null, true)}<span>${local(item.name)}</span>`;
        box.append(button);
    });
}

function pick(id) {
    const need = state.room.length;
    const index = state.picks.indexOf(id);
    if (index >= 0) state.picks.splice(index, 1);
    else if (state.picks.length < need) state.picks.push(id);
    recognize();
}

function features() {
    const box = el("detailtray");
    const count = Object.keys(state.detail).length;
    el("detailcount").textContent = `${count} / ${state.picks.length}`;
    el("detaildone").disabled = count !== state.picks.length;
    box.innerHTML = "";
    state.picks.forEach(id => {
        const item = entry(id);
        const row = document.createElement("div");
        row.className = "detailrow";
        row.innerHTML = `<b>${local(item.name)}</b><div class="variants"></div>`;
        const variants = row.querySelector(".variants");
        item.detail.forEach(detail => {
            const button = document.createElement("button");
            button.className = `variant${state.detail[id] === detail.id ? " selected" : ""}`;
            button.dataset.item = id;
            button.dataset.detail = detail.id;
            button.innerHTML = `${image(item, detail)}<span>${local(detail.name)}</span>`;
            variants.append(button);
        });
        box.append(row);
    });
}

function locate() {
    const box = el("objects");
    const room = el("reconstruct");
    const count = Object.keys(state.place).length;
    el("placecount").textContent = `${count} / ${state.picks.length}`;
    el("placedone").disabled = count !== state.picks.length;
    box.innerHTML = "";
    state.picks.forEach(id => {
        const item = entry(id);
        const button = document.createElement("button");
        button.className = `object${state.focus === id ? " selected" : ""}`;
        button.dataset.item = id;
        button.innerHTML = `<span>${local(item.name)}</span><em>${state.place[id] ? place(state.place[id]) : "—"}</em>`;
        box.append(button);
    });
    room.innerHTML = "";
    spots.forEach(spot => {
        const owner = Object.keys(state.place).find(id => state.place[id] === spot);
        const slot = document.createElement("div");
        slot.className = `slot${owner ? " occupied" : ""}${owner && owner === state.focus ? " focus" : ""}`;
        slot.dataset.spot = spot;
        slot.innerHTML = `<small>${place(spot)}</small>`;
        if (owner) {
            const item = entry(owner);
            slot.innerHTML += `${image(item, null, true)}<span class="itemname">${local(item.name)}</span>`;
        }
        room.append(slot);
    });
}

function put(spot) {
    if (!state.focus) return;
    const owner = Object.keys(state.place).find(id => state.place[id] === spot);
    if (owner === state.focus) delete state.place[state.focus];
    else if (!owner) state.place[state.focus] = spot;
    else state.focus = owner;
    locate();
}

function finish() {
    show("results");
    burst();
}

function score() {
    const n = state.room.length;
    const actual = new Set(state.room.map(row => row.item.id));
    const r = state.picks.filter(id => actual.has(id)).length;
    const l = state.room.filter(row => state.picks.includes(row.item.id) && state.place[row.item.id] === row.place).length;
    const d = state.set.detailed ? state.room.filter(row => state.picks.includes(row.item.id) && state.detail[row.item.id] === row.detail.id).length : 0;
    const rp = Math.round(r / n * 100);
    const lp = Math.round(l / n * 100);
    const dp = state.set.detailed ? Math.round(d / n * 100) : null;
    const scene = Math.round(state.set.detailed ? (rp + lp + dp) / 3 : (rp + lp) / 2);
    return { n, r, l, d, rp, lp, dp, scene };
}

function scores() {
    const box = el("scores");
    const value = score();
    const rows = [
        ["recognitionresult", value.rp, fill("correct", { a: value.r, b: value.n })],
        ["locationresult", value.lp, fill("correct", { a: value.l, b: value.n })]
    ];
    if (state.set.detailed) rows.push(["featureresult", value.dp, fill("correct", { a: value.d, b: value.n })]);
    box.innerHTML = rows.map(row => `<div class="score"><div><b>${text(row[0])}</b><small>${row[2]}</small></div><strong>${row[1]}%</strong></div>`).join("");
    box.innerHTML += `<div class="score scene"><div><b>${text("scene")}</b></div><strong>${value.scene}%</strong></div>`;
}

function burst() {
    if (typeof confetti !== "function") return;
    confetti({ particleCount: 65, angle: 270, spread: 80, startVelocity: 22, gravity: 1.1, ticks: 60, origin: { y: .02 } });
}

function guide() {
    const box = el("helpcopy");
    const steps = howplay.map(step => `<li>${local(step)}</li>`).join("");
    box.innerHTML = `<div class="topic"><p>${fill("helpintro", { game })}</p></div><div class="topic"><h3>${text("how")}</h3><ol>${steps}</ol><p>${text("controls")}</p></div>` + topics.map(topic => `<div class="topic"><h3>${local(topic.title)}</h3><p>${local(topic.text)}</p></div>`).join("");
}

function settings() {
    state.set.images = el("images").checked;
    state.set.detailed = el("detailed").checked;
    state.set.distraction = el("distraction").checked;
    state.set.study = clamp(el("studytime").value);
    state.set.wait = clamp(el("waittime").value);
    el("studytime").value = state.set.study;
    el("waittime").value = state.set.wait;
}

document.addEventListener("click", event => {
    const go = event.target.closest("[data-go]");
    if (go) {
        const page = go.dataset.go;
        if (page === "home" && state.page !== "home") reset();
        show(page);
        return;
    }

    const step = event.target.closest("[data-step]");
    if (step) {
        const id = step.dataset.cat;
        const change = Number(step.dataset.step);
        const max = catalog.filter(item => item.cat === id).length;
        const next = state.counts[id] + change;
        const counts = { ...state.counts, [id]: next };
        if (next >= 0 && next <= max && total() + change <= 9 && (change < 1 || possible(counts))) state.counts[id] = next;
        setup();
        return;
    }

    const card = event.target.closest("#tray [data-item]");
    if (card) return pick(card.dataset.item);

    const variant = event.target.closest("#detailtray [data-detail]");
    if (variant) {
        state.detail[variant.dataset.item] = variant.dataset.detail;
        features();
        return;
    }

    const object = event.target.closest("#objects [data-item]");
    if (object) {
        state.focus = object.dataset.item;
        locate();
        return;
    }

    const slot = event.target.closest("#reconstruct [data-spot]");
    if (slot) put(slot.dataset.spot);
});

el("theme").addEventListener("click", () => {
    state.theme = state.theme === "light" ? "dark" : "light";
    theme();
});

el("lang").addEventListener("click", () => {
    state.lang = langs[(langs.indexOf(state.lang) + 1) % langs.length];
    paint();
});

el("generate").addEventListener("click", generate);
el("reroll").addEventListener("click", reroll);
el("begin").addEventListener("click", study);
el("redo").addEventListener("click", study);
el("studyskip").addEventListener("click", wait);
el("waitskip").addEventListener("click", recall);
el("quit").addEventListener("click", () => { reset(); show("home"); });
el("pickdone").addEventListener("click", () => show(state.set.detailed ? "details" : "location"));
el("detaildone").addEventListener("click", () => show("location"));
el("placedone").addEventListener("click", finish);
el("directions").addEventListener("click", () => {
    state.set.directions = state.set.directions === "cardinal" ? "relative" : "cardinal";
    paint();
});

["images", "detailed", "distraction", "studytime", "waittime"].forEach(id => {
    el(id).addEventListener("change", settings);
});

paint();