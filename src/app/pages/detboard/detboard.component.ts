import { Component, OnInit } from '@angular/core';

import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { ToDo } from 'src/app/modelos/todo.model'; 

@Component({
  selector: 'app-detboard',
  templateUrl: './detboard.component.html',
  styleUrls: ['./detboard.css']
})
export class DetboardComponent implements OnInit {

  //To Do
  todos : ToDo [] = [
    {
      id: '1',
      titulo: 'Realizar el formulario de Clientes'
    },
    {
      id: '2',
      titulo: 'Colocar los campos de texto'
    },
  ];

//Doing
  doing : ToDo [] = [
    {
      id: '3',
      titulo: 'Validar los campos'
    }
  ];

//Done
  done : ToDo [] = [
    {
      id: '4',
      titulo: 'Hacer pruebas al formulario de clientes'
    }
  ];

  constructor () {

  }

  ngOnInit(): void {
    
  }

  drop(event: CdkDragDrop<ToDo[]> ) {

    if ( event.previousContainer === event.container ){
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex); //mover el elemento dentro de un mismo array
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    };
  }  
}
