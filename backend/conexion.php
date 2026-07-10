<?php

$conexion = new mysqli(
    "mariadb",
    "usuario",
    "usuario123",
    "bd_ventas"
);

if ($conexion->connect_error) {
    die("Error de conexión");
}

?>