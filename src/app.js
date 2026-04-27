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

// Logika Validasi Form & Kirim Data ke Midtrans
document.addEventListener("DOMContentLoaded", () => {
  const checkoutButton = document.querySelector(".checkout-button");
  const checkoutForm = document.querySelector("#checkoutForm");

  if (!checkoutForm || !checkoutButton) return;

  // 1. Fungsi Validasi Tombol (Aktif jika form diisi)
  checkoutForm.addEventListener("keyup", () => {
    let allFilled = true;
    for (let i = 0; i < checkoutForm.elements.length; i++) {
      const el = checkoutForm.elements[i];
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

  // 2. Fungsi Kirim Data ke PlaceOrder.php
  checkoutButton.addEventListener("click", async function (e) {
    e.preventDefault();

    const formData = new FormData(checkoutForm);

    try {
      const response = await fetch("php/PlaceOrder.php", {
        method: "POST",
        body: formData,
      });

      const token = await response.text();

      if (
        token.includes("error") ||
        token.includes("Warning") ||
        token.includes("Fatal")
      ) {
        console.error("Backend Error:", token);
        alert("Terjadi kesalahan pada server. Cek konsol untuk detail.");
      } else {
        // --- INTEGRASI CALLBACK MIDTRANS START ---
        window.snap.pay(token.trim(), {
          onSuccess: function (result) {
            /* Implementasi jika pembayaran berhasil */
            alert("Pembayaran Berhasil!");
            console.log(result);
            // Opsional: Kosongkan keranjang setelah sukses
            // Alpine.store('cart').items = [];
            // Alpine.store('cart').total = 0;
            // Alpine.store('cart').quantity = 0;
          },
          onPending: function (result) {
            /* Implementasi jika pembayaran tertunda (misal: Alfamart/Indomaret/VA) */
            alert("Menunggu pembayaran Anda!");
            console.log(result);
          },
          onError: function (result) {
            /* Implementasi jika pembayaran gagal */
            alert("Pembayaran Gagal!");
            console.log(result);
          },
          onClose: function () {
            /* Implementasi jika user menutup popup tanpa bayar */
            alert("Anda menutup jendela pembayaran sebelum selesai.");
          },
        });
        // --- INTEGRASI CALLBACK MIDTRANS END ---
      }
    } catch (err) {
      console.log("Fetch Error:", err.message);
      alert("Gagal terhubung ke server.");
    }
  });
});
