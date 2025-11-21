<?php
session_start();
require_once __DIR__ . '/../connect.php';

$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

if (!$email || !$password) die("Please enter both email and password.");

$stmt = $conn->prepare("SELECT id, role, name, password FROM users WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) die("Invalid email or password.");

$stmt->bind_result($user_id, $role, $name, $hashedPassword);
$stmt->fetch();

if (!password_verify($password, $hashedPassword)) die("Invalid email or password.");

$_SESSION['user_id'] = $user_id;
$_SESSION['name'] = $name;
$_SESSION['role'] = $role;

$stmt->close();
$conn->close();

header("Location: dashboard.php");
exit();
?>
