-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Дек 24 2020 г., 14:10
-- Версия сервера: 10.4.11-MariaDB
-- Версия PHP: 7.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `clockware`
--

-- --------------------------------------------------------

--
-- Структура таблицы `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `cities`
--

INSERT INTO `cities` (`id`, `name`) VALUES
(1, 'Днепр'),
(11, 'Харьков'),
(12, 'Одесса');

-- --------------------------------------------------------

--
-- Структура таблицы `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `clients`
--

INSERT INTO `clients` (`id`, `name`, `email`) VALUES
(1, 'Vasia Client', 'vasia@muemail.ioo'),
(2, 'Petia Client', 'petia@muemail.io'),
(4, 'Константин Николаевич', 'kohan.dev@gmail.com'),
(6, 'Константин', 'kohan.kot@gmail.com'),
(10, 'sfdfsf88', 'admin@example.com'),
(18, 'aaa', 'ss_ss@ua.fm'),
(24, 'Vasia', 'vasia@example.com');

-- --------------------------------------------------------

--
-- Структура таблицы `masters`
--

CREATE TABLE `masters` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `cityId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `masters`
--

INSERT INTO `masters` (`id`, `name`, `cityId`) VALUES
(1, 'Артур Риверский', 1),
(2, 'Владимир Пасечкин', 11),
(26, 'Василий Пупкин', 11),
(28, 'Петров Вася', 12),
(31, 'Семен Семенович', 11),
(53, 'Леша Свистунов', 12),
(54, 'Вася Васечкин', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `time` varchar(255) NOT NULL,
  `hours` int(11) NOT NULL,
  `cityId` int(11) DEFAULT NULL,
  `masterId` int(11) DEFAULT NULL,
  `photoURL` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `date`, `time`, `hours`, `cityId`, `masterId`, `photoURL`, `userId`) VALUES
(89, '2020-10-02 00:00:00', '10:00', 1, 11, 31, 'https://res.cloudinary.com/kodevtm/image/upload/v1599843070/clockware/x0s5cp5bpsbfjni5a1av.jpg', NULL),
(91, '2020-10-05 00:00:00', '10:00', 1, 11, 2, 'https://res.cloudinary.com/kodevtm/image/upload/v1599843346/clockware/odijalax0g7crwdgw791.jpg', NULL),
(94, '2020-10-09 00:00:00', '14:00', 2, 11, 31, 'https://res.cloudinary.com/kodevtm/image/upload/v1599843410/clockware/cbzp8udakyz28y5b2iic.jpg', NULL),
(95, '2020-09-23 00:00:00', '10:00', 1, 11, 31, 'https://res.cloudinary.com/kodevtm/image/upload/v1599843428/clockware/airoxrllolxlnmktbtiy.jpg', NULL),
(96, '2020-09-24 00:00:00', '10:00', 2, 11, 31, 'https://res.cloudinary.com/kodevtm/image/upload/v1599843443/clockware/j9d0jophucmyn0qhrt2g.jpg', NULL),
(98, '2020-09-26 00:00:00', '10:00', 2, 11, 26, 'https://res.cloudinary.com/kodevtm/image/upload/v1599843513/clockware/bcrljkqekiqmzbfcgwsk.jpg', NULL),
(99, '2020-10-01 00:00:00', '10:00', 1, 11, 2, 'https://res.cloudinary.com/kodevtm/image/upload/v1599843536/clockware/ayouu5crhmex6xkq6in2.jpg', NULL),
(100, '2020-09-24 00:00:00', '10:00', 2, 11, 2, 'https://res.cloudinary.com/kodevtm/image/upload/v1599843553/clockware/nsyscblcwdl8vas4jejz.jpg', NULL),
(108, '2020-10-29 00:00:00', '10:00', 2, 11, 26, '', NULL),
(109, '2020-10-23 00:00:00', '10:00', 1, 11, 31, '', NULL),
(110, '2020-10-05 00:00:00', '10:00', 2, 11, 31, 'https://res.cloudinary.com/kodevtm/image/upload/v1601930569/clockware/qzduklmvs9zdzgf8402m.jpg', NULL),
(111, '2020-10-18 00:00:00', '15:00', 2, 1, 1, 'https://res.cloudinary.com/kodevtm/image/upload/v1601931199/clockware/tnx302rh1jpw6hxy5icw.jpg', NULL),
(112, '2020-10-10 00:00:00', '10:00', 2, 11, 26, '', NULL),
(113, '2020-10-08 00:00:00', '10:00', 1, 11, 26, 'https://res.cloudinary.com/kodevtm/image/upload/v1601931636/clockware/oiurkvqhfctgztpodpzo.jpg', NULL),
(114, '2020-10-09 00:00:00', '10:00', 1, 11, 31, '', NULL),
(115, '2020-10-11 00:00:00', '10:00', 2, 1, 1, 'https://res.cloudinary.com/kodevtm/image/upload/v1601932062/clockware/jtf1erteafyn9s6qt010.jpg', NULL),
(116, '2020-10-21 00:00:00', '10:00', 1, 1, 1, 'https://res.cloudinary.com/kodevtm/image/upload/v1601932393/clockware/vcwyzbzvodd2rcmtyh4n.jpg', NULL),
(117, '2020-10-15 00:00:00', '10:00', 1, 1, 1, 'https://res.cloudinary.com/kodevtm/image/upload/v1601932973/clockware/fzyx7n9dxxutbsjfa1ir.jpg', NULL),
(118, '2020-11-01 00:00:00', '10:00', 1, 11, 26, 'https://res.cloudinary.com/kodevtm/image/upload/v1601933973/clockware/akxqxyxsigghlffsd7wr.jpg', NULL),
(119, '2020-10-23 00:00:00', '10:00', 1, 12, 28, '', NULL),
(120, '2020-10-17 00:00:00', '10:00', 1, 11, 26, 'https://res.cloudinary.com/kodevtm/image/upload/v1601934375/clockware/kdohlwk2ltuvkxjcejsb.jpg', NULL),
(121, '2020-10-21 00:00:00', '15:00', 1, 1, 1, '', NULL),
(122, '2020-10-20 00:00:00', '10:00', 2, 1, 1, 'https://res.cloudinary.com/kodevtm/image/upload/v1601934676/clockware/lnnw2c4gt4i4wvdk6cl9.jpg', NULL),
(124, '2020-11-03 00:00:00', '10:00', 1, 1, 1, 'https://res.cloudinary.com/kodevtm/image/upload/v1601934875/clockware/pn4gnc97qwy8q3ifdc0x.jpg', NULL),
(126, '2020-10-27 00:00:00', '16:00', 1, 11, 26, 'https://res.cloudinary.com/kodevtm/image/upload/v1602102354/clockware/wkcxlwjtbctztxpoaa1v.jpg', NULL),
(127, '2020-10-29 00:00:00', '15:00', 1, 1, 1, '', NULL),
(128, '2020-10-24 00:00:00', '10:00', 1, 12, 28, '', NULL),
(129, '2020-10-19 00:00:00', '16:00', 2, 11, 26, '', NULL),
(130, '2020-11-03 00:00:00', '10:00', 2, 11, 31, 'https://res.cloudinary.com/kodevtm/image/upload/v1602103537/clockware/jlcwh95un4af8mo6uhrh.jpg', NULL),
(131, '2020-10-25 00:00:00', '10:00', 2, 12, 28, 'https://res.cloudinary.com/kodevtm/image/upload/v1602104237/clockware/xvtpiaduhwqs9cgssypy.jpg', NULL),
(132, '2020-10-12 00:00:00', '14:00', 2, 11, 2, 'https://res.cloudinary.com/kodevtm/image/upload/v1602104606/clockware/nffnja3surlabt7dvf4c.jpg', NULL),
(134, '2020-10-16 00:00:00', '13:00', 2, 11, 2, 'https://res.cloudinary.com/kodevtm/image/upload/v1602105377/clockware/zzbfqfkmpbvzqyeh4mlh.jpg', NULL),
(135, '2020-10-31 00:00:00', '10:00', 2, 12, 28, 'https://res.cloudinary.com/kodevtm/image/upload/v1602105543/clockware/h6zrmijnbchju7zypfgi.jpg', NULL),
(136, '2020-10-18 00:00:00', '10:00', 1, 1, 1, 'https://res.cloudinary.com/kodevtm/image/upload/v1602105669/clockware/kaqkof6dnkydwn0ncr6y.jpg', NULL),
(137, '2020-10-23 00:00:00', '16:00', 2, 1, 1, '', NULL),
(138, '2020-10-29 00:00:00', '13:00', 2, 11, 26, '', NULL),
(139, '2020-11-02 00:00:00', '15:00', 1, 12, 28, '', NULL),
(140, '2020-10-27 00:00:00', '10:00', 1, 12, 28, '', NULL),
(142, '2020-10-22 00:00:00', '12:00', 1, 11, 31, '', NULL),
(143, '2020-10-23 00:00:00', '10:00', 1, 11, 2, '', NULL),
(146, '2020-10-24 00:00:00', '15:00', 1, 11, 2, '', NULL),
(147, '2020-11-05 00:00:00', '16:00', 2, 1, 1, '', NULL),
(148, '2020-11-07 00:00:00', '14:00', 1, 1, 1, 'https://res.cloudinary.com/kodevtm/image/upload/v1602543097/clockware/ctdo7gkokxk5tryqanip.jpg', NULL),
(149, '2020-10-24 00:00:00', '15:00', 2, 11, 26, '', NULL),
(150, '2020-10-14 00:00:00', '10:00', 1, 12, 53, '', NULL),
(151, '2020-11-06 00:00:00', '15:00', 2, 11, 31, 'https://res.cloudinary.com/kodevtm/image/upload/v1603489176/clockware/ijtmrp4nmlshrcmbjnq1.jpg', NULL),
(152, '2020-11-05 00:00:00', '10:00', 2, 1, 1, 'https://res.cloudinary.com/kodevtm/image/upload/v1603531049/clockware/i90wf2rqwrg7eutcgiaw.jpg', NULL),
(153, '2020-11-04 00:00:00', '16:00', 2, 1, 1, 'https://res.cloudinary.com/kodevtm/image/upload/v1603641044/clockware/as5d2zrjwe4k2saiadvc.jpg', NULL),
(154, '2020-11-07 00:00:00', '16:00', 1, 11, 31, '', NULL),
(155, '2020-11-07 00:00:00', '16:00', 2, 11, 26, '', NULL),
(156, '2020-11-06 00:00:00', '14:00', 1, 12, 53, '', NULL),
(157, '2020-11-02 00:00:00', '10:00', 1, 11, 31, '', NULL),
(158, '2020-11-07 00:00:00', '12:00', 1, 11, 2, '', NULL),
(159, '2020-11-07 00:00:00', '16:00', 1, 11, 2, '', NULL),
(161, '2020-10-24 00:00:00', '10:00', 1, 12, 53, '', NULL),
(162, '2020-11-08 00:00:00', '10:00', 1, 11, 26, '', NULL),
(163, '2020-11-08 00:00:00', '12:00', 1, 11, 2, '', NULL),
(164, '2020-11-01 00:00:00', '13:00', 1, 11, 31, '', NULL),
(165, '2020-11-08 00:00:00', '14:00', 1, 11, 2, '', NULL),
(166, '2020-11-01 00:00:00', '14:00', 1, 11, 2, '', NULL),
(167, '2020-11-16 00:00:00', '10:00', 1, 1, 1, '', NULL),
(168, '2020-11-16 00:00:00', '10:00', 1, 11, 26, '', NULL),
(169, '2020-11-16 00:00:00', '10:00', 1, 11, 2, 'https://res.cloudinary.com/kodevtm/image/upload/v1605536538/clockware/srke8ydfa1iw0pv2blot.jpg', NULL),
(170, '2020-11-17 00:00:00', '10:00', 1, 11, 31, '', NULL),
(171, '2020-11-27 00:00:00', '15:00', 1, 11, 31, 'https://res.cloudinary.com/kodevtm/image/upload/v1605624479/clockware/zswfngjkuw0deaskbhj4.jpg', NULL),
(172, '2020-11-21 00:00:00', '16:00', 2, 1, 1, 'https://res.cloudinary.com/kodevtm/image/upload/v1605626257/clockware/m7jlwzypazeqctyulxkk.jpg', NULL),
(173, '2020-11-20 00:00:00', '10:00', 2, 11, 26, 'https://res.cloudinary.com/kodevtm/image/upload/v1605627795/clockware/d5gstocvjdrulxma1xhu.jpg', NULL),
(174, '2020-11-20 00:00:00', '10:00', 1, 1, 1, 'https://res.cloudinary.com/kodevtm/image/upload/v1605872168/clockware/ing2udiusianrnmyjx8d.jpg', NULL),
(175, '2020-11-24 00:00:00', '10:00', 2, 11, 31, 'https://res.cloudinary.com/kodevtm/image/upload/v1606143343/clockware/plawtfkqisuwrn0ncogr.jpg', NULL),
(176, '2020-11-25 00:00:00', '10:00', 2, 11, 2, 'https://res.cloudinary.com/kodevtm/image/upload/v1606300631/clockware/usbmphe4ecazbyet21fn.jpg', NULL),
(177, '2020-11-25 00:00:00', '10:00', 1, 11, 31, 'https://res.cloudinary.com/kodevtm/image/upload/v1606300661/clockware/okesdhowfzlfrupfrqks.jpg', NULL),
(178, '2020-11-25 00:00:00', '10:00', 1, 11, 26, 'https://res.cloudinary.com/kodevtm/image/upload/v1606300687/clockware/rhbd8eqhokntieviuyae.jpg', NULL),
(179, '2020-11-25 00:00:00', '10:00', 1, 1, 54, '', NULL),
(180, '2020-12-04 00:00:00', '10:00', 1, 11, 26, '', NULL),
(181, '2020-12-04 00:00:00', '10:00', 1, 11, 31, '', NULL),
(182, '2020-12-09 00:00:00', '10:00', 2, 11, 31, 'https://res.cloudinary.com/kodevtm/image/upload/v1607514926/clockware/wjmfb0bgozlqzot7x8jo.jpg', NULL),
(183, '2020-12-17 00:00:00', '10:00', 1, 1, 54, 'https://res.cloudinary.com/kodevtm/image/upload/v1608219265/clockware/zqmzuze07n1uu7fbz5od.jpg', NULL),
(184, '2020-12-18 00:00:00', '10:00', 1, 11, 26, 'https://res.cloudinary.com/kodevtm/image/upload/v1608284474/clockware/soy9zmqbwkt5pfwa4t9b.jpg', NULL),
(185, '2020-12-18 00:00:00', '10:00', 1, 11, 2, 'https://res.cloudinary.com/kodevtm/image/upload/v1608289632/clockware/gr4gmft5vix51l4q1ud7.jpg', NULL),
(186, '2020-12-18 00:00:00', '10:00', 1, 11, 2, 'https://res.cloudinary.com/kodevtm/image/upload/v1608289632/clockware/gr4gmft5vix51l4q1ud7.jpg', NULL),
(187, '2020-12-22 00:00:00', '10:00', 2, 11, 26, 'https://res.cloudinary.com/kodevtm/image/upload/v1608626200/clockware/cd6i9p3ctsu0lhm8vz5i.jpg', NULL),
(188, '2020-12-22 00:00:00', '10:00', 2, 11, 31, 'https://res.cloudinary.com/kodevtm/image/upload/v1608626468/clockware/xr4or5dzoprm1noujf0y.jpg', NULL),
(189, '2020-12-22 00:00:00', '10:00', 1, 11, 2, 'https://res.cloudinary.com/kodevtm/image/upload/v1608626539/clockware/jefuluzjwqkvpu9bdr9c.jpg', 3),
(190, '2020-12-22 00:00:00', '15:00', 1, 11, 26, 'https://res.cloudinary.com/kodevtm/image/upload/v1608626691/clockware/zk6r08xcqu2ol5zhf7lp.jpg', 3);

-- --------------------------------------------------------

--
-- Структура таблицы `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `review` text NOT NULL,
  `rating` int(11) NOT NULL,
  `masterId` int(11) DEFAULT NULL,
  `orderId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `reviews`
--

INSERT INTO `reviews` (`id`, `review`, `rating`, `masterId`, `orderId`) VALUES
(3, 'паппаапап', 5, 1, 148),
(4, 'рпарпарпар', 1, 26, 120),
(5, 'парароопраопрао парап ра\n апрпара\n парпара\n апрапр', 4, 1, 122),
(6, 'рпраапр \nапрапрлдлрп\nарпарарап', 1, 26, 129),
(7, 'апвапвапва\nвпвапыпфрор', 4, 1, 136),
(9, 'ропо опроаллро\nпопопрао', 5, 31, 142),
(10, 'пвапыв м\n\nравразапрар\n\nрдпр', 2, 28, 140),
(11, 'првпарварвар\nапрпарпар\nпарапрпар\n', 5, 28, 131),
(12, '', 4, 2, 132),
(13, 'кке\nкекеке\nкекеке', 3, 2, 134),
(14, 'еукгщешег\n кгушщгщешу\nгушкеещшкуе', 4, 28, 135),
(15, 'варара\nпрпарпар\nпарпарапр\nпарпрпар', 4, 1, 137),
(16, 'fsdfsdfsdf', 4, 28, 131),
(17, 'adasdasd', 3, 1, NULL),
(18, 'dede', 4, 31, 89),
(19, 'dsdds', 2, 2, 91),
(22, 'ewewe', 4, 31, 94),
(23, 'weddwd', 4, 31, 95),
(24, 'wewe', 5, 31, 96),
(25, 'ававав', 2, 26, 98),
(26, 'цуцуцуцу', 2, 2, 99),
(27, 'ццкцук', 3, 2, 100),
(28, 'ввцвуцв', 5, 26, 108),
(29, '', 4, 31, 109),
(30, 'куеуеук', 4, 31, 110),
(31, 'неннглгшллбпро', 4, 1, 111),
(32, '6кеннкирвр', 3, 26, 112),
(33, 'вуцувсывсвы', 4, 26, 113),
(34, 'парапрар', 4, 53, 150),
(36, 'dsdsdsd', 5, 28, 128),
(37, 'sasasas', 3, 1, 124),
(38, 'Хороший отзыв о выполнении', 5, 26, 189),
(39, 'Хороший отзыв', 5, 2, 166),
(40, 'все отлично, спасибо', 5, 1, 174),
(41, 'оценка отличная\nвсе просто супер!!!', 5, 31, 181),
(42, '', 5, 31, 182);

-- --------------------------------------------------------

--
-- Структура таблицы `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `clientId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `salt`, `status`, `name`, `clientId`) VALUES
(1, 'admin@example.com', '$2b$10$4vK4k0DxDJDr9A57AS.JleD0P9KUKTYA/t1lL3cBJVa5J0pET6KlC', '$2b$10$4vK4k0DxDJDr9A57AS.Jle', 'admin', 'ADMIN', NULL),
(3, 'vasia@example.com', '$2b$10$89z8WxcjKZbUx6P2VZQVd.lhD5QLNe/dQAznC7FvZypvegyxAs8SK', '$2b$10$89z8WxcjKZbUx6P2VZQVd.', 'client', 'Vasia', NULL),
(4, 'p.petia@example.com', '$2b$10$SPJJBpOAdLyT.AuPclhLkuZKAJZJwN4aDqzu3kTZUY6JrG0dXIEqe', '$2b$10$SPJJBpOAdLyT.AuPclhLku', 'client', 'Petia Petrov', NULL),
(5, 'alex@example.com', '$2b$10$mee4JXJ60d0pZOACJ705C.hzJqwG60FBn0nmyI8QO1ih7Bp00/Esm', '$2b$10$mee4JXJ60d0pZOACJ705C.', 'client', 'Aleksey Ivanov', NULL),
(6, 'roma@example.com', '$2b$10$KD26wZG3Pq2uKyYZ1LSUIuyu3ExAZ.SibA18gO8d0ZTQ1nXLhpIi6', '$2b$10$KD26wZG3Pq2uKyYZ1LSUIu', 'client', 'Roma', NULL);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `masters`
--
ALTER TABLE `masters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cityId` (`cityId`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cityId` (`cityId`),
  ADD KEY `masterId` (`masterId`),
  ADD KEY `userId` (`userId`);

--
-- Индексы таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `masterId` (`masterId`),
  ADD KEY `orderId` (`orderId`);

--
-- Индексы таблицы `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clientId` (`clientId`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT для таблицы `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT для таблицы `masters`
--
ALTER TABLE `masters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=191;

--
-- AUTO_INCREMENT для таблицы `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT для таблицы `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `masters`
--
ALTER TABLE `masters`
  ADD CONSTRAINT `masters_ibfk_1` FOREIGN KEY (`cityId`) REFERENCES `cities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_6422` FOREIGN KEY (`cityId`) REFERENCES `cities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_6423` FOREIGN KEY (`masterId`) REFERENCES `masters` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_6424` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_309` FOREIGN KEY (`masterId`) REFERENCES `masters` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_310` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
