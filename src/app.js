// memasukkan data pada array di alpine js
document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Gamis Marwa Exclusive",
        img: "Gamis1.jpg",
        price: 195000,
      },
      {
        id: 2,
        name: "Gamis Syar i Busui Ceruty",
        img: "Gamis2.jpg",
        price: 350000,
      },
      {
        id: 3,
        name: "Gamis Ceruty Furing Outer",
        img: "Gamis3.jpg",
        price: 255000,
      },
      {
        id: 4,
        name: "Hijab Voal Flair Series",
        img: "Jilbab1.jpg",
        price: 40000,
      },
      {
        id: 5,
        name: "Hijab Voal Blush Series",
        img: "Jilbab2.jpg",
        price: 35000,
      },
      {
        id: 6,
        name: "Hijab Voal Mist Series",
        img: "Jilbab3.jpg",
        price: 35000,
      },
    ],
  }));
});
