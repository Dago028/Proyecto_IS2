import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loading = false;
  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _userService: UsuariosService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  ingresar() {
    const usuario = this.formulario.value.usuario;
    const password = this.formulario.value.password;
    console.log(usuario, password);
    this._userService
      .getExistUser(usuario, password)
      .subscribe((respuesta: any[]) => {
        if (respuesta[0] != 0) {
          console.log(respuesta[0]);
          localStorage.setItem('idUser', respuesta[0].id_usuario);
          localStorage.setItem('user', respuesta[0].nombre_usuario);
          localStorage.setItem('pass', respuesta[0].contrasena_usuario);
          this.fakeLoading();
          this.router.navigate(['detboards']);
        } else {
          this.formulario.reset();
        }
      });
  }

  //error() {
  //  this._snackBar.open('usuario o contraseña ingresado son invalidos', '', {
  //    duration: 5000,
  //    horizontalPosition: 'center',
  //    verticalPosition: 'bottom',
  //  });
  //}

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2500);
  }
}
