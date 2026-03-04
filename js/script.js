// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu / garis 3 diklik akan muncul menu-menu lain nya
document.querySelector("#hamburger-menu").onclick = (e) => {
  navbarNav.classList.toggle("active");
  e.preventDefault(); // Mencegah link melompat ke atas halaman
};

// Klik diluar side bar untuk menghilangkan nav
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});
