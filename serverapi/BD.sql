-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-12-2023 a las 01:43:22
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `kambanis2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `espacios_trabajo`
--

CREATE TABLE `espacios_trabajo` (
  `id_espacio_trabajo` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `nombre_espacio_trabajo` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `espacios_trabajo`
--

INSERT INTO `espacios_trabajo` (`id_espacio_trabajo`, `id_usuario`, `nombre_espacio_trabajo`) VALUES
(1, 2, 'DEMO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados_tablero`
--

CREATE TABLE `estados_tablero` (
  `id_estado` int(11) NOT NULL,
  `nombre_estado` varchar(60) NOT NULL,
  `posicion_estado` int(11) NOT NULL,
  `id_tablero` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estados_tablero`
--

INSERT INTO `estados_tablero` (`id_estado`, `nombre_estado`, `posicion_estado`, `id_tablero`) VALUES
(1, 'Por Hacer', 0, 1),
(2, 'En Proceso', 1, 1),
(3, 'Hecho', 2, 1),
(4, 'Para hacer algun dia', 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tableros`
--

CREATE TABLE `tableros` (
  `id_tablero` int(11) NOT NULL,
  `nombre_tablero` varchar(60) NOT NULL,
  `id_espacio_trabajo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tableros`
--

INSERT INTO `tableros` (`id_tablero`, `nombre_tablero`, `id_espacio_trabajo`) VALUES
(1, 'Demostrativo', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `id_tarea` int(11) NOT NULL,
  `nombre_tarea` varchar(120) NOT NULL,
  `descripcion_tarea` text NOT NULL,
  `fecha_creacion_tarea` date NOT NULL,
  `fecha_vencimiento` date NOT NULL,
  `id_estado` int(11) NOT NULL,
  `etiqueta` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`id_tarea`, `nombre_tarea`, `descripcion_tarea`, `fecha_creacion_tarea`, `fecha_vencimiento`, `id_estado`, `etiqueta`) VALUES
(1, 'Realizar el formulario de Clientes', 'Por Escribir', '2023-12-03', '2023-12-22', 1, NULL),
(2, 'Colocar los campos de texto', 'Por Escribir', '2023-12-03', '2023-12-29', 1, NULL),
(3, 'Validar los campos', 'Por Escribir', '2023-12-06', '2023-12-29', 2, NULL),
(4, 'Hacer pruebas al formulario de clientes', 'Por Escribir', '2023-12-06', '2023-12-29', 3, NULL),
(5, 'Creacion de las tablas en SQL', 'Por Escribir', '2023-12-04', '2023-12-18', 3, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(30) NOT NULL,
  `contrasena_usuario` varchar(30) NOT NULL,
  `fecha_creacion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre_usuario`, `contrasena_usuario`, `fecha_creacion`) VALUES
(1, 'admin', '123456', '2023-12-17'),
(2, 'rodrigo', 'rorro', '2023-12-17');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `espacios_trabajo`
--
ALTER TABLE `espacios_trabajo`
  ADD PRIMARY KEY (`id_espacio_trabajo`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `estados_tablero`
--
ALTER TABLE `estados_tablero`
  ADD PRIMARY KEY (`id_estado`),
  ADD KEY `id_tablero` (`id_tablero`);

--
-- Indices de la tabla `tableros`
--
ALTER TABLE `tableros`
  ADD PRIMARY KEY (`id_tablero`),
  ADD KEY `id_espacio_trabajo` (`id_espacio_trabajo`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`id_tarea`),
  ADD KEY `id_estado` (`id_estado`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `espacios_trabajo`
--
ALTER TABLE `espacios_trabajo`
  MODIFY `id_espacio_trabajo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `estados_tablero`
--
ALTER TABLE `estados_tablero`
  MODIFY `id_estado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tableros`
--
ALTER TABLE `tableros`
  MODIFY `id_tablero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `id_tarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `espacios_trabajo`
--
ALTER TABLE `espacios_trabajo`
  ADD CONSTRAINT `espacios_trabajo_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `estados_tablero`
--
ALTER TABLE `estados_tablero`
  ADD CONSTRAINT `estados_tablero_ibfk_1` FOREIGN KEY (`id_tablero`) REFERENCES `tableros` (`id_tablero`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tableros`
--
ALTER TABLE `tableros`
  ADD CONSTRAINT `tableros_ibfk_1` FOREIGN KEY (`id_espacio_trabajo`) REFERENCES `espacios_trabajo` (`id_espacio_trabajo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `estados_tablero` (`id_estado`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
