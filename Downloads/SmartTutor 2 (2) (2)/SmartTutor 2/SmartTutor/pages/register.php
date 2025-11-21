<?php
session_start();
require_once __DIR__ . '/../connect.php';

$first_name = trim($_POST['first_name'] ?? '');
$last_name = trim($_POST['last_name'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$password_confirmation = $_POST['password_confirmation'] ?? '';
$account_type = $_POST['account_type'] ?? 'student';
$bio = trim($_POST['bio'] ?? '');

$name = trim($first_name . ' ' . $last_name);

if (!$name || !$email || !$password) die("Please fill in all required fields.");
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) die("Invalid email format.");
if ($password !== $password_confirmation) die("Passwords do not match.");

$stmt = $conn->prepare("SELECT id FROM users WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) die("Email already registered.");
$stmt->close();

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (role, name, email, password, bio) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $account_type, $name, $email, $hashedPassword, $bio);

if ($stmt->execute()) {
    $stmt->close();
    $conn->close();
    header("Location: sign-in.html");
    exit();
} else {
    die("Error: " . $conn->error);
}
?>
