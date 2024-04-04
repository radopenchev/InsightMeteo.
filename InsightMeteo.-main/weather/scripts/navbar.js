const menuToggle = document.querySelector(".menu-bars");
const nav = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("menu-open");
});

document.addEventListener("click", (event) => {
  if (!event.target.closest("nav") && nav.classList.contains("menu-open")) {
    nav.classList.remove("menu-open");
  }
});
