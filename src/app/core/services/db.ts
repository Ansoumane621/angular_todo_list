import Dexie,{Table} from "dexie";
import { User } from "../models/db.model";
import { Todo } from "../models/todo.model";

export class AngularTodoDB extends Dexie
{
  users!:Table<User,string>;
  todosAdd!:Table<Todo,string>;
  constructor(){
    super('AngularTodoDB');
    this.version(2).stores({
      users:'email,password',
      todosAdd:'++id,titre,description,done',
    })
  }
}
