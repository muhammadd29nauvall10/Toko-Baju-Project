// memasukkan data pada array di alpine js
document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Gamis Marwa Exclusive",
        img: "Gamis1.jpeg",
        price: 195000,
      },
      {
        id: 2,
        name: "Gamis Syar i Busui Ceruty",
        img: "Gamis2.jpeg",
        price: 350000,
      },
      {
        id: 3,
        name: "Gamis Ceruty Furing Outer",
        img: "Gamis3.jpeg",
        price: 255000,
      },
      {
        id: 4,
        name: "Hijab Voal Flair Series",
        img: "Jilbab1.jpeg",
        price: 40000,
      },
      {
        id: 5,
        name: "Hijab Voal Blush Series",
        img: "Jilbab2.jpeg",
        price: 35000,
      },
      {
        id: 6,
        name: "Hijab Voal Mist Series",
        img: "Jilbab3.jpeg",
        price: 35000,
      },
    ],
  }));

  // untuk menyambungkan ke shopping cart
  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);
      // jika belum ada / cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        // quantity ini untuk hitung keseluruhan barang di cart
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, tambah quantity dan sub totalnya
            item.quantity++;
            // quantity di atas untuk menghitung sebuah item
            item.total = item.price * item.quantity;

            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item yang mau di remove berdasarkan id
      const cartItem = this.items.find((item) => item.id === id);

      // jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // telusuri 1 1
        this.items = this.items.map((item) => {
          // jika bukan barang yang diklik, skip aja
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika barang nya sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Konversi ke rupiah dengan intl
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
