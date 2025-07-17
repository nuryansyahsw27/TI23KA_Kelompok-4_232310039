<?php
include 'db_connect.php';

// Log the POST data for debugging
error_log("POST Data: " . print_r($_POST, true));

if (isset($_POST['email']) && isset($_POST['username']) && isset($_POST['password'])) {
    $email = $_POST['email'];
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    try {
        $sql = "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$email, $username, $password]);

        echo json_encode(["message" => "User registered successfully"]);
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());  // Log the error
        echo json_encode(["message" => "Server error, please try again later"]);
    }
} else {
    error_log("Missing required fields");
    echo json_encode(["message" => "Missing required fields"]);
}
?>

