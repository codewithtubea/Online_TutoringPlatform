CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('student','tutor','admin') NOT NULL DEFAULT 'student',
  `status` enum('active','inactive','suspended') NOT NULL DEFAULT 'active',
  `last_login` datetime DEFAULT NULL,
  `failed_login_attempts` int(11) NOT NULL DEFAULT '0',
  `last_failed_login` datetime DEFAULT NULL,
  `two_factor_secret` varchar(32) DEFAULT NULL,
  `two_factor_enabled` tinyint(1) NOT NULL DEFAULT '0',
  `backup_codes` json DEFAULT NULL,
  `password_changed_at` datetime DEFAULT NULL,
  `force_password_change` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_status` (`role`,`status`),
  KEY `two_factor` (`two_factor_enabled`,`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `login_attempts` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `attempted_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `success` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `email_ip` (`email`,`ip_address`),
  KEY `attempted_at` (`attempted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;