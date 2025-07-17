<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Konfigurasi database
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

    // Handle preflight request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    // GET Request - Load chat history
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $username = $_GET['username'] ?? '';
        $limit = (int)($_GET['limit'] ?? 10);
        $show_all = isset($_GET['show_all']) ? (int)$_GET['show_all'] : 0;
        
        if (empty($username)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Username is required']);
            exit;
        }
        
        // Different query based on whether we want to show all messages (including deleted)
        $query = "
            SELECT ch.id, ch.user_id, ch.message, ch.response, ch.sender, ch.created_at, ch.is_deleted 
            FROM chat_history ch
            JOIN users u ON ch.user_id = u.id
            WHERE u.username = ?
        ";
        
        if (!$show_all) {
            $query .= " AND ch.is_deleted = 0";
        }
        
        $query .= " ORDER BY ch.created_at DESC LIMIT ?";
        
        $stmt = $conn->prepare($query);
        $stmt->bind_param("si", $username, $limit);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $messages = [];
        while ($row = $result->fetch_assoc()) {
            $messages[] = $row;
        }
        
        echo json_encode([
            'status' => 'success',
            'data' => ['messages' => array_reverse($messages)] // Reverse to get oldest first
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
?>
