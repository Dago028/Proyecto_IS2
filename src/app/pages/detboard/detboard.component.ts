import { Component, OnInit } from '@angular/core';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { ToDo, Columnas } from 'src/app/modelos/todo.model';

import { Dialog } from '@angular/cdk/dialog';

import { DialogosComponent } from '../../components/dialogos/dialogos.component';

@Component({
  selector: 'app-detboard',
  templateUrl: './detboard.component.html',
  styleUrls: ['./detboard.css']
})
export class DetboardComponent implements OnInit {
  cantidadColumnas = 0;
  estadoColumnas = true;
  columnas: Columnas[] = [
    {
      titulo: 'Por hacer',
      todos: [
        {
          id: '1',
          titulo: 'Realizar el formulario de Clientes'
        },
        {
          id: '2',
          titulo: 'Colocar los campos de texto'
        },
      ]
    },
    {
      titulo: 'En proceso',
      todos: [
        {
          id: '3',
          titulo: 'Validar los campos'
        }
      ]
    },
    {
      titulo: 'Hecho',
      todos: [
        {
          id: '4',
          titulo: 'Hacer pruebas al formulario de clientes'
        }
      ]
    }
  ];

  //To Do
  todos: ToDo[] = [];

  //Doing
  doing: ToDo[] = [];

  //Done
  done: ToDo[] = [];

  constructor(
    private dialog: Dialog
  ) { }

  ngOnInit(): void {

  }

  drop(event: CdkDragDrop<ToDo[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex); //mover el elemento dentro de un mismo array
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    };
  }

  agregarColumna() {
    this.cantidadColumnas = this.columnas.length + 1;
    console.log(this.cantidadColumnas);
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
    const dialogRef = this.dialog.open(
      DialogosComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        todo: todo,
      }
    });
    dialogRef.closed.subscribe(output => {
      console.log(output);
    });
  }
}
