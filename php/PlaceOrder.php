<?php
/*
  File: php/PlaceOrder.php
  Pastikan folder 'vendor' hasil instalasi composer berada satu tingkat di luar folder 'php'
*/

require_once '../vendor/autoload.php';

// 1. Konfigurasi Midtrans
// Set Server Key milikmu
// Mid-server-SdGfxTV34L8unPyXE03o356V
\Midtrans\Config::$serverKey = '';
// Set ke false untuk Sandbox, true untuk Production
\Midtrans\Config::$isProduction = false;
\Midtrans\Config::$isSanitized = true;
\Midtrans\Config::$is3ds = true;

// 2. Mengambil data dari POST yang dikirim oleh app.js
// Menggunakan operator ?? (null coalescing) agar tidak error jika data kosong
$total = isset($_POST['total']) ? (int)$_POST['total'] : 0;
$items_raw = $_POST['items'] ?? '[]';
$items_array = json_decode($items_raw, true);

$name = $_POST['name'] ?? 'Customer';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';

// 3. Menyusun parameter transaksi
$params = array(
    'transaction_details' => array(
        'order_id' => 'MN-' . rand() . '-' . time(), // Order ID unik
        'gross_amount' => $total,
    ),
    'item_details' => $items_array,
    'customer_details' => array(
        'first_name' => $name,
        'email' => $email,
        'phone' => $phone,
    ),
);

// 4. Mendapatkan Snap Token
try {
    $snapToken = \Midtrans\Snap::getSnapToken($params);
    echo $snapToken;
} catch (Exception $e) {
    // Jika terjadi error dari API Midtrans, kirim pesan error agar muncul di console log
    http_response_code(400);
    echo "Error Midtrans: " . $e->getMessage();
}
?>