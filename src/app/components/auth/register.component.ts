import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolTodoComponent } from '../shared/tool-todo.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../core/models/db.model';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ToolTodoComponent,ReactiveFormsModule,RouterModule],
  template: `
  <app-tool-todo [isRegisterBtnShow]="true"></app-tool-todo>
  <div class="container">
      <div class="d-flex d">

        <form [formGroup]="registerInfo" class="text-center border border-3 rounded m-5 p-5">
            <h1>Enregistrez-vous</h1>
            <h4>Veuillez enter votre email et mot de passe <a routerLink="/login">Se connecté</a></h4>

            <input class="form-control mb-3" type="email" placeholder="votre email" name="email" formControlName="email"/>
            <input class="form-control" type="password" placeholder="votre mot de passe" name="password" formControlName="password"/>

            <button (click)="onSubmit()" [ngClass]="{'btn-active':!registerInfo.invalid}" [disabled]="registerInfo.invalid" class="btn">Enregister</button>
      </form>


      </div>

    </div>
  `,
  styles: [
    `
    button{
      margin-top:10px;
      padding:0.1rem 1.3rem;
      font-size:1.5em;
      width:100%;
      transition:transform 250ms;
    }
    .d{
      width:50%;
      margin:auto;

    }
    .btn-active{
        color:white;
        background:#252525;
    }

    @use '../../core/styele.css';
    `
  ]
})
export default class RegisterComponent {
  registerInfo=new FormGroup({
    email:new FormControl('',[Validators.email,Validators.required]),
    password:new FormControl('',[Validators.required]),
});

private db=inject(TodoService);
private router=inject(Router);

async onSubmit(){
    const email=this.registerInfo.value.email!;
    const password =this.registerInfo.value.password!;
    const user:User={
    email:email,password:password
}

localStorage.setItem('email',user.email);
await this.db.newUser(user);
this.router.navigateByUrl('/todos');
}



}
