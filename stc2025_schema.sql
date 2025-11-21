-- Database: STC2025
CREATE DATABASE IF NOT EXISTS STC2025;
USE STC2025;

-- Users table: both students and tutors
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role ENUM('student','tutor','admin') NOT NULL DEFAULT 'student',
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tutors table: extended tutor info
CREATE TABLE IF NOT EXISTS tutors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  subject VARCHAR(100),
  price_per_hour DECIMAL(7,2) DEFAULT 0.00,
  rating DECIMAL(2,1) DEFAULT 5.0,
  availability TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  tutor_id INT NOT NULL,
  session_datetime DATETIME NOT NULL,
  duration_minutes INT DEFAULT 60,
  status ENUM('booked','completed','cancelled') DEFAULT 'booked',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (tutor_id) REFERENCES tutors(id) ON DELETE CASCADE
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT NOT NULL,
  student_id INT NOT NULL,
  rating TINYINT NOT NULL,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);



-- Insert a sample tutor user and tutor row for testing
INSERT INTO users (role, name, email, password, bio)
VALUES ('tutor','Jane Doe','jane.tutor@example.com',PASSWORD('password123'),'Math tutor with 4 years experience.');

-- Note: We inserted a password using MySQL PASSWORD() for placeholder; actual app uses password_hash.
-- Get the inserted user's id:
SET @uid = (SELECT id FROM users WHERE email = 'jane.tutor@example.com' LIMIT 1);
INSERT INTO tutors (user_id, subject, price_per_hour, rating, availability)
VALUES (@uid, 'Mathematics', 20.00, 4.8, 'Mon-Fri 4pm-8pm');
