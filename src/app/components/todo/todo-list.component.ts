import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from 'src/app/core/models/todo.model';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card todos-card row" *ngFor="let todo of todos$ | async">
      <div class="content-card">
        <div>
              <input type="checkbox" [checked]="todo.done" name="done" (click)="updateTodo(todo)"/>
              <div class="titre-des" [ngClass]="{'decor':todo.done}">
                <h4>{{todo.titre}}</h4>
                <h5>{{todo.description}}</h5>
              </div>
        </div>
        <button class="btn btn-danger col-md-4" (click)="deleteTodo(todo)">Supprimer</button>
      </div>
    </div>
  `,
  styles: [
    `
    .decor{
      text-decoration:line-through;
    }
    .titre-des{
      display:inline-block;
      align-self:center;
      align-items:center;
    }
    button{
      max-height:35px;
    }
    input{
      width:25px;
    }
    .todos-card{
      margin:10px 0;
      padding:10px;
      min-height:90px;
    }
    .content-card{

      display:flex;
      align-self:center;
      align-items:center;
      justify-content:space-between;
    }
    `
  ]
})
export class TodoListComponent{
  private ts=inject(TodoService);
  readonly todos$=this.ts.getTodo();

  updateTodo(todo:Todo){

    todo.done=!todo.done;
    this.ts.updateTodo(todo);

  }
  deleteTodo(todo:Todo){
      this.ts.deleteTodo(todo);
  }
}
