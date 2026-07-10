<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "../../conexion.php";

$sql = "SELECT * FROM roles";
$resultado = $conexion->query($sql);

$roles = array();

while ($fila = $resultado->fetch_assoc()) {
    $roles[] = $fila;
}

echo json_encode($roles);

?>