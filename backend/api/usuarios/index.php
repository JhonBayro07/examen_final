<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    exit;
}

include "../../conexion.php";

$metodo = $_SERVER["REQUEST_METHOD"];

if ($metodo == "GET") {

    $sql = "SELECT * FROM usuarios";
    $resultado = $conexion->query($sql);

    $usuarios = array();

    while ($fila = $resultado->fetch_assoc()) {
        $usuarios[] = $fila;
    }

    echo json_encode($usuarios);
}

if ($metodo == "POST") {

    $datos = json_decode(file_get_contents("php://input"), true);

    $rol_id = $datos["rol_id"];
    $nombre = $datos["nombre"];
    $apePaterno = $datos["apePaterno"];
    $apeMaterno = $datos["apeMaterno"];
    $user = $datos["user"];
    $password = $datos["password"];
    $estado = $datos["estado"];

    $sql = "INSERT INTO usuarios
            (rol_id, nombre, apePaterno, apeMaterno, user, password, estado)
            VALUES
            ('$rol_id', '$nombre', '$apePaterno', '$apeMaterno',
             '$user', '$password', '$estado')";

    if ($conexion->query($sql)) {
        echo json_encode(array("mensaje" => "Usuario registrado correctamente"));
    } else {
        echo json_encode(array("mensaje" => "Error al registrar usuario"));
    }
}

if ($metodo == "PUT") {

    $id = $_GET["id"];

    $datos = json_decode(file_get_contents("php://input"), true);

    $rol_id = $datos["rol_id"];
    $nombre = $datos["nombre"];
    $apePaterno = $datos["apePaterno"];
    $apeMaterno = $datos["apeMaterno"];
    $user = $datos["user"];
    $password = $datos["password"];
    $estado = $datos["estado"];

    $sql = "UPDATE usuarios SET
            rol_id = '$rol_id',
            nombre = '$nombre',
            apePaterno = '$apePaterno',
            apeMaterno = '$apeMaterno',
            user = '$user',
            password = '$password',
            estado = '$estado'
            WHERE id = '$id'";

    if ($conexion->query($sql)) {
        echo json_encode(array("mensaje" => "Usuario actualizado correctamente"));
    } else {
        echo json_encode(array("mensaje" => "Error al actualizar usuario"));
    }
}

if ($metodo == "DELETE") {

    $id = $_GET["id"];

    $sql = "DELETE FROM usuarios WHERE id = '$id'";

    if ($conexion->query($sql)) {
        echo json_encode(array("mensaje" => "Usuario eliminado correctamente"));
    } else {
        echo json_encode(array("mensaje" => "Error al eliminar usuario"));
    }
}

?>