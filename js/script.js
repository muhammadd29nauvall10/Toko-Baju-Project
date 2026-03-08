// tanda "=>" artinya minta jalankan sebuah fungsi,
// const adalah untuk menulis variabel,
// document.querySelector untuk ambil class atau id dari elemen html,
// toggle untuk menambahkan class active ketika belum ada, dan kalau udah ada kita klik lagi class active nya hilang

// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu / garis 3 diklik akan muncul menu-menu lain nya
document.querySelector("#hamburger-menu").onclick = (e) => {
  navbarNav.classList.toggle("active");
  e.preventDefault(); // Mencegah link melompat ke atas halaman
};

// Toggle class active untuk search form.
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");
// ketika elemen search-button ini diklik, jalankan sebuah fungsi untuk memunculkan variable searchForm menggunakan toggle
// parameter e dan e.preventdefault pas onclick berfugnsi agar ketika kita lagi tidak di halaman awal, san klik ikon search itu tidak langsung balik ke halaman awa. jika tidak ada e dan e.preventdefault maka ketika kita klik ikon search pas di page bawah otomatis naik ke atas lagi
document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  // Berikan jeda 300ms (sesuai transition di CSS) agar fokus berjalan lancar
  setTimeout(() => {
    searchBox.focus(); // agar ketika klik button search langsung nyala fitur search nya jadi gak perlu klik dibagian elemen input html lagi
  }, 300);

  e.preventDefault();
};

// Klik di luar elemen untuk nonaktif class
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
});
