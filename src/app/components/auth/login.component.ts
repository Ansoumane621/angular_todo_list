
import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolTodoComponent } from '../shared/tool-todo.component';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ToolTodoComponent,RouterModule,ReactiveFormsModule],
  template: `
    <app-tool-todo [isLoginBtnShow]="true"></app-tool-todo>

    <div class="container">
      <div class="d-flex d">

        <form [formGroup]="loginInfo" class="text-center border border-3 rounded m-5 p-5">
            <h1>Connectez-vous</h1>
            <h3>Veuillez enter votre email <a routerLink="/register">S'inscrire</a></h3>

            <input class="form-control mb-3" type="email" placeholder="votre email" name="email" formControlName="email"/>
            <input class="form-control" type="password" placeholder="votre mot de passe" name="password" formControlName="password"/>
            <p class="color-red text-center" *ngIf="showError">{{errMsg}}</p>
            <button (click)="onsubmit()" [ngClass]="{'btn-active':!loginInfo.invalid}" [disabled]="loginInfo.invalid"  class="btn" type="submit">Connexion</button>
          </form>


      </div>

    </div>
  `,
  styles: [
    `
    p{
      color:red;
    }
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
export default class LoginComponent {
    showError=false;
    private ps=inject(TodoService);
    private router=inject(Router);
    errMsg='cet email ou mot de passe n\'existe pas veuillez vous inscrire';
    loginInfo=new FormGroup({
        email:new FormControl('',[Validators.email,Validators.required]),
        password:new FormControl('',[Validators.required]),
    })

    async onsubmit(){
        const email=this.loginInfo.value.email!;
        const password=this.loginInfo.value.password!;
        const user=await this.ps.logIn(email);
        if(user?.email===email && user.password==password){
          localStorage.setItem('email',email),
          this.router.navigate(['/todos']);
        }else{
          this.showError=true;
        }

    }
}
