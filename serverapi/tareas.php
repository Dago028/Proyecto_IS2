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

if (isset($_GET["obtenerTareasPorId"])){
    $sqlTareas = mysqli_query($conexionBD,"SELECT id_tarea AS id,  nombre_tarea AS titulo FROM tareas WHERE id_estado=".$_GET["obtenerTareasPorId"]);
    if(mysqli_num_rows($sqlTareas) > 0){
        $tareas = mysqli_fetch_all($sqlTareas,MYSQLI_ASSOC);
        echo json_encode($tareas);
        exit();
    }
    else{  echo json_encode(["Conectado al servidor"=>0]); }
}

if (isset($_GET["insertarTarea"])){
    $data = json_decode(file_get_contents("php://input"));
    $nombre_tarea=$data->nombre_tarea;
    $descripcion_tarea=$data->descripcion_tarea;
    $id_estado=$data->id_estado;          
    $sqlTareas = mysqli_query($conexionBD,"INSERT INTO tareas(id_tarea, nombre_tarea, descripcion_tarea, fecha_creacion_tarea, fecha_vencimiento, id_estado) VALUES (null, '$nombre_tarea', '$descripcion_tarea', NOW(), NOW(), 1); ");
    exit();
}


?>