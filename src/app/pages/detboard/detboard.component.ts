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
import { FormBuilder, FormGroup, NgControlStatusGroup, Validators } from '@angular/forms';
import { Tarea } from 'src/app/modelos/tarea.model';
import { CloseScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-detboard',
  templateUrl: './detboard.component.html',
  styleUrls: ['./detboard.css'],
})
export class DetboardComponent implements OnInit {
  form: FormGroup;
  temp= true;
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
      (tarea.id_estado = Number(localStorage.getItem('idPrimerEstado'))),
      this._tareasService.agregarTarea(tarea).subscribe();
      this.columnas=[];
      this.form.reset();
      this.cargarTareas(this.idUser);
    }

  drop(event: CdkDragDrop<ToDo[]>, id_estado_futuro: number) {
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
      console.log('id estado futuro'+id_estado_futuro);
      console.log(event.container.data);
      
      
    }
  }

  agregarColumna() {
    this.cantidadColumnas = this.columnas.length + 1;
    if (this.cantidadColumnas <= 6) {
      this.columnas.push({
        id_estado: 0,
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
    this.temp= true;
    this._estadoService
      .getEstadosPorUsuario(id_usuario)
      .subscribe((respuesta) => {
        this.listaColumnas = respuesta;
        for (let [index, col] of this.listaColumnas.entries()) {

          let columnaTemp: Columnas = {
            id_estado: 0,
            titulo: '',
            todos: [],
          };
          columnaTemp.id_estado = col.id_estado;
          columnaTemp.titulo = col.titulo;
          if (this.temp) {
            localStorage.setItem('idPrimerEstado', col.id_estado);
            this.temp= false;
          }
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

}
