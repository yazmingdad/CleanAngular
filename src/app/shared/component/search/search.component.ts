import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @Input() title = 'Search';
  @Input() hasAddNew = true;
  @Output() create = new EventEmitter();
  @Output() search = new EventEmitter<string>();

  onCreate = () => {
    this.create.emit();
  };
  onSearch(value: string) {
    this.search.emit(value);
  }
}
