-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 17 Oca 2021, 17:01:03
-- Sunucu sürümü: 10.4.14-MariaDB
-- PHP Sürümü: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `oinic-api`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(150) NOT NULL,
  `create_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `create_date`) VALUES
(1, 'Market', '2021-01-17'),
(2, 'Fatura', '0000-00-00'),
(3, 'Gıda', '0000-00-00'),
(4, 'Eğlence', '0000-00-00');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `gelir_gider_list`
--

CREATE TABLE `gelir_gider_list` (
  `islem_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `islem_tipi` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `aciklama` varchar(500) NOT NULL,
  `tutar` decimal(10,2) NOT NULL,
  `kayit_tarihi` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `gelir_gider_list`
--

INSERT INTO `gelir_gider_list` (`islem_id`, `category_id`, `islem_tipi`, `user_id`, `aciklama`, `tutar`, `kayit_tarihi`) VALUES
(2, 1, 0, 2, '1 koli yumurta, 3 kg domates, 1 kg salatalık, 2 kg elma', '65.35', '2021-01-17'),
(4, 0, 1, 2, 'Maaş ', '2500.00', '2021-01-17'),
(6, 0, 1, 2, 'prim', '150.55', '2016-01-17'),
(7, 4, 0, 0, 'cafe', '120.35', '2021-01-17');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `fullname` varchar(250) NOT NULL,
  `gender` varchar(2) NOT NULL,
  `datebirth` date NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(100) NOT NULL,
  `createdat` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`user_id`, `fullname`, `gender`, `datebirth`, `email`, `password`, `createdat`) VALUES
(2, 'Mehmet KIYAK', 'm', '1962-01-16', 'kiyak', 'c4ca4238a0b923820dcc509a6f75849b', '2021-01-16 16:56:33'),
(4, 'Melike', 'w', '1999-01-16', 'melike', 'c4ca4238a0b923820dcc509a6f75849b', '2021-01-16 22:50:29'),
(5, 'Ali KAYA', 'm', '2003-01-16', 'ali', 'c81e728d9d4c2f636f067f89cc14862c', '2021-01-16 23:19:07'),
(6, 'ayşe', 'w', '2010-01-17', 'ayse', 'c81e728d9d4c2f636f067f89cc14862c', '2021-01-17 14:32:14'),
(7, 'kiyakk', 'm', '2021-01-17', 'kiyakk', 'c4ca4238a0b923820dcc509a6f75849b', '2021-01-17 14:38:01');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Tablo için indeksler `gelir_gider_list`
--
ALTER TABLE `gelir_gider_list`
  ADD PRIMARY KEY (`islem_id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tablo için AUTO_INCREMENT değeri `gelir_gider_list`
--
ALTER TABLE `gelir_gider_list`
  MODIFY `islem_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
