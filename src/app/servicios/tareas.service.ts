import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../modelos/tarea.model';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  //API: string = 'http://192.168.100.10/serverapi/tareas.php';
  API: string = 'http://localhost/serverapi/tareas.php';
  //API: string = 'http://localhost/Proyecto_IS2/serverapi/tareas.php';
  constructor(private http: HttpClient) {}

  getTareas(id_usuario: number) {
    return this.http.get(this.API + '?obtenerTareasPorUser=' + id_usuario);
  }

  getTareasPorId(idEstado: number) {
    return this.http.get(this.API + '?obtenerTareasPorId=' + idEstado);
  }

  agregarTarea(tarea: Tarea): Observable<any> {
    return this.http.post(this.API + '?insertarTarea=1', tarea);
  }
}
