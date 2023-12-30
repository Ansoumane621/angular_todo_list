import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-tool-todo',
  standalone: true,
  imports: [CommonModule,RouterModule],
  template: `
    <nav class="toolbar">
      <a class="appTitre" routerLink="/">TodoApp</a>
      <button class="toolbarbutton" routerLink="/register"  *ngIf="isLoginBtnShow">S'inscrire</button>
      <button class="toolbarbutton" routerLink="/login"  *ngIf="isRegisterBtnShow">Se connecter</button>
      <div class="avatar" *ngIf="isLogoutBtnShow">
        <div class="avatar-circle">
          {{ firstLetterTodoEmail![0] |uppercase}}
        </div>
      <button (click)="logout()" class="toolbarbutton" >Se deconnecter</button>
      </div>


    </nav>
  `,
  styles: [
    `
    .avatar{
      display:flex;
    }
    .avatar-circle{
      margin-right:15px;
      padding:5px 18px;
      background:grey;
      border-radius:50%;
      font-size:30px;
      align-items:center;
    }
    .appTitre{
      font-size:2em;
      color:inherit;
      text-decoration:none;
    }
    .toolbar{
      height:4rem;
      display:flex;
      justify-content:space-between;
      align-items:center;
      padding:0 1rem ;
      position:sticky;
      top:0;
      border-bottom:0.1px #2828281a solid;
    }
    .toolbarbutton{
      padding:0.5rem 1rem;
      font-size:1.1rem;
      border-radius:8px;
      transition:transform 250ms;
      color:white;
      background-color:#252525;
      &:hover{
        cursor:pointer;
        transform:scale(1.1);
      }
    }
    `
  ]
})
export class ToolTodoComponent {
    @Input() isLoginBtnShow!:boolean;
    @Input() isRegisterBtnShow!:boolean;
    @Input() isLogoutBtnShow!:boolean;
    private ps=inject(TodoService);
    firstLetterTodoEmail=localStorage.getItem('email');

    logOut=()=>localStorage.removeItem('email');
    private route=inject(Router);
    logout(){
      localStorage.removeItem('email');
      this.route.navigate(['/login']);
    }
}
