import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { TodoService } from './core/services/todo.service';

export const routes: Routes = [
  {
    path:'login',
    loadComponent:()=>import('./components/auth/login.component'),
    title:'Login | TodoApp'
  },
  {
    path:'register',
    loadComponent:()=>import('./components/auth/register.component'),
    title:'Register | TodoApp'
  },
  {
    path:'todos',
    loadComponent:()=>import('./components/todo/todo.component'),
    canActivate:[()=>inject(TodoService).isloginIn()],
    title:'Todos | TodoApp'
  },
  {
    path:'',
    redirectTo:'/todos',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'/todos',
    pathMatch:'full'
  },
];
