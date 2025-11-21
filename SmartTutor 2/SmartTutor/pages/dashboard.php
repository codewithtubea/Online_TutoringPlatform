<?php
session_start();

// If user is not logged in, send them to sign-in page
if (!isset($_SESSION['user_id'])) {
    header("Location: sign-in.html");
    exit();
}

// Load DB connection
require_once __DIR__ . '/../connect.php';

// Get logged-in user info
$user_id = $_SESSION['user_id'];
$name = $_SESSION['name'];
$role = $_SESSION['role'];

// Fetch more user details (bio, etc)
$stmt = $conn->prepare("SELECT email, bio FROM users WHERE id=? LIMIT 1");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->bind_result($email, $bio);
$stmt->fetch();
$stmt->close();
$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard • SmartTutor Connect</title>
    <link href="../src/css/main.css" rel="stylesheet">
    <link href="../src/css/pages.css" rel="stylesheet">
</head>

<body>
    <header class="page-header">
        <div class="container">
            <a class="brand-mark" href="../index.html">
                <img src="../public/images/logo.png" alt="SmartTutor Connect logo">
                <span>SmartTutor Connect</span>
            </a>

            <nav class="page-nav">
                <span class="welcome-text">Hi, <?php echo htmlspecialchars($name); ?> 👋</span>
                <a href="../logout.php" class="btn btn-outline">Log out</a>
            </nav>
        </div>
    </header>

    <main class="dashboard-layout">
        <section class="dashboard-card">
            <h1>Your Dashboard</h1>
            <p>Welcome back, <strong><?php echo htmlspecialchars($name); ?></strong>!</p>

            <div class="info-box">
                <p><strong>Account Type:</strong> <?php echo ucfirst($role); ?></p>
                <p><strong>Email:</strong> <?php echo htmlspecialchars($email); ?></p>

                <?php if (!empty($bio)): ?>
                <p><strong>Bio:</strong> <?php echo nl2br(htmlspecialchars($bio)); ?></p>
                <?php endif; ?>
            </div>

            <?php if ($role === 'student'): ?>
                <h2>Your Learning</h2>
                <p>You can explore tutors or book sessions.</p>
                <a href="../index.html#find" class="btn btn-primary">Find a Tutor</a>

            <?php else: ?>
                <h2>Your Tutoring</h2>
                <p>Update your profile or manage your lessons.</p>
                <a href="#" class="btn btn-primary">Edit Tutor Profile</a>
            <?php endif; ?>
        </section>
    </main>
</body>
</html>
