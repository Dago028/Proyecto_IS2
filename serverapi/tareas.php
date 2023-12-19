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
if (isset($_GET["obtenerTareasPorUser"])){
    $sqlTareas = mysqli_query($conexionBD,"SELECT tareas.id_tarea AS id_tarea, tareas.nombre_tarea AS nombre_tarea, tareas.descripcion_tarea AS descripcion_tarea, tareas.fecha_creacion_tarea AS fecha_creacion_tarea, tareas.fecha_vencimiento AS fecha_vencimiento, tareas.id_estado AS id_estado, tareas.etiqueta AS etiqueta 
    FROM tareas, tableros, espacios_trabajo, estados_tablero, usuarios 
    WHERE usuarios.id_usuario=espacios_trabajo.id_usuario 
    AND espacios_trabajo.id_espacio_trabajo=tableros.id_espacio_trabajo 
    AND tableros.id_tablero=estados_tablero.id_tablero 
    AND estados_tablero.id_estado=tareas.id_estado 
    AND usuarios.id_usuario=2");
    if(mysqli_num_rows($sqlTareas) > 0){
        $tareas = mysqli_fetch_all($sqlTareas,MYSQLI_ASSOC);
        echo json_encode($tareas);
        exit();
    }
    else{  echo json_encode(["Conectado al servidor"=>0]); }
}

if (isset($_GET["obtenerTareasConEstados"])){
    $sqlTareas = mysqli_query($conexionBD,"SELECT estados_tablero.id_estado AS id_estado, 
    estados_tablero.nombre_estado AS nombre_estado, estados_tablero.posicion_estado AS posicion_estado, 
    tareas.id_tarea AS id, tareas.nombre_tarea AS titulo, 
    tareas.descripcion_tarea AS descripcion_tarea, tareas.fecha_creacion_tarea AS fecha_creacion_tarea, 
    tareas.fecha_vencimiento AS fecha_vencimiento, tareas.id_estado AS id_estado, 
    tareas.etiqueta AS etiqueta 
    FROM tareas, tableros, espacios_trabajo, estados_tablero, usuarios 
    WHERE usuarios.id_usuario=espacios_trabajo.id_usuario 
    AND espacios_trabajo.id_espacio_trabajo=tableros.id_espacio_trabajo 
    AND tableros.id_tablero=estados_tablero.id_tablero 
    AND estados_tablero.id_estado=tareas.id_estado 
    AND usuarios.id_usuario=2");
    if(mysqli_num_rows($sqlTareas) > 0){
        $tareas = mysqli_fetch_all($sqlTareas,MYSQLI_ASSOC);
        echo json_encode($tareas);
        exit();
    }
    else{  echo json_encode(["Conectado al servidor"=>0]); }
}
?>