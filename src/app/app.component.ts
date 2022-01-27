import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Todo } from './Todo';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'day_3_workshop_todo';
  form: FormGroup;
  tomorrow = new Date();
  todosValues : Todo[] =[];
  priorities =["low", "Medium","High"];

  taskFormControl = new FormControl('', [Validators.required]);
  priorityFormControl = new FormControl('', [Validators.required]);
  dueDateFormControl = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder){
    this.tomorrow.setDate(this.tomorrow.getDate()+1);
    this.form = this.fb.group({
      task: this.taskFormControl,
      priority: this.priorityFormControl,
      dueDate: this.dueDateFormControl
    })
  }
  addTodo(){
    console.log("Add todo");
    let taskId = uuidv4();
    let singleTodo = new Todo(
      this.form.value.task,
      this.form.value.priority,
      this.form.value.dueDate,
      taskId
    )
    this.todosValues.push(singleTodo);
    this.taskFormControl.reset();
    this.priorityFormControl.reset();
    this.dueDateFormControl.reset();
    localStorage.setItem(taskId, JSON.stringify(singleTodo))
  }
}
