import { Component, OnInit, Inject } from '@angular/core';

import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog'; 

import { faClose, faCheckToSlot, faBars, faUser, faTag, faCheckSquare, faClock } from '@fortawesome/free-solid-svg-icons';

import { ToDo } from 'src/app/modelos/todo.model';

interface inputData {
  todo: ToDo;
}

interface outputData {
  respuesta: boolean;
}

@Component({
  selector: 'app-dialogos',
  templateUrl: './dialogos.component.html'
})
export class DialogosComponent implements OnInit {

  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  faUser = faUser;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;

  todo: ToDo;


  constructor (
    private dialogRef: DialogRef<outputData>,
    @Inject(DIALOG_DATA) data: inputData
  ) 
  { 
    this.todo = data.todo;
  }

  ngOnInit(): void {
    
  }

  cerrarVentana() {
    this.dialogRef.close();
  }

  cerrarConrespuesta(respuesta: boolean) {
    this.dialogRef.close ({ respuesta });
  }
}
