// Memasukkan data pada array di alpine js
document.addEventListener("alpine:init", () => {
  // Fungsi rupiah ditaruh di window agar bisa diakses Alpine.js di HTML
  window.rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

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

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      const cartItem = this.items.find((item) => item.id === newItem.id);
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) return item;
          item.quantity++;
          item.total = item.price * item.quantity;
          this.quantity++;
          this.total += item.price;
          return item;
        });
      }
    },
    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);
      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) return item;
          item.quantity--;
          item.total = item.price * item.quantity;
          this.quantity--;
          this.total -= item.price;
          return item;
        });
      } else {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Logika Validasi Form & Kirim Data
document.addEventListener("DOMContentLoaded", () => {
  const checkoutButton = document.querySelector(".checkout-button");
  const checkoutForm = document.querySelector("#checkoutForm");

  if (!checkoutForm || !checkoutButton) return;

  // 1. Fungsi Validasi Tombol
  checkoutForm.addEventListener("keyup", () => {
    let allFilled = true;
    for (let i = 0; i < checkoutForm.elements.length; i++) {
      const el = checkoutForm.elements[i];
      // Abaikan tombol submit dan input hidden
      if (el.type !== "submit" && el.type !== "hidden") {
        if (el.value.trim().length === 0) {
          allFilled = false;
          break;
        }
      }
    }

    if (allFilled) {
      checkoutButton.disabled = false;
      checkoutButton.classList.remove("disabled");
    } else {
      checkoutButton.disabled = true;
      checkoutButton.classList.add("disabled");
    }
  });

  // 2. Fungsi Kirim Pesan ke WA
  checkoutButton.addEventListener("click", function (e) {
    e.preventDefault();
    const formData = new FormData(checkoutForm);
    const data = Object.fromEntries(formData.entries());

    try {
      const message = formatMessage(data);
      window.open(
        "https://wa.me/62895322269467?text=" + encodeURIComponent(message)
      );
    } catch (err) {
      console.error(err);
      alert("Gagal memproses pesanan. Pastikan keranjang tidak kosong.");
    }
  });
});

// Helper untuk format pesan WA
const formatMessage = (obj) => {
  const items = JSON.parse(obj.items);
  return `*Data Customer*
Nama: ${obj.name}
Email: ${obj.email}
No HP: ${obj.phone}

*Data Pesanan*
${items
  .map(
    (item) => `- ${item.name} (${item.quantity} x ${window.rupiah(item.price)})`
  )
  .join("\n")}

*TOTAL: ${window.rupiah(obj.total)}*
Terima Kasih.`;
};
