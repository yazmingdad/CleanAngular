import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  showModal = false;
  @Input() title = '';
  @Output() dismiss = new EventEmitter();
  @Output() search = new EventEmitter<string>();

  onDismiss = () => {
    this.showModal = false;
    this.dismiss.emit();
  };
  onSearch(value: string) {
    this.search.emit(value);
  }
}
