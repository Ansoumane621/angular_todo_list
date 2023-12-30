import { Injectable, inject } from '@angular/core';
import { AngularTodoDB } from './db';
import { User } from '../models/db.model';
import { Router} from '@angular/router';
import { Todo } from '../models/todo.model';
import { liveQuery } from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private route=inject(Router);
  db=new AngularTodoDB();

  //les operations sur l'authentification
  logIn=(email:string)=>this.db.users.get(email);
  newUser=(user:User)=>this.db.users.add(user);
  getUsers=()=>this.db.users.toArray();
  //CRUB TODO
  newTodo=(todo:Todo)=>this.db.todosAdd.add(todo);
  getTodo=()=>liveQuery(()=>this.db.todosAdd.toArray());
  updateTodo=(todo:Todo)=>this.db.todosAdd.update(todo.id!,todo);
  deleteTodo=(todo:Todo)=>this.db.todosAdd.delete(todo.id!);
  //FIN CRUD TODO
  isloginIn=()=>{
    if(localStorage.getItem('email')){
      return true;
    }else{
      this.route.navigate(['/login'])
      return false;
    }
  }
}
