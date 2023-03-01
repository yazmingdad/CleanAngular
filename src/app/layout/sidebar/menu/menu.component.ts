import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  @Input() showMenu = false;
  @Output() close = new EventEmitter();

  constructor() {
    console.log('new menu instance');
  }

  onClose() {
    this.close.emit();
  }
}
