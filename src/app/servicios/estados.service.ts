import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EstadosService {
  //API: string = 'http://192.168.100.10/serverapi/estados.php';
  //API: string = 'http://localhost/serverapi/estados.php';
  API: string = 'http://localhost/Proyecto_IS2/serverapi/estados.php';
  constructor(private http: HttpClient) {}

  getEstadosPorUsuario(id_usuario: number) {
    console.log(id_usuario);
    return this.http.get(this.API + '?obtenerEstadosPorUsuario=' + id_usuario);
  }
}
