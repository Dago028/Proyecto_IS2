import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { BoardsComponent } from './pages/boards/boards.component';
import { DetboardComponent } from './pages/detboard/detboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'detboards', component: DetboardComponent },
  //{
  //  path:'login',
  //  component: LoginComponent
  //},
  //{
  //  path: 'boards',
  //  component: BoardsComponent
  //},
  //{
  //  path: 'detboards',
  //  component: DetboardComponent
  //},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
