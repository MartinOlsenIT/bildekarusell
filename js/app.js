const images = [
    "Bilder/Natur1.png",
    "Bilder/natur2.png",
    "Bilder/natur3.png",
    "Bilder/natur4.png",
    "Bilder/natur5.png",
    "Bilder/naturbilde.png",
    "Bilder/naturbilde2.png",
    "Bilder/natur6.png",
    "Bilder/natur7.png",
    "Bilder/natur8.png",
    "Bilder/natur9.png",
    "Bilder/natur10.png",
    "Bilder/natur11.png"

];

let index = 0;
let interval;
const img = document.getElementById("carousel-img");
const dotsContainer = document.getElementById("dots");
const carousel = document.querySelector(".carousel");


images.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => jumpTo(i));
    dotsContainer.appendChild(dot);
});

function updateDots() {
    document.querySelectorAll(".dot").forEach((d, i) =>
        d.classList.toggle("active", i === index)
    );
}

function changeImage() {
    img.style.opacity = 0;
    img.style.transform = "translateX(20px)";
    setTimeout(() => {
        img.src = images[index];
        img.style.opacity = 1;
        img.style.transform = "translateX(0)";
    }, 200);
    updateDots();
}

function next() {
    index = (index + 1) % images.length;
    changeImage();
}

function prev() {
    index = (index - 1 + images.length) % images.length;
    changeImage();
}

function jumpTo(i) {
    index = i;
    changeImage();
}

document.querySelector(".next").addEventListener("click", next);
document.querySelector(".prev").addEventListener("click", prev);


function startAuto() {
    interval = setInterval(next, 3500);
}
function stopAuto() {
    clearInterval(interval);
}
startAuto();


carousel.addEventListener("mouseenter", stopAuto);
carousel.addEventListener("mouseleave", startAuto);

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
});

let startX = 0;

carousel.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    if (endX < startX - 40) next();   // swipe left
    if (endX > startX + 40) prev();   // swipe right
});
