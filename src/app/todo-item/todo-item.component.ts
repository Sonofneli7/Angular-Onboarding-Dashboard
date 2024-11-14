import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent implements OnInit {


  @Input() todo?: Todo 

  @Output() editClick: EventEmitter<void> = new EventEmitter()
  @Output() deleteClick: EventEmitter<void> = new EventEmitter()

 

  constructor(  ) { }
  ngOnInit(): void {
  }

  onEditClick() {
      this.editClick.emit()
  }

  onDeleteclick() {
    this.deleteClick.emit()
  }

}
