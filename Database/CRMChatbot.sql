-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 17, 2025 at 02:32 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `CRMChatbot`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat_history`
--

CREATE TABLE `chat_history` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `response` text DEFAULT NULL,
  `sender` enum('user','bot') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chat_history`
--

INSERT INTO `chat_history` (`id`, `user_id`, `username`, `message`, `response`, `sender`, `created_at`, `is_deleted`) VALUES
(1, 1, NULL, 'syarat pendaftaran', NULL, 'user', '2025-07-11 09:57:08', 0),
(2, 1, NULL, NULL, 'Syarat: KTP, Pas foto, Ijazah terakhir', 'bot', '2025-07-11 09:57:08', 0),
(3, 1, NULL, 'syarat pendaftaran', NULL, 'user', '2025-07-11 09:57:14', 0),
(4, 1, NULL, NULL, 'Syarat: KTP, Pas foto, Ijazah terakhir', 'bot', '2025-07-11 09:57:14', 0),
(5, 1, NULL, 'syarat pendaftaran', NULL, 'user', '2025-07-11 09:57:33', 0),
(6, 1, NULL, NULL, 'Syarat: KTP, Pas foto, Ijazah terakhir', 'bot', '2025-07-11 09:57:33', 0),
(7, 1, NULL, 'syarat pendaftaran', NULL, 'user', '2025-07-11 09:57:50', 0),
(8, 1, NULL, 'syarat pendaftaran', NULL, 'user', '2025-07-11 09:57:50', 0),
(9, 1, NULL, 'biaya pendaftaran', NULL, 'user', '2025-07-11 09:57:50', 0),
(10, 1, NULL, NULL, 'Syarat: KTP, Pas foto, Ijazah terakhir', 'bot', '2025-07-11 09:57:50', 0),
(11, 1, NULL, NULL, 'Syarat: KTP, Pas foto, Ijazah terakhir', 'bot', '2025-07-11 09:57:50', 0),
(12, 1, NULL, NULL, 'Biaya pendaftaran sebesar Rp 500.000', 'bot', '2025-07-11 09:57:50', 0),
(13, 1, NULL, 'Syarat pendaftaran', NULL, 'user', '2025-07-11 09:58:00', 0),
(14, 1, NULL, NULL, 'Syarat: KTP, Pas foto, Ijazah terakhir', 'bot', '2025-07-11 09:58:00', 0),
(15, 1, NULL, 'Biaya pendaftaran', NULL, 'user', '2025-07-11 09:58:00', 0),
(16, 1, NULL, NULL, 'Biaya pendaftaran sebesar Rp 500.000', 'bot', '2025-07-11 09:58:00', 0),
(17, 1, NULL, 'Jadwal pendaftaran', NULL, 'user', '2025-07-11 09:58:02', 0),
(18, 1, NULL, NULL, 'Pendaftaran dibuka setiap hari kerja jam 08:00-15:00', 'bot', '2025-07-11 09:58:02', 0),
(19, 1, NULL, 'Berapa estimasi biaya masuk', NULL, 'user', '2025-07-11 09:58:12', 0),
(20, 1, NULL, NULL, 'Estimasi biaya masuk untuk program di sekitar Rp 10.000.000', 'bot', '2025-07-11 09:58:12', 0),
(21, 7, NULL, 'Syarat pendaftaran', NULL, 'user', '2025-07-11 10:18:41', 1),
(22, 7, NULL, NULL, 'Syarat: KTP, Pas foto, Ijazah terakhir', 'bot', '2025-07-11 10:18:41', 1),
(23, 7, NULL, 'syarat pendaftaran', NULL, 'user', '2025-07-11 13:23:50', 0),
(24, 7, NULL, NULL, 'Syarat: KTP, Pas foto, Ijazah terakhir', 'bot', '2025-07-11 13:23:50', 0),
(25, 7, NULL, 'syarat pendaftaran', NULL, 'user', '2025-07-11 13:23:53', 0),
(26, 7, NULL, NULL, 'Syarat: KTP, Pas foto, Ijazah terakhir', 'bot', '2025-07-11 13:23:53', 0),
(27, 7, NULL, 'syarat pendaftaran', NULL, 'user', '2025-07-11 13:24:13', 0),
(28, 7, NULL, 'biaya pendaftaran', NULL, 'user', '2025-07-11 13:24:13', 0),
(29, 7, NULL, NULL, 'Biaya pendaftaran sebesar Rp 500.000', 'bot', '2025-07-11 13:24:13', 0),
(30, 7, NULL, NULL, 'Syarat: KTP, Pas foto, Ijazah terakhir', 'bot', '2025-07-11 13:24:13', 0),
(31, 7, NULL, 'biaya pendaftaran', NULL, 'user', '2025-07-11 13:24:16', 0),
(32, 7, NULL, 'syarat pendaftaran', NULL, 'user', '2025-07-11 13:24:16', 0),
(33, 7, NULL, NULL, 'Biaya pendaftaran sebesar Rp 500.000', 'bot', '2025-07-11 13:24:16', 0),
(34, 7, NULL, NULL, 'Syarat: KTP, Pas foto, Ijazah terakhir', 'bot', '2025-07-11 13:24:16', 0),
(35, 7, NULL, 'syarat pendaftaran', NULL, 'user', '2025-07-11 13:25:01', 0),
(36, 7, NULL, NULL, 'Syarat: KTP, Pas foto, Ijazah terakhir', 'bot', '2025-07-11 13:25:01', 0),
(37, 7, NULL, 'syarat pendaftaran', NULL, 'user', '2025-07-11 13:25:05', 0),
(38, 7, NULL, NULL, 'Syarat: KTP, Pas foto, Ijazah terakhir', 'bot', '2025-07-11 13:25:05', 0),
(39, 7, NULL, 'biaya pendaftaran', NULL, 'user', '2025-07-11 13:25:05', 0),
(40, 7, NULL, NULL, 'Biaya pendaftaran sebesar Rp 500.000', 'bot', '2025-07-11 13:25:05', 0),
(41, 7, NULL, 'syarat pendaftaran', NULL, 'user', '2025-07-11 13:25:25', 0),
(42, 7, NULL, 'biaya pendaftaran', NULL, 'user', '2025-07-11 13:25:25', 0),
(43, 7, NULL, 'syarat pendaftaran', NULL, 'user', '2025-07-11 13:25:25', 0),
(44, 7, NULL, NULL, 'Syarat: KTP, Pas foto, Ijazah terakhir', 'bot', '2025-07-11 13:25:25', 0),
(45, 7, NULL, NULL, 'Biaya pendaftaran sebesar Rp 500.000', 'bot', '2025-07-11 13:25:25', 0),
(46, 7, NULL, NULL, 'Syarat: KTP, Pas foto, Ijazah terakhir', 'bot', '2025-07-11 13:25:25', 0),
(47, 7, NULL, 'biaya pendaftaran', NULL, 'user', '2025-07-11 13:25:26', 0),
(48, 7, NULL, NULL, 'Biaya pendaftaran sebesar Rp 500.000', 'bot', '2025-07-11 13:25:26', 0),
(49, 7, NULL, 'biaya pendaftaran', NULL, 'user', '2025-07-11 13:25:41', 0),
(50, 7, NULL, 'syarat pendaftaran', NULL, 'user', '2025-07-11 13:25:41', 0),
(51, 7, NULL, 'syarat pendaftaran', NULL, 'user', '2025-07-11 13:25:41', 0),
(52, 7, NULL, NULL, 'Biaya pendaftaran sebesar Rp 500.000', 'bot', '2025-07-11 13:25:41', 0),
(53, 7, NULL, NULL, 'Syarat: KTP, Pas foto, Ijazah terakhir', 'bot', '2025-07-11 13:25:41', 0),
(54, 7, NULL, NULL, 'Syarat: KTP, Pas foto, Ijazah terakhir', 'bot', '2025-07-11 13:25:41', 0),
(55, 7, NULL, 'biaya pendaftaran', NULL, 'user', '2025-07-11 13:25:41', 0),
(56, 7, NULL, NULL, 'Biaya pendaftaran sebesar Rp 500.000', 'bot', '2025-07-11 13:25:41', 0),
(57, 15, NULL, 'Syarat pendaftaran', NULL, 'user', '2025-07-11 13:33:55', 0),
(58, 15, NULL, NULL, 'Syarat: KTP, Pas foto, Ijazah terakhir', 'bot', '2025-07-11 13:33:55', 0),
(59, 15, NULL, 'Biaya pendaftaran', NULL, 'user', '2025-07-11 13:34:00', 0),
(60, 15, NULL, NULL, 'Biaya pendaftaran sebesar Rp 500.000', 'bot', '2025-07-11 13:34:00', 0),
(61, 15, NULL, 'Jadwal pendaftaran', NULL, 'user', '2025-07-11 13:34:05', 0),
(62, 15, NULL, NULL, 'Pendaftaran dibuka setiap hari kerja jam 08:00-15:00', 'bot', '2025-07-11 13:34:05', 0),
(63, 15, NULL, 'Berapa biaya pendaftaran', NULL, 'user', '2025-07-11 13:34:29', 0),
(64, 15, NULL, NULL, 'Biaya pendaftaran sebesar Rp 500.000', 'bot', '2025-07-11 13:34:29', 0),
(65, 15, NULL, 'Pembayaran', NULL, 'user', '2025-07-11 13:35:00', 0),
(66, 15, NULL, NULL, 'Biaya pendaftaran sebesar Rp 500.000', 'bot', '2025-07-11 13:35:00', 0),
(67, 15, NULL, 'Lokasi pendaftaran', NULL, 'user', '2025-07-11 13:35:18', 0),
(68, 15, NULL, NULL, 'Lokasi pendaftaran di Kampus ABC, Jalan XYZ No. 12', 'bot', '2025-07-11 13:35:18', 0),
(69, 15, NULL, 'dimana lokasi pendaftaran', NULL, 'user', '2025-07-11 13:35:29', 0),
(70, 15, NULL, NULL, 'Lokasi pendaftaran di Kampus ABC, Jalan XYZ No. 12', 'bot', '2025-07-11 13:35:29', 0),
(71, 15, NULL, 'Estimasi biaya masuk', NULL, 'user', '2025-07-11 13:35:36', 0),
(72, 15, NULL, NULL, 'Estimasi biaya masuk untuk program di sekitar Rp 10.000.000', 'bot', '2025-07-11 13:35:36', 0),
(73, 15, NULL, 'Jumlah fakultas', NULL, 'user', '2025-07-11 13:36:08', 0),
(74, 15, NULL, NULL, 'Kami memiliki 6 fakultas yang mencakup berbagai bidang studi', 'bot', '2025-07-11 13:36:08', 0),
(75, 15, NULL, 'Keunggulan kampus', NULL, 'user', '2025-07-11 13:36:18', 0),
(76, 15, NULL, NULL, 'Kampus cabang kami terletak di Jalan Melati No. 45, Bandung.', 'bot', '2025-07-11 13:36:18', 0),
(77, 15, NULL, 'fasilitas kampus', NULL, 'user', '2025-07-11 13:37:08', 0),
(78, 15, NULL, NULL, 'Fasilitas kami mencakup perpustakaan, lab komputer, wifi gratis, dan pusat olahraga.', 'bot', '2025-07-11 13:37:08', 0),
(79, 15, NULL, 'lokasi cabang', NULL, 'user', '2025-07-11 13:37:14', 0),
(80, 15, NULL, NULL, 'Kami unggul dalam teknologi informasi, dosen berpengalaman, dan jaringan internasional.', 'bot', '2025-07-11 13:37:14', 0),
(81, 15, NULL, 'Keunggulan kampus', NULL, 'user', '2025-07-11 13:38:02', 0),
(82, 15, NULL, NULL, 'Kampus cabang kami terletak di Jalan Melati No. 45, Bandung.', 'bot', '2025-07-11 13:38:02', 0),
(83, 15, NULL, 'Lokasi cabang', NULL, 'user', '2025-07-11 13:38:12', 0),
(84, 15, NULL, NULL, 'Kami unggul dalam teknologi informasi, dosen berpengalaman, dan jaringan internasional.', 'bot', '2025-07-11 13:38:12', 0),
(85, 15, NULL, 'Lokasi cabang', NULL, 'user', '2025-07-11 13:39:38', 0),
(86, 15, NULL, NULL, 'Kampus cabang kami terletak di Jalan Melati No. 45, Bandung.', 'bot', '2025-07-11 13:39:38', 0),
(87, 15, NULL, 'Keunggulan kampus', NULL, 'user', '2025-07-11 13:39:45', 0),
(88, 15, NULL, NULL, 'Kami unggul dalam teknologi informasi, dosen berpengalaman, dan jaringan internasional.', 'bot', '2025-07-11 13:39:45', 0),
(89, 15, NULL, 'Proses pendaftaran', NULL, 'user', '2025-07-11 13:39:55', 0),
(90, 15, NULL, NULL, 'Proses Registrasi formulir bisa diunduh di website kami', 'bot', '2025-07-11 13:39:55', 0),
(91, 15, NULL, 'Pembayaran pendaftaran', NULL, 'user', '2025-07-11 13:41:09', 0),
(92, 15, NULL, NULL, 'Biaya pendaftaran sebesar Rp 500.000', 'bot', '2025-07-11 13:41:09', 0),
(93, 15, NULL, 'Tagihan registrasi', NULL, 'user', '2025-07-11 13:43:01', 0),
(94, 15, NULL, NULL, 'Pembayaran dapat dilakukan melalui transfer bank kami', 'bot', '2025-07-11 13:43:01', 0),
(95, 15, NULL, 'Bagaimana tagih', NULL, 'user', '2025-07-11 13:43:43', 0),
(96, 15, NULL, NULL, 'Pembayaran dapat dilakukan melalui transfer bank kami', 'bot', '2025-07-11 13:43:43', 0),
(97, 15, NULL, 'Bagaimana tagihan registrasi', NULL, 'user', '2025-07-11 13:43:50', 0),
(98, 15, NULL, NULL, 'Pembayaran dapat dilakukan melalui transfer bank kami', 'bot', '2025-07-11 13:43:50', 0),
(99, 15, NULL, 'info', NULL, 'user', '2025-07-11 13:44:31', 0),
(100, 15, NULL, NULL, 'Berikut informasi pendaftaran:\n• Biaya: Rp 500.000\n• Syarat: KTP, Pas Foto, Ijazah\n• Jadwal: Hari kerja 08.00–15.00\n• Lokasi: Kampus ABC, Jalan XYZ\n• Formulir: Di website resmi\n• Estimasi biaya masuk: Rp 1.500.000', 'bot', '2025-07-11 13:44:31', 0),
(101, 47, NULL, 'Syarat pendaftaran', NULL, 'user', '2025-07-11 13:58:20', 0),
(102, 47, NULL, NULL, 'Syarat: KTP, Pas foto, Ijazah terakhir', 'bot', '2025-07-11 13:58:20', 0),
(103, 47, NULL, 'Biaya pendaftaran', NULL, 'user', '2025-07-11 13:58:20', 0),
(104, 47, NULL, NULL, 'Biaya pendaftaran sebesar Rp 500.000', 'bot', '2025-07-11 13:58:20', 0),
(105, 47, NULL, 'Jadwal pendaftaran', NULL, 'user', '2025-07-11 13:58:21', 0),
(106, 47, NULL, NULL, 'Pendaftaran dibuka setiap hari kerja jam 08:00-15:00', 'bot', '2025-07-11 13:58:21', 0),
(107, 51, NULL, 'Syarat pendaftaran', NULL, 'user', '2025-07-11 14:26:41', 1),
(108, 51, NULL, NULL, 'Syarat: KTP, Pas foto, Ijazah terakhir', 'bot', '2025-07-11 14:26:41', 1),
(109, 51, NULL, 'Biaya pendaftaran', NULL, 'user', '2025-07-11 14:26:42', 1),
(110, 51, NULL, NULL, 'Biaya pendaftaran sebesar Rp 500.000', 'bot', '2025-07-11 14:26:42', 1),
(111, 51, NULL, 'Jadwal pendaftaran', NULL, 'user', '2025-07-11 14:26:43', 1),
(112, 51, NULL, NULL, 'Pendaftaran dibuka setiap hari kerja jam 08:00-15:00', 'bot', '2025-07-11 14:26:43', 1),
(113, 51, NULL, 'Dimana lokasi pendaftaran', NULL, 'user', '2025-07-11 14:27:21', 1),
(114, 51, NULL, NULL, 'Lokasi pendaftaran di Kampus ABC, Jalan XYZ No. 12', 'bot', '2025-07-11 14:27:21', 1),
(115, 51, NULL, 'Bagaimana proses pendaftaran', NULL, 'user', '2025-07-11 14:27:37', 1),
(116, 51, NULL, NULL, 'Silahkan kirim kata formulir untuk proses registrasi', 'bot', '2025-07-11 14:27:37', 1),
(117, 51, NULL, 'Berapa biaya pendaftaran', NULL, 'user', '2025-07-11 14:29:28', 1),
(118, 51, NULL, NULL, 'Biaya pendaftaran sebesar Rp 500.000', 'bot', '2025-07-11 14:29:28', 1),
(119, 51, NULL, 'biaya pendaftaran', NULL, 'user', '2025-07-11 14:32:05', 0),
(120, 51, NULL, NULL, 'Biaya pendaftaran sebesar Rp 500.000', 'bot', '2025-07-11 14:32:05', 0),
(121, 51, NULL, 'biaya pendaftaran', NULL, 'user', '2025-07-11 14:32:10', 0),
(122, 51, NULL, NULL, 'Biaya pendaftaran sebesar Rp 500.000', 'bot', '2025-07-11 14:32:10', 0),
(123, 51, NULL, 'Syarat pendaftaran', NULL, 'user', '2025-07-11 14:33:09', 0),
(124, 51, NULL, NULL, 'Syarat: KTP, Pas foto, Ijazah terakhir', 'bot', '2025-07-11 14:33:09', 0),
(125, 51, NULL, 'tes', NULL, 'user', '2025-07-11 14:33:46', 0),
(126, 51, NULL, NULL, 'Maaf, saya belum menemukan jawaban untuk pertanyaan tersebut. Silakan coba pertanyaan lain atau ketik \'info\' untuk informasi umum.', 'bot', '2025-07-11 14:33:46', 0),
(127, 51, NULL, 'info', NULL, 'user', '2025-07-11 14:34:00', 0),
(128, 51, NULL, NULL, 'Berikut informasi pendaftaran:\n• Biaya: Rp 500.000\n• Syarat: KTP, Pas Foto, Ijazah\n• Jadwal: Hari kerja 08.00–15.00\n• Lokasi: Kampus ABC, Jalan XYZ\n• Formulir: Di website resmi\n• Estimasi biaya masuk: Rp 1.500.000', 'bot', '2025-07-11 14:34:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `faq`
--

CREATE TABLE `faq` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`id`, `question`, `answer`, `tags`, `created_at`) VALUES
(1, 'Biaya pendaftaran', 'Biaya pendaftaran sebesar Rp 500.000', 'pendaftaran,biaya,pembayaran,berapa', '2025-07-06 10:28:43'),
(2, 'Syarat pendaftaran', 'Syarat: KTP, Pas foto, Ijazah terakhir', 'pendaftaran,syarat,persyaratan,apa', '2025-07-06 10:28:43'),
(3, 'Jadwal pendaftaran', 'Pendaftaran dibuka setiap hari kerja jam 08:00-15:00', 'pendaftaran,jadwal,waktu,kapan', '2025-07-06 10:28:43'),
(4, 'Lokasi pendaftaran', 'Lokasi pendaftaran di Kampus ABC, Jalan XYZ No. 12', 'pendaftaran,lokasi,tempat,kampus,dimana', '2025-07-06 10:31:30'),
(5, 'Proses pendaftaran', 'Silahkan kirim kata formulir untuk proses registrasi', 'pendaftaran,proses,registrasi,cara,bagaimana', '2025-07-06 10:32:00'),
(6, 'Tagihan registrasi', 'Pembayaran dapat dilakukan melalui transfer bank kami', 'bagaimana,tagihan,registrasi,bagaimana,dengan', '2025-07-06 10:32:30'),
(7, 'Estimasi biaya masuk', 'Estimasi biaya masuk untuk program di sekitar Rp 10.000.000', 'pendaftaran,biaya masuk,estimasi,berapa', '2025-07-06 10:33:00'),
(8, 'Jumlah fakultas', 'Kami memiliki 6 fakultas yang mencakup berbagai bidang studi', 'fakultas,kampus,jumlah,berapa', '2025-07-06 10:34:00'),
(9, 'Jumlah program studi', 'Terdapat lebih dari 20 program studi yang dapat dipilih', 'program studi,jumlah,jurusan,berapa', '2025-07-06 10:34:30'),
(10, 'Beasiswa', 'Kampus menyediakan beasiswa berdasarkan prestasi dan kebutuhan.', 'beasiswa,dukungan,prestasi,bantuan,apa', '2025-07-10 12:28:55'),
(11, 'Fasilitas kampus', 'Fasilitas kami mencakup perpustakaan, lab komputer, wifi gratis, dan pusat olahraga.', 'fasilitas,kampus,gedung,lab,apa', '2025-07-10 12:28:55'),
(12, 'Keunggulan kampus', 'Kami unggul dalam teknologi informasi, dosen berpengalaman, dan jaringan internasional.', 'keunggulan,kampus,unggulan,apa,kenapa', '2025-07-10 12:28:55'),
(13, 'Lokasi cabang', 'Kampus cabang kami terletak di Jalan Melati No. 45, Bandung.', 'lokasi,cabang,kampus,tempat,dimana', '2025-07-10 12:28:55');

-- --------------------------------------------------------

--
-- Table structure for table `pendaftaran`
--

CREATE TABLE `pendaftaran` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `alamat` text NOT NULL,
  `usia` int(11) NOT NULL,
  `lulusan` varchar(100) NOT NULL,
  `tempat_kelahiran` varchar(100) NOT NULL,
  `nama_orang_tua` varchar(255) NOT NULL,
  `alasan_masuk_kampus` text NOT NULL,
  `biaya_pendaftaran` decimal(10,2) NOT NULL,
  `tanggal_pendaftaran` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pendaftaran`
--

INSERT INTO `pendaftaran` (`id`, `nama`, `alamat`, `usia`, `lulusan`, `tempat_kelahiran`, `nama_orang_tua`, `alasan_masuk_kampus`, `biaya_pendaftaran`, `tanggal_pendaftaran`) VALUES
(1, 'aa', 'aa', 0, 'aaa', 'a', 'a', 'aa', 44.00, '2025-07-11 10:19:14'),
(2, 'Nuryansyah', 'Bogor', 20, 'SMK', 'Bogor', 'Ibu', 'Bagus', 500000.00, '2025-07-11 14:28:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'Nuryan', 'srion@gmail.com', '$2y$10$aaA8dwPGtjT63j8pFImsyOc4JEDFEyp0.uvv5mCYftDUzRj2geaH2', '2025-07-11 09:56:26'),
(2, 'ss', 'ss@gmai.com', '$2y$10$Mt5vOsmFAhZaTAP3E1myNOnLSVd838z.V23Zx7GpmCIimN2jHMeVC', '2025-07-11 10:14:42'),
(6, 'tes', 'tes@gmai.com', '$2y$10$c8AynCvk04KlIXeqPuGKGeQSmD8ushKLdJpK8fSu2XxTAjIyxtAJ2', '2025-07-11 10:15:56'),
(7, 'smit', 'smites123@gmail.com', '$2y$10$yrrDlZXZBPgLjM4UoaKYyuqrhfMPnTESTVgf57r3eIGAHfozwGvaK', '2025-07-11 10:16:58'),
(15, 'Nuryansyah', 'srion123@gmail.com', '$2y$10$jd.0pf1LMOExHMDBDSqyU.4E1h0eI0UXtz16hxzToA.PsoNjMImuW', '2025-07-11 13:30:49'),
(40, 'Nury', 'nuryansyahs@gmail.com', '$2y$10$pd/ix32O/6w4OLm019ktpeBWOMteCg5EBEeHjZm6LVDtdCiOOWMi6', '2025-07-11 13:50:21'),
(47, 'Nuryansw', 'smitesss@gmail.com', '$2y$10$xJIFEJ1Ev7mwFDVxeDFKZ.CO9nTh9rOLT3/k3NytUvsKaFSj1mrrS', '2025-07-11 13:57:53'),
(51, 'Nuryansyah Saputra', 'nuryansyah27@gmail.com', '$2y$10$fR5AKVRGGgYMv1FAS/ff5uW4xvWEQBB2lsR7s0YVpR9LhE.96qC4W', '2025-07-11 14:25:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat_history`
--
ALTER TABLE `chat_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pendaftaran`
--
ALTER TABLE `pendaftaran`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat_history`
--
ALTER TABLE `chat_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT for table `faq`
--
ALTER TABLE `faq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `pendaftaran`
--
ALTER TABLE `pendaftaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chat_history`
--
ALTER TABLE `chat_history`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
