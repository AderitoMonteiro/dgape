-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2025 at 06:40 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bdre`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add equipamento', 7, 'add_equipamento'),
(26, 'Can change equipamento', 7, 'change_equipamento'),
(27, 'Can delete equipamento', 7, 'delete_equipamento'),
(28, 'Can view equipamento', 7, 'view_equipamento'),
(29, 'Can add inventario_equipamento', 8, 'add_inventario_equipamento'),
(30, 'Can change inventario_equipamento', 8, 'change_inventario_equipamento'),
(31, 'Can delete inventario_equipamento', 8, 'delete_inventario_equipamento'),
(32, 'Can view inventario_equipamento', 8, 'view_inventario_equipamento'),
(33, 'Can add mobiliario', 9, 'add_mobiliario'),
(34, 'Can change mobiliario', 9, 'change_mobiliario'),
(35, 'Can delete mobiliario', 9, 'delete_mobiliario'),
(36, 'Can view mobiliario', 9, 'view_mobiliario');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_user`
--

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(1, 'pbkdf2_sha256$260000$Ud38DmkScNOsNQS6KmDZp7$tjO/BPsQn9xosZa+oKERqETf1dZoaD4oaK0d9iajqXI=', '2025-04-30 13:12:15.010517', 1, 'aderito.monteiro', 'Aderito', 'Monteiro', 'Aderito.B.Monteiro@palgov.gov.cv', 1, 1, '2025-04-22 11:07:05.000000');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `departamentos_equipamento`
--

CREATE TABLE `departamentos_equipamento` (
  `id` int(11) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `user_create` int(11) NOT NULL,
  `user_update` int(11) DEFAULT 0,
  `datecreate` datetime(6) NOT NULL,
  `dateupdate` datetime(6) DEFAULT NULL,
  `mac_address` varchar(100) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `serial_number` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departamentos_equipamento`
--

INSERT INTO `departamentos_equipamento` (`id`, `descricao`, `status`, `user_create`, `user_update`, `datecreate`, `dateupdate`, `mac_address`, `marca`, `modelo`, `serial_number`) VALUES
(1, '134x', 0, 1, 1, '2025-04-23 16:22:48.956063', '2025-04-24 15:25:37.453994', '1', '1', '1', '1'),
(2, '1', 0, 1, 1, '2025-04-24 09:40:17.115968', '2025-04-24 15:25:37.453994', '1', '1', '1', '1'),
(3, '1', 0, 1, 1, '2025-04-24 09:46:51.375017', '2025-04-24 15:22:39.468267', '1', '1', '1', '1'),
(4, '1', 0, 1, 1, '2025-04-24 09:48:58.381730', '2025-04-24 15:22:39.468267', '1', '1', '1', '1'),
(5, '3', 0, 1, 1, '2025-04-24 11:14:41.938662', '2025-04-24 14:32:49.212782', '32', '3', '3', '23'),
(6, '3', 0, 1, 1, '2025-04-24 11:14:52.859450', '2025-04-24 14:36:41.386207', '', '3', '3', ''),
(7, '4', 0, 1, 1, '2025-04-24 11:15:38.884996', '2025-04-24 14:35:53.323563', 't', '4', '4', 't'),
(8, '5', 0, 1, 1, '2025-04-24 11:17:13.659609', '2025-04-24 14:33:16.596874', '', '5', '5', ''),
(9, 'teste m', 0, 1, NULL, '2025-04-24 11:18:08.700343', '2025-04-24 14:28:20.156107', '', '4', '4', ''),
(10, 'teste m', 0, 1, NULL, '2025-04-24 11:18:34.171881', '2025-04-24 14:28:36.370271', '', '6', '6', ''),
(11, 'teste m', 0, 1, 1, '2025-04-24 11:20:46.498177', '2025-04-28 13:25:16.926261', '', '1', '1', ''),
(12, 'Computador info 01', 0, 1, 1, '2025-04-28 09:22:11.945389', '2025-04-28 12:26:38.592724', '4444423', 'hp', 'model123', '121244'),
(13, 'Computador dell sala informatica', 1, 1, NULL, '2025-04-28 16:17:53.887094', NULL, '2r3536464', 'dell', 'modelo teste', '1232423');

-- --------------------------------------------------------

--
-- Table structure for table `departamentos_inventario_equipamento`
--

CREATE TABLE `departamentos_inventario_equipamento` (
  `id` int(11) NOT NULL,
  `data_entrada` date NOT NULL,
  `equipamento_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `localizacao` varchar(100) NOT NULL,
  `obs` varchar(100) NOT NULL,
  `datecreate` datetime(6) NOT NULL,
  `dateupdate` datetime(6) DEFAULT NULL,
  `user_create` int(11) NOT NULL,
  `user_update` int(11) DEFAULT NULL,
  `provinencia` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departamentos_inventario_equipamento`
--

INSERT INTO `departamentos_inventario_equipamento` (`id`, `data_entrada`, `equipamento_id`, `status`, `localizacao`, `obs`, `datecreate`, `dateupdate`, `user_create`, `user_update`, `provinencia`) VALUES
(1, '2025-04-28', 12, 0, 'praia', 'teste 03', '2025-04-28 09:24:26.936391', '2025-04-28 12:19:49.904799', 1, 1, 'prov2'),
(2, '2025-04-29', 12, 0, 'praia', 'ok', '2025-04-28 11:23:18.783759', '2025-04-28 15:19:05.574388', 1, 1, 'prov2'),
(3, '2025-04-28', 13, 1, 'Praia', 'teste', '2025-04-28 16:18:56.375415', NULL, 1, NULL, 'sao filipe'),
(4, '2025-04-30', 13, 1, 'praia', 'fgfg', '2025-04-30 15:39:51.993957', '2025-04-30 14:40:01.570139', 1, 1, 'prov1');

-- --------------------------------------------------------

--
-- Table structure for table `departamentos_inventario_mobiliario`
--

CREATE TABLE `departamentos_inventario_mobiliario` (
  `id` int(11) NOT NULL,
  `data_entrada` date NOT NULL,
  `mobiliario_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `localizacao` varchar(100) NOT NULL,
  `provinencia` varchar(100) DEFAULT NULL,
  `obs` varchar(100) NOT NULL,
  `user_create` int(11) NOT NULL,
  `user_update` int(11) DEFAULT NULL,
  `datecreate` datetime(6) NOT NULL,
  `dateupdate` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departamentos_inventario_mobiliario`
--

INSERT INTO `departamentos_inventario_mobiliario` (`id`, `data_entrada`, `mobiliario_id`, `status`, `localizacao`, `provinencia`, `obs`, `user_create`, `user_update`, `datecreate`, `dateupdate`) VALUES
(1, '2025-04-30', 3, 1, 'praia', 'sao ', 'olololo', 1, 1, '2025-04-30 15:07:43.892810', '2025-04-30 15:07:15.861058');

-- --------------------------------------------------------

--
-- Table structure for table `departamentos_mobiliario`
--

CREATE TABLE `departamentos_mobiliario` (
  `id` int(11) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `obs` varchar(100) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `user_create` int(11) NOT NULL,
  `user_update` int(11) DEFAULT NULL,
  `datecreate` datetime(6) NOT NULL,
  `dateupdate` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departamentos_mobiliario`
--

INSERT INTO `departamentos_mobiliario` (`id`, `descricao`, `obs`, `status`, `user_create`, `user_update`, `datecreate`, `dateupdate`) VALUES
(3, 'teste m', 'dffffz', 1, 1, 1, '2025-04-30 11:22:47.314094', '2025-04-30 10:41:17.676891');

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_admin_log`
--

INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
(1, '2025-04-22 15:02:18.130408', '1', 'aderito.monteiro', 2, '[{\"changed\": {\"fields\": [\"First name\", \"Last name\"]}}]', 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(7, 'departamentos', 'equipamento'),
(8, 'departamentos', 'inventario_equipamento'),
(9, 'departamentos', 'mobiliario'),
(6, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2025-04-22 11:03:45.903515'),
(2, 'auth', '0001_initial', '2025-04-22 11:03:46.491875'),
(3, 'admin', '0001_initial', '2025-04-22 11:03:46.596455'),
(4, 'admin', '0002_logentry_remove_auto_add', '2025-04-22 11:03:46.606454'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2025-04-22 11:03:46.616486'),
(6, 'contenttypes', '0002_remove_content_type_name', '2025-04-22 11:03:46.676746'),
(7, 'auth', '0002_alter_permission_name_max_length', '2025-04-22 11:03:46.726708'),
(8, 'auth', '0003_alter_user_email_max_length', '2025-04-22 11:03:46.736609'),
(9, 'auth', '0004_alter_user_username_opts', '2025-04-22 11:03:46.746500'),
(10, 'auth', '0005_alter_user_last_login_null', '2025-04-22 11:03:46.796583'),
(11, 'auth', '0006_require_contenttypes_0002', '2025-04-22 11:03:46.796583'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2025-04-22 11:03:46.806512'),
(13, 'auth', '0008_alter_user_username_max_length', '2025-04-22 11:03:46.876512'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2025-04-22 11:03:46.896683'),
(15, 'auth', '0010_alter_group_name_max_length', '2025-04-22 11:03:46.916431'),
(16, 'auth', '0011_update_proxy_permissions', '2025-04-22 11:03:46.926706'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2025-04-22 11:03:46.936497'),
(18, 'sessions', '0001_initial', '2025-04-22 11:03:46.986612'),
(19, 'departamentos', '0001_initial', '2025-04-23 12:52:45.704337'),
(20, 'departamentos', '0002_auto_20250423_1230', '2025-04-23 13:31:06.590156'),
(21, 'departamentos', '0003_auto_20250425_0815', '2025-04-25 09:16:53.368466');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('h2o4l7nvhuc0sjske2nmyz1yunibw725', '.eJxVjEEOwiAQRe_C2hCGggWX7nsGMsyAVA0kpV0Z765NutDtf-_9lwi4rSVsPS1hZnERIE6_W0R6pLoDvmO9NUmtrssc5a7Ig3Y5NU7P6-H-HRTs5VvbQQNbVMqyyV4jkclxSOwMZj4r4yKMmqxVLg6jp5wzgyenrHacAEC8P-iFN_c:1uA7EV:FrwCShKAgprivFtDuKy5HJzYiFgJNGgIpUTW78FDS_w', '2025-05-14 13:12:15.027097');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `departamentos_equipamento`
--
ALTER TABLE `departamentos_equipamento`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `departamentos_inventario_equipamento`
--
ALTER TABLE `departamentos_inventario_equipamento`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `departamentos_inventario_mobiliario`
--
ALTER TABLE `departamentos_inventario_mobiliario`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `departamentos_mobiliario`
--
ALTER TABLE `departamentos_mobiliario`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `departamentos_equipamento`
--
ALTER TABLE `departamentos_equipamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `departamentos_inventario_equipamento`
--
ALTER TABLE `departamentos_inventario_equipamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `departamentos_inventario_mobiliario`
--
ALTER TABLE `departamentos_inventario_mobiliario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `departamentos_mobiliario`
--
ALTER TABLE `departamentos_mobiliario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
