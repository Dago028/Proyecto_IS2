import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
  //API: string = 'http://192.168.100.10/serverapi/estados.php';
  API: string = 'http://localhost/serverapi/estados.php';
  idUsuario = 2;
  constructor(private http: HttpClient) { }

  getEstadosPorUsuario() {
    return this.http.get(this.API + '?obtenerEstadosPorUsuario=' + this.idUsuario);
  }
}
