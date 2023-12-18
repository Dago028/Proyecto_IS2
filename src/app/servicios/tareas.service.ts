import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TareasService {
  API: string = 'http://localhost/serverapi/tareas.php';
  constructor(private http: HttpClient) { }

  getTareas() {
    return this.http.get(this.API + '?obtenerTareas');
  }

  getTareasPorId(idEstado: number) {
    return this.http.get(this.API + '?obtenerTareasPorId=' + idEstado);
  }
}
