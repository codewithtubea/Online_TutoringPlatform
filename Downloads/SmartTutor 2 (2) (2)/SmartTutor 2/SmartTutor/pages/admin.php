<?php
session_start();

// Only administrators may view this console
if (!isset($_SESSION['user_id']) || ($_SESSION['role'] ?? '') !== 'admin') {
    header('Location: sign-in.html');
    exit();
}

require_once __DIR__ . '/../connect.php';

function fetchScalar(mysqli $conn, string $sql): int
{
    $result = $conn->query($sql);
    if (!$result) {
        return 0;
    }

    $row = $result->fetch_row();
    $value = (int) ($row[0] ?? 0);
    $result->free();

    return $value;
}

function fetchAssocList(mysqli $conn, string $sql): array
{
    $rows = [];

    if ($result = $conn->query($sql)) {
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        $result->free();
    }

    return $rows;
}

$roleCounts = [
    'student' => 0,
    'tutor' => 0,
    'admin' => 0
];
if ($result = $conn->query('SELECT role, COUNT(*) AS total FROM users GROUP BY role')) {
    while ($row = $result->fetch_assoc()) {
        $key = $row['role'] ?? '';
        if ($key !== '') {
            $roleCounts[$key] = (int) $row['total'];
        }
    }
    $result->free();
}

$bookingStatusCounts = [
    'pending' => 0,
    'accepted' => 0,
    'declined' => 0,
    'expired' => 0
];
if ($result = $conn->query('SELECT status, COUNT(*) AS total FROM booking_requests GROUP BY status')) {
    while ($row = $result->fetch_assoc()) {
        $status = $row['status'] ?? '';
        if ($status !== '') {
            $bookingStatusCounts[$status] = (int) $row['total'];
        }
    }
    $result->free();
}

$sessionStatusCounts = [];
if ($result = $conn->query('SELECT status, COUNT(*) AS total FROM tutoring_sessions GROUP BY status')) {
    while ($row = $result->fetch_assoc()) {
        $status = $row['status'] ?? '';
        if ($status !== '') {
            $sessionStatusCounts[$status] = (int) $row['total'];
        }
    }
    $result->free();
}

$recentBookings = fetchAssocList($conn, 'SELECT
    br.student_name,
    br.student_email,
    br.requested_for,
    br.status,
    br.reference,
    u.name AS tutor_name
FROM booking_requests br
LEFT JOIN users u ON u.id = br.tutor_id
ORDER BY br.created_at DESC
LIMIT 5');

$recentSecurityEvents = fetchAssocList($conn, 'SELECT event_type, description, ip_address, created_at FROM security_events ORDER BY created_at DESC LIMIT 5');

$latestMetrics = [];
if ($result = $conn->query('SELECT risk_score, active_threats, resolved_threats, failed_logins, successful_logins, compliance_score, vulnerability_count, incident_count, created_at FROM security_metrics ORDER BY created_at DESC LIMIT 1')) {
    $latestMetrics = $result->fetch_assoc() ?: [];
    $result->free();
}

$activeIncidents = fetchScalar($conn, "SELECT COUNT(*) FROM security_incidents WHERE status = 'active'");
$lockedAccounts = fetchScalar($conn, 'SELECT COUNT(*) FROM users WHERE failed_login_attempts >= 5');

$totalUsers = array_sum($roleCounts);
$pendingBookings = $bookingStatusCounts['pending'] ?? 0;
$scheduledSessions = ($sessionStatusCounts['scheduled'] ?? 0) + ($sessionStatusCounts['ongoing'] ?? 0);

$conn->close();

function formatDateTime(?string $value): string
{
    if (empty($value)) {
        return 'TBD';
    }

    try {
        $date = new DateTime($value);
        return $date->format('M j, Y • g:i A');
    } catch (Exception $e) {
        return $value;
    }
}

function escape(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

function bookingBadgeClass(string $status): string
{
    return match ($status) {
        'accepted' => 'status-badge status-confirmed',
        'declined' => 'status-badge status-declined',
        'expired' => 'status-badge status-expired',
        default => 'status-badge status-pending',
    };
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Admin Console • SmartTutor Connect</title>
    <link href="../src/css/main.css" rel="stylesheet">
    <link href="../src/css/pages.css" rel="stylesheet">
    <link href="../src/css/dashboard.css" rel="stylesheet">
    <style>
        .status-declined {
            background: rgba(179, 38, 30, 0.2);
            color: #7f1f19;
        }
        .status-expired {
            background: rgba(20, 20, 20, 0.14);
            color: #2c2c2c;
        }
        .metric-note {
            font-size: 0.85rem;
            color: rgba(77, 20, 23, 0.65);
        }
        .admin-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
        }
    </style>
</head>
<body class="page-body">
    <header class="page-header">
        <div class="container">
            <a class="brand-mark" href="../index.html">
                <img src="../public/images/logo.png" alt="SmartTutor Connect logo">
                <span>SmartTutor Connect</span>
            </a>
            <nav class="page-nav">
                <span class="welcome-text">Hi, <?php echo escape($_SESSION['name'] ?? 'Admin'); ?> 👋</span>
                <a href="dashboard.php">User dashboard</a>
                <a href="admin.php" class="active">Admin console</a>
                <a href="../logout.php" class="btn btn-outline">Log out</a>
            </nav>
        </div>
    </header>

    <main class="page-content" style="width: min(1200px, calc(100% - 40px)); margin: 40px auto 60px;">
        <section class="dashboard-grid">
            <article class="dashboard-card">
                <p class="metric-label">Total platform users</p>
                <p class="metric-value"><?php echo number_format($totalUsers); ?></p>
                <p class="metric-note"><?php echo number_format($roleCounts['admin'] ?? 0); ?> admins keep an eye on the platform.</p>
            </article>
            <article class="dashboard-card">
                <p class="metric-label">Active tutors</p>
                <p class="metric-value"><?php echo number_format($roleCounts['tutor'] ?? 0); ?></p>
                <p class="metric-note">Verified tutors currently listed in the directory.</p>
            </article>
            <article class="dashboard-card">
                <p class="metric-label">Students onboarded</p>
                <p class="metric-value"><?php echo number_format($roleCounts['student'] ?? 0); ?></p>
                <p class="metric-note">Students have registered or signed up.</p>
            </article>
            <article class="dashboard-card">
                <p class="metric-label">Pending booking requests</p>
                <p class="metric-value"><?php echo number_format($pendingBookings); ?></p>
                <p class="metric-note"><?php echo number_format($bookingStatusCounts['accepted'] ?? 0); ?> already accepted, <?php echo number_format($bookingStatusCounts['declined'] ?? 0); ?> declined.</p>
            </article>
            <article class="dashboard-card">
                <p class="metric-label">Sessions scheduled / ongoing</p>
                <p class="metric-value"><?php echo number_format($scheduledSessions); ?></p>
                <p class="metric-note">Keep an eye on live tutoring engagement.</p>
            </article>
            <article class="dashboard-card">
                <p class="metric-label">Active security incidents</p>
                <p class="metric-value"><?php echo number_format($activeIncidents); ?></p>
                <p class="metric-note"><?php echo number_format($lockedAccounts); ?> accounts flagged for review.</p>
            </article>
        </section>

        <section class="dashboard-card">
            <header>
                <h2>Latest booking activity</h2>
                <p class="metric-note">Showing the five most recent requests, regardless of outcome.</p>
            </header>
            <div class="feedback-table-container">
                <table class="dashboard-table">
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Tutor</th>
                            <th>Requested for</th>
                            <th>Status</th>
                            <th>Reference</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (count($recentBookings) === 0): ?>
                            <tr>
                                <td colspan="5">No booking activity yet.</td>
                            </tr>
                        <?php else: ?>
                            <?php foreach ($recentBookings as $booking): ?>
                                <tr>
                                    <td><?php echo escape($booking['student_name'] ?? 'Unknown'); ?><br><small><?php echo escape($booking['student_email'] ?? ''); ?></small></td>
                                    <td><?php echo escape($booking['tutor_name'] ?? 'Tutor'); ?></td>
                                    <td><?php echo escape(formatDateTime($booking['requested_for'] ?? '')); ?></td>
                                    <td><span class="<?php echo bookingBadgeClass($booking['status'] ?? 'pending'); ?>"><?php echo escape(ucfirst($booking['status'] ?? 'pending')); ?></span></td>
                                    <td><?php echo escape($booking['reference'] ?? '-'); ?></td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </section>

        <section class="admin-grid">
            <article class="dashboard-card">
                <header>
                    <h2>Security metrics</h2>
                    <p class="metric-note">Most recent snapshot captured on <?php echo escape(formatDateTime($latestMetrics['created_at'] ?? '')); ?>.</p>
                </header>
                <?php if ($latestMetrics): ?>
                    <ul class="stat-card" style="list-style: none; padding: 0;">
                        <li class="metric-label">Risk score</li>
                        <li class="metric-value"><?php echo escape($latestMetrics['risk_score'] ?? '0'); ?></li>
                    </ul>
                    <div class="stat-card">
                        <p class="metric-label">Active threats</p>
                        <p class="metric-value"><?php echo escape($latestMetrics['active_threats'] ?? '0'); ?></p>
                        <p class="metric-note"><?php echo escape($latestMetrics['resolved_threats'] ?? '0'); ?> threats resolved, <?php echo escape($latestMetrics['incident_count'] ?? '0'); ?> total incidents so far.</p>
                    </div>
                    <div class="stat-card">
                        <p class="metric-label">Signal health</p>
                        <p class="metric-value"><?php echo escape($latestMetrics['compliance_score'] ?? '0'); ?>%</p>
                        <p class="metric-note"><?php echo escape($latestMetrics['vulnerability_count'] ?? '0'); ?> uncovered vulnerabilities, <?php echo escape($latestMetrics['failed_logins'] ?? '0'); ?> failed logins vs <?php echo escape($latestMetrics['successful_logins'] ?? '0'); ?> successful ones.</p>
                    </div>
                <?php else: ?>
                    <p class="metric-note">Metrics are not available yet.</p>
                <?php endif; ?>
            </article>

            <article class="dashboard-card">
                <header>
                    <h2>Security events</h2>
                    <p class="metric-note">The most recent five entries from the security log.</p>
                </header>
                <div class="feedback-table-container">
                    <table class="dashboard-table">
                        <thead>
                            <tr>
                                <th>Event</th>
                                <th>Description</th>
                                <th>IP</th>
                                <th>When</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (count($recentSecurityEvents) === 0): ?>
                                <tr>
                                    <td colspan="4">No events have been recorded yet.</td>
                                </tr>
                            <?php else: ?>
                                <?php foreach ($recentSecurityEvents as $event): ?>
                                    <tr>
                                        <td><?php echo escape($event['event_type'] ?? 'Event'); ?></td>
                                        <td><?php echo escape($event['description'] ?? '—'); ?></td>
                                        <td><?php echo escape($event['ip_address'] ?? '—'); ?></td>
                                        <td><?php echo escape(formatDateTime($event['created_at'] ?? '')); ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </article>
        </section>
    </main>
</body>
</html>
