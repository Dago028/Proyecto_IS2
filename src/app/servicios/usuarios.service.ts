import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  API: string = 'http://localhost/serverapi/usuarios.php';

  constructor(private clientHttp: HttpClient) {}

  getExistUser(usuario: string, contrasena: string): Observable<any[]> {
    return this.clientHttp.get<[]>(
      this.API +
        '?existeUser=' +
        1 +
        '&usuario=' +
        usuario +
        '&contrasena=' +
        contrasena
    );
  }
}
