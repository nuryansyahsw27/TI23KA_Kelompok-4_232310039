<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "192.168.100.13";
$username = "root";
$password = "123";
$dbname = "CRMChatbot";

try {
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    $conn->set_charset("utf8mb4");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception("Invalid JSON data");
        }

        if (empty($data['username']) || empty($data['message'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Username and message are required']);
            exit;
        }

        $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
        $stmt->bind_param("s", $data['username']);
        $stmt->execute();
        $user = $stmt->get_result()->fetch_assoc();

        if (!$user) {
            http_response_code(404);
            echo json_encode(['status' => 'error', 'message' => 'User not found']);
            exit;
        }

        $stmt = $conn->prepare("
            INSERT INTO chat_history (user_id, message, sender, is_deleted)
            VALUES (?, ?, 'user', 0)
        ");
        $stmt->bind_param("is", $user['id'], $data['message']);

        if (!$stmt->execute()) {
            throw new Exception("Failed to save user message: " . $stmt->error);
        }

        $userMessageId = $conn->insert_id;

        $response = generateBotResponse($data['message'], $conn);

        $stmt = $conn->prepare("
            INSERT INTO chat_history (user_id, response, sender, is_deleted)
            VALUES (?, ?, 'bot', 0)
        ");
        $stmt->bind_param("is", $user['id'], $response);

        if (!$stmt->execute()) {
            throw new Exception("Failed to save bot response: " . $stmt->error);
        }

        echo json_encode([
            'status' => 'success',
            'data' => [
                'chat_id' => $userMessageId,
                'response' => $response
            ]
        ]);
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $username = $_GET['username'] ?? '';

        if (empty($username)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Username is required']);
            exit;
        }

        $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $user = $stmt->get_result()->fetch_assoc();

        if (!$user) {
            http_response_code(404);
            echo json_encode(['status' => 'error', 'message' => 'User not found']);
            exit;
        }

        $stmt = $conn->prepare("UPDATE chat_history SET is_deleted = 1 WHERE user_id = ?");
        $stmt->bind_param("i", $user['id']);

        if (!$stmt->execute()) {
            throw new Exception("Failed to clear chat history: " . $stmt->error);
        }

        echo json_encode([
            'status' => 'success',
            'message' => 'Chat history cleared from view (but still kept in database)'
        ]);
        exit;
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Server error: ' . $e->getMessage()
    ]);
} finally {
    if (isset($conn)) {
        $conn->close();
    }
}

function generateBotResponse($message, $conn) {
    $message = strtolower(trim($message));

    // 1. Balasan default untuk keyword khusus
    if ($message === 'info') {
        return "Berikut informasi pendaftaran:\n• Biaya: Rp 500.000\n• Syarat: KTP, Pas Foto, Ijazah\n• Jadwal: Hari kerja 08.00–15.00\n• Lokasi: Kampus ABC, Jalan XYZ\n• Formulir: Di website resmi\n• Estimasi biaya masuk: Rp 1.500.000";
    }

    // 2. Pisahkan kalimat menjadi kata-kata
    $words = preg_split('/\s+/', $message);
    $candidates = [];

    // 3. Ambil semua baris FAQ
    $result = $conn->query("SELECT id, question, answer, tags FROM faq");

    while ($row = $result->fetch_assoc()) {
        $score = 0;
        $tagString = strtolower($row['tags']);

        foreach ($words as $word) {
            $word = trim($word);
            if (strlen($word) < 3) continue; // Skip kata terlalu pendek (e.g., di, ke, yg)

            // Jika kata ditemukan di tags, tingkatkan skor
            if (strpos($tagString, $word) !== false) {
                $score++;
            }
        }

        if ($score > 0) {
            $candidates[] = [
                'score' => $score,
                'answer' => $row['answer']
            ];
        }
    }

    // 4. Jika ada kandidat dengan skor, pilih yang paling relevan
    if (!empty($candidates)) {
        usort($candidates, fn($a, $b) => $b['score'] - $a['score']);
        return $candidates[0]['answer'];
    }

    // 5. Jika tidak ditemukan via tags, coba cari full string dari question/tags
    $stmt = $conn->prepare("
        SELECT question, answer 
        FROM faq 
        WHERE LOWER(question) LIKE CONCAT('%', ?, '%') 
           OR LOWER(tags) LIKE CONCAT('%', ?, '%')
        LIMIT 1
    ");
    $stmt->bind_param("ss", $message, $message);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $faq = $result->fetch_assoc();
        return $faq['answer'];
    }

    // 6. Jika tetap tidak ada hasil
    return "Maaf, saya belum menemukan jawaban untuk pertanyaan tersebut. Silakan coba pertanyaan lain atau ketik 'info' untuk informasi umum.";
}
