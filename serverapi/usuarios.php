<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
//$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "syscomedor";
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "kambanis2";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

// Consulta obtiene los usuarios
if (isset($_GET["obtenerUsuarios"])){
    $sqlUsuarios = mysqli_query($conexionBD,"SELECT * FROM usuarios");
    if(mysqli_num_rows($sqlUsuarios) > 0){
        $usuarios = mysqli_fetch_all($sqlUsuarios,MYSQLI_ASSOC);
        echo "Conectado al servidor\n";
        echo json_encode($usuarios);
        exit();
    }
    else{  echo json_encode(["Conectado al servidor"=>0]); }
}

if (isset($_GET["existeUser"])){
    $sqlUsuarios = mysqli_query($conexionBD,"SELECT id_usuario ,nombre_usuario, contrasena_usuario 
    FROM usuarios
    WHERE nombre_usuario = '".$_GET["usuario"]."' 
    AND contrasena_usuario = '".$_GET["contrasena"]."'");
    if(mysqli_num_rows($sqlUsuarios) > 0){
        $usuarios = mysqli_fetch_all($sqlUsuarios,MYSQLI_ASSOC);
        echo json_encode($usuarios);
        exit();
    }
    else{  echo json_encode(["0"]); }
}


?>