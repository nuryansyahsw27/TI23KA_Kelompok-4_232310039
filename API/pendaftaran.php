<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Konfigurasi database
$servername = "192.168.100.13";  // Ubah dengan host MySQL Anda
$username = "root";         // Ubah dengan username MySQL Anda
$password = "123";             // Ubah dengan password MySQL Anda
$dbname = "CRMChatbot";     // Ubah dengan nama database Anda

// Membuat koneksi ke database
$conn = new mysqli($servername, $username, $password, $dbname);

// Mengecek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Mengambil data yang dikirimkan oleh frontend
$data = json_decode(file_get_contents("php://input"), true);

// Validasi data
if (isset($data['nama']) && isset($data['alamat']) && isset($data['usia']) && isset($data['lulusan']) &&
    isset($data['tempat_kelahiran']) && isset($data['nama_orang_tua']) && isset($data['alasan_masuk_kampus']) &&
    isset($data['biaya_pendaftaran'])) {

    // Menyiapkan query untuk menyimpan data pendaftaran
    $stmt = $conn->prepare("INSERT INTO pendaftaran (nama, alamat, usia, lulusan, tempat_kelahiran, nama_orang_tua, alasan_masuk_kampus, biaya_pendaftaran) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssissssi", $data['nama'], $data['alamat'], $data['usia'], $data['lulusan'], $data['tempat_kelahiran'], $data['nama_orang_tua'], $data['alasan_masuk_kampus'], $data['biaya_pendaftaran']);

    // Menjalankan query
    if ($stmt->execute()) {
        // Mengembalikan respons sukses
        echo json_encode([
            'status' => 'success',
            'message' => 'Pendaftaran berhasil!'
        ]);
    } else {
        // Mengembalikan respons error jika gagal menyimpan data
        echo json_encode([
            'status' => 'error',
            'message' => 'Pendaftaran gagal, coba lagi nanti.'
        ]);
    }

    // Menutup statement dan koneksi
    $stmt->close();
} else {
    // Jika data tidak lengkap
    echo json_encode([
        'status' => 'error',
        'message' => 'Data tidak lengkap. Pastikan semua kolom diisi.'
    ]);
}

// Menutup koneksi
$conn->close();
?>
