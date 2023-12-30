import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolTodoComponent } from '../shared/tool-todo.component';
import { AddTodoComponent } from './add-todo.component';
import { TodoListComponent } from './todo-list.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule,ToolTodoComponent,AddTodoComponent,TodoListComponent],
  template: `
  <app-tool-todo [isLogoutBtnShow]="true"></app-tool-todo>
    <div class="container">
          <app-add-todo></app-add-todo>
          <app-todo-list></app-todo-list>
    </div>
  `,
  styles: [
  ]
})
export default class TodoComponent {

}
