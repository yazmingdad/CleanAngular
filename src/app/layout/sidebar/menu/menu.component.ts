import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MenuItem, modules } from 'src/app/shared/utility/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  @Input() showMenu = false;
  @Output() close = new EventEmitter();

  index$ = new Subject<number>();

  currentIndex = -1;
  modules: MenuItem[] = modules;

  constructor() {
    console.log('new menu instance');
  }

  onClose() {
    this.close.emit();
  }
}
