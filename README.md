# Online_TutoringPlatform
# Smart Tutor Connect

A dynamic online tutoring platform that connects students with expert tutors in their desired fields instantly.

## Live Demo

- **Live Server URL:** *[Please update this later with your live URL]*
- **Presentation Slides:** *[Please update this later with your presentation link]*
- **Project Documentation:** [https://sites.google.com/view/smarttutorconnect/home?authuser=0](https://sites.google.com/view/smarttutorconnect/home?authuser=0)

## About The Project

Smart Tutor Connect addresses the challenge students face in finding qualified tutors quickly and efficiently. Unlike traditional tutoring platforms with lengthy matching processes, we focus on instant connectivity and streamlined course access. Our platform provides immediate access to vetted tutors across various subjects, reducing the time between seeking help and receiving instruction.

### User Roles
- **Guest:** Can view the landing page and learn about the platform
- **Registered User:** Can browse courses, select tutors, and make payments
- **Admin:** Manages courses, tutors, and platform content

### Built With

*   [React.js](https://reactjs.org/)
*   JavaScript
*   PHP
*   MySQL
*   CSS3

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before installation, ensure you have the following software installed:

* **XAMPP** (for Apache web server, PHP, and MySQL)
  - Download from: [https://www.apachefriends.org/](https://www.apachefriends.org/)
* **Git**
  - Download from: [https://git-scm.com/](https://git-scm.com/)

### Installation

1. **Install and Start XAMPP**
   - Download and install XAMPP
   - Start the Apache and MySQL modules from the XAMPP Control Panel

2. **Clone the Repository
   ```bash```




#Backend Setup (PHP)
1. Copy all backend PHP files into your XAMPP htdocs folder:
   - Windows: C:\xampp\htdocs\
   - Mac: /Applications/XAMPP/htdocs/

2. Open phpMyAdmin:
   http://localhost/phpmyadmin

3. Create a database named:
   smarttutor

4. Import any SQL file provided in the repository.

# Navigate to the React app directory (if in a separate folder)
cd client

# Install dependencies
npm install

# Start the development server
npm start

<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "smarttutor";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

Usage
As a Guest:

Visit the landing page to learn about Smart Tutor Connect

Click "Register" to create a new account

As a Registered User:

Log in with your credentials

Browse available courses on the dashboard

Select your desired course

Complete the payment process

Gain immediate access to your chosen tutor and course materials


Testing
To run the frontend tests:
npm test
