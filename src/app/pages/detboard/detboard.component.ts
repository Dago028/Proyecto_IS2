import { Component, OnInit } from '@angular/core';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { ToDo, Columnas } from 'src/app/modelos/todo.model';

import { Dialog } from '@angular/cdk/dialog';

import { DialogosComponent } from '../../components/dialogos/dialogos.component';
import { TareasService } from 'src/app/servicios/tareas.service';
import { EstadosService } from 'src/app/servicios/estados.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarea } from 'src/app/modelos/tarea.model';

@Component({
  selector: 'app-detboard',
  templateUrl: './detboard.component.html',
  styleUrls: ['./detboard.css'],
})
export class DetboardComponent implements OnInit {
  form: FormGroup;

  cantidadColumnas = 0;
  estadoColumnas = true;

  idUser: number = Number(localStorage.getItem('idUser'));

  listaTareas: any;
  listaColumnas: any;

  columnas: Columnas[] = [];

  //columnas: Columnas[] = [
  // {
  //   titulo: 'Por hacer',
  //   todos: [
  //     {
  //       id: '1',
  //       titulo: 'Realizar el formulario de Clientes'
  //     },
  //     {
  //       id: '2',
  //       titulo: 'Colocar los campos de texto'
  //     }
  //   ]
  // },
  // {
  //   titulo: 'En proceso',
  //   todos: [
  //     {
  //       id: '3',
  //       titulo: 'Validar los campos'
  //     }
  //   ]
  // },
  // {
  //   titulo: 'Hecho',
  //   todos: [
  //     {
  //       id: '4',
  //       titulo: 'Hacer pruebas al formulario de clientes'
  //     }
  //   ]
  // }
  //];

  //To Do
  todos: ToDo[] = [];

  //Doing
  doing: ToDo[] = [];

  //Done
  done: ToDo[] = [];

  constructor(
    private dialog: Dialog,
    private _tareasService: TareasService,
    private _estadoService: EstadosService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre_tarea: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarTareas(this.idUser);
  }

  guardarTarea(): void {
    this.form.markAllAsTouched();
    console.log(this.form.value.descripcion);
    let tarea: Tarea = {
      id_tarea: 0,
      nombre_tarea: '',
      descripcion_tarea: '',
      id_estado: 0,
    };
    (tarea.descripcion_tarea = this.form.value.descripcion),
      (tarea.id_tarea = 0),
      (tarea.nombre_tarea = this.form.value.nombre_tarea),
      (tarea.id_estado = 1),
      this._tareasService.agregarTarea(tarea).subscribe();
  }

  drop(event: CdkDragDrop<ToDo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      ); //mover el elemento dentro de un mismo array
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  agregarColumna() {
    this.cantidadColumnas = this.columnas.length + 1;
    if (this.cantidadColumnas <= 6) {
      this.columnas.push({
        titulo: 'Nueva columna',
        todos: [],
      });
      this.estadoColumnas = true;
    } else {
      this.estadoColumnas = false;
    }
  }

  abrirDialogo(todo: ToDo) {
    const dialogRef = this.dialog.open(DialogosComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        todo: todo,
      },
    });
    dialogRef.closed.subscribe((output) => {
      console.log(output);
    });
  }

  cargarTareas(id_usuario: number) {
    this._estadoService
      .getEstadosPorUsuario(id_usuario)
      .subscribe((respuesta) => {
        this.listaColumnas = respuesta;
        for (let [index, col] of this.listaColumnas.entries()) {
          let columnaTemp: Columnas = {
            titulo: '',
            todos: [],
          };
          columnaTemp.titulo = col.titulo;
          this._tareasService
            .getTareasPorId(col.id_estado)
            .subscribe((respuesta) => {
              this.listaTareas = respuesta;
              for (let [inde, tarea] of this.listaTareas.entries()) {
                columnaTemp.todos.push(tarea);
              }
            });
          this.columnas.push(columnaTemp);
        }
      });
  }

  crearTarea() {}
}
