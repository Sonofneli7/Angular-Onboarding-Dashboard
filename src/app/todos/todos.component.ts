import { Component, OnInit } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TodoService } from '../shared/todo.service';
import { Todo } from 'c:/Projects/New Projects/angular-onboarding-dashboard/src/app/shared/todo.model';


@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [NgFor, CommonModule, RouterModule, TodoItemComponent],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
onDrop($event: Event) {
throw new Error('Method not implemented.');
}

  todos: Todo[] = [];

  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit(): void {
    this.todos = this.todoService.getTodos() || [];
  }

  onEditClick(todo: Todo) {
    if (todo.id) {
      this.router.navigate(['/todos', todo.id]);
    }
  }

  onDeleteClick(todo: Todo) {
    if (todo.id) {
      this.todoService.deleteTodo(todo.id);
      this.todos = this.todos.filter(t => t.id !== todo.id); // Update todos array to trigger animation
    }
  }

  toggleCompleted(todo: Todo) {
    if (todo.id) {
      this.todoService.updateTodo(todo.id, { completed: !todo.completed });
    }
  }
}
