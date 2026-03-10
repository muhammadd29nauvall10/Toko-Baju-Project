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

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector(".shopping-cart");

document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");

  e.preventDefault();
};

// Klik di luar elemen untuk nonaktif class
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

// Modal Box
// id="item-detail-modal-empat"
// class="item-detail-button-produk-empat"

/* 1. Menyeleksi semua elemen tombol menggunakan querySelectorAll.
  Fungsi ini mengambil semua elemen yang memiliki class yang diawali dengan 'item-detail-button-produk-'.
  Analogi: Kita mendata semua tombol "mata" yang ada di setiap produk sekaligus.
*/
const itemDetailButtons = document.querySelectorAll(
  '[class^="item-detail-button-produk-"]'
);

/* 2. Melakukan perulangan menggunakan fungsi forEach.
  Fungsi ini akan menjalankan perintah yang sama untuk setiap tombol yang sudah kita data tadi.
  Analogi: Kita mendatangi satu per satu tombol tersebut untuk memberikan instruksi klik.
*/
itemDetailButtons.forEach((btn) => {
  /* 3. Mengambil ID unik menggunakan fungsi split() dan pop().
    - split('-'): Memotong nama class menjadi potongan kata berdasarkan tanda hubung (-).
    - pop(): Mengambil potongan kata terakhir (misal: 'satu', 'dua', dst).
    Analogi: Kita melihat "label" pada tombol untuk tahu ini tombol milik produk yang mana.
  */
  const produkId = btn.className.split("-").pop();

  /* 4. Menyeleksi Modal yang sesuai menggunakan Template Literals (` `).
    Kita menggabungkan teks '#item-detail-modal-' dengan variabel produkId yang baru kita ambil.
    Analogi: Setelah tahu nomor produknya, kita cari kunci untuk membuka pintu modal yang tepat.
  */
  const targetModal = document.querySelector(`#item-detail-modal-${produkId}`);

  // Menjalankan fungsi onclick
  // Analogi: Instruksi apa yang harus dilakukan saat tombol diklik.
  btn.onclick = (e) => {
    // Mengubah properti display pada CSS menjadi flex agar modal muncul.
    targetModal.style.display = "flex";
    e.preventDefault(); // Mencegah link melompat ke atas halaman (komentar asli)
  };

  // click tombol close Modal Box
  /* 5. Menyeleksi elemen di dalam elemen lain (Nested Selector).
    Kita hanya mencari class .close-icon yang ada di dalam modal yang sedang aktif.
    Analogi: Menutup pintu kamar dari dalam menggunakan tombol silang yang ada di kamar itu.
  */
  targetModal.querySelector(".close-icon").onclick = (e) => {
    // Mengubah properti display menjadi none untuk menyembunyikan kembali modal.
    targetModal.style.display = "none";
    e.preventDefault();
  };

  // click di luar Modal Box
  /* 6. Menggunakan Event Listener pada jendela browser (window).
    Ini berfungsi untuk mendeteksi jika pengguna mengklik area transparan di luar kotak modal.
    Analogi: Jika kamu mengetuk area di luar dinding kamar (overlay), maka kamar otomatis tertutup.
  */
  window.addEventListener("click", (e) => {
    // Mengecek apakah area yang diklik tepat pada elemen modal (area transparan).
    if (e.target === targetModal) {
      targetModal.style.display = "none";
    }
  });
});
