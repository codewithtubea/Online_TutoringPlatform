<?php
/* 
  SmartTutorConnect - config/connect.php
  Sprint 2 (Database Configuration)
  Description: Establishes MySQL connection for backend interaction.
  Works both locally (XAMPP) and remotely (Ashesi web server).
  
  
*/

<?php
// config/connect.php
// Database connection file for SmartTutorConnect
// Works for both XAMPP (local) and Ashesi server


$DB_HOST = '127.0.0.1';  // we need to use ashe's host 
$DB_USER = 'root';       // On Ashesi server, use our  username if different
$DB_PASS = 'ENTER_YOUR_NEW_PASSWORD_HERE';  
$DB_NAME = 'STC2025';

// Try connecting to database
$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

// Error check
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}
// If it connects successfully

?>
