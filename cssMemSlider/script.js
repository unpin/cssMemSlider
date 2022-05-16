const root = document.querySelector(":root");
const items = document.querySelector(".items");
const controls = document.querySelector(".controls");
const caption = document.querySelector(".caption");

const res = await fetch("assets/data/animals.json");
const data = await res.json();

function slide(el) {
  const idx = el.dataset.index;
  root.style.setProperty("--slide-index", idx);
  updateButtons(idx);
  setCaption(idx);
}

function setCaption(idx = 0) {
  caption.classList.remove("active");
  caption.textContent = data[idx].description;
  setTimeout(() => caption.classList.add("active"), 200);
}

function setControls() {
  data.forEach((obj, idx) => {
    const li = document.createElement("li");
    li.className = "control-item";
    li.dataset.index = idx;

    const circleBtn = document.createElement("div");
    circleBtn.className = "dot";

    li.append(circleBtn);
    controls.append(li);
  });
}

function updateButtons(index = 0) {
  const buttons = Array.from(controls.children);
  buttons.forEach((btn, i) => {
    if (Number(index) === i) {
      btn.firstChild.classList.add("active");
    } else {
      btn.firstChild.classList.remove("active");
    }
  });
}

function createSlides() {
  data.forEach((obj) => {
    const img = document.createElement("img");
    img.className = "item";
    img.src = obj.image;
    items.append(img);
  });
}

controls.addEventListener("click", (e) => {
  const target = e.target;
  const item = target.closest(".control-item");
  if (!item) return;
  if (!controls.contains(item)) return;
  slide(item);
});

function start() {
  createSlides();
  setCaption();
  setControls();
  updateButtons();
}

start();
