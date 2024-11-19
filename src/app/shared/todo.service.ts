import { Injectable, OnDestroy } from '@angular/core';
import { Todo } from './todo.model';
import { BehaviorSubject, Subscription } from 'rxjs';  // Import BehaviorSubject
import { fromEvent } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnDestroy {
  todos: Todo[] = [];
  private todosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]); // Initialize BehaviorSubject
  storageListenSub: Subscription;

  constructor() {
    this.loadState(); // Load todos from local storage on initialization
    this.todosSubject.next(this.todos); // Emit the current state of todos

    // Listen for 'storage' events and reload state if the 'todos' key changes
    this.storageListenSub = fromEvent<StorageEvent>(window, 'storage')
      .pipe(
        filter((event) => event.key === 'todos'), // Only process events for the 'todos' key
        debounceTime(100) // Add debounce to reduce excessive processing
      )
      .subscribe(() => {
        this.loadState(); // Re-sync todos with the updated local storage data
        this.todosSubject.next(this.todos); // Emit updated state
      });
  }

  ngOnDestroy(): void {
    if (this.storageListenSub) this.storageListenSub.unsubscribe();
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  getTodo(id: string): Todo | undefined {
    return this.todos.find((t) => t.id === id);
  }

  addTodo(todo: Todo): void {
    this.todos.push(todo);
    this.saveState();
    this.todosSubject.next(this.todos); // Emit the updated todos list
  }

  updateTodo(id: string, updatedTodoFields: Partial<Todo>): void {
    const todo = this.getTodo(id);
    if (todo) {
      Object.assign(todo, updatedTodoFields);
      this.saveState(); // Save state after updating
      this.todosSubject.next(this.todos); // Emit the updated todos list
    } else {
      console.warn(`Todo with id ${id} not found.`);
    }
  }

  deleteTodo(id: string): void {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1); // Remove the todo from the array
      this.saveState(); // Save state after deletion
      this.todosSubject.next(this.todos); // Emit the updated todos list
    } else {
      console.warn(`Todo with id ${id} not found.`);
    }
  }

  saveState(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadState(): void {
    try {
      const todosInStorage = JSON.parse(localStorage.getItem('todos') ?? '[]');
      if (Array.isArray(todosInStorage)) {
        this.todos.length = 0; // Clear the existing array
        this.todos.push(...todosInStorage); // Populate it with the saved data
        this.todosSubject.next(this.todos); // Emit updated state
      } else {
        console.warn('Invalid todos format in local storage. Resetting to empty.');
        this.todos = [];
        this.todosSubject.next(this.todos); // Emit empty state
      }
    } catch (e) {
      console.error('Failed to load todos from local storage:', e);
      this.todos = []; // Reset to an empty array if an error occurs
      this.todosSubject.next(this.todos); // Emit empty state
    }
  }

  // Expose the observable for components to subscribe to
  getTodosObservable() {
    return this.todosSubject.asObservable();
  }
}
