import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from 'src/app/core/services/todo.service';
import { Todo } from 'src/app/core/models/todo.model';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  template: `
    <form [formGroup]="addTodoForm">
          <input class="form-control" name="title" type="text" placeholder="votre titre ici" formControlName="titre"/>
          <input class="form-control" name="description" type="text" placeholder="votre description ici" formControlName="description"/>
          <button (click)="onSubmit()" [ngClass]="{'btn-active':!addTodoForm.invalid}" [disabled]="addTodoForm.invalid" class="btn">Enregister</button>
    </form>
  `,
  styles: [
    `
    form{
      text-align:center;
      margin-top:15px;
      display:flex;
      width:60%;
      margin:15px auto;
    }
    input{
      margin:0 0.5rem;
    }
     .btn-active{
        color:white;
        background:#252525;
    }
    `
  ]
})
export class AddTodoComponent {
  private ts=inject(TodoService);
  addTodoForm=new FormGroup({
    titre:new FormControl('',Validators.required),
    description:new FormControl('')
  });

      onSubmit(){
      const todos:Todo={
        titre:this.addTodoForm.value.titre!,
        description:this.addTodoForm.value.description!,
        done:false
      }
      this.ts.newTodo(todos);
      this.addTodoForm.reset();
  }
}
