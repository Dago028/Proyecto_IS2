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
if (isset($_GET["obtenerEstadosPorUsuario"])){
    $sqlEstados = mysqli_query($conexionBD,"SELECT estados_tablero.id_estado AS id_estado, estados_tablero.nombre_estado AS titulo, estados_tablero.posicion_estado, estados_tablero.id_tablero FROM tableros, espacios_trabajo, estados_tablero, usuarios 
    WHERE usuarios.id_usuario=espacios_trabajo.id_usuario 
    AND espacios_trabajo.id_espacio_trabajo=tableros.id_espacio_trabajo 
    AND tableros.id_tablero=estados_tablero.id_tablero
    AND usuarios.id_usuario=".$_GET["obtenerEstadosPorUsuario"]);
    if(mysqli_num_rows($sqlEstados) > 0){
        $estados = mysqli_fetch_all($sqlEstados,MYSQLI_ASSOC);
        echo json_encode($estados);
        exit();
    }
    else{  echo json_encode(["Conectado al servidor"=>0]); }
}

?>