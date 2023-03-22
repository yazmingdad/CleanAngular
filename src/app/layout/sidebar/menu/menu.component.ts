import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MenuItem, MenuService } from 'src/app/core/service/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  index$ = new Observable<number>();
  modules: MenuItem[] = [];
  showMenu = false;

  constructor(private menuService: MenuService) {
    this.menuService.show$.subscribe((value) => {
      this.showMenu = value;
    });
    this.menuService.modules$.subscribe((modules) => (this.modules = modules));

    this.index$ = this.menuService.index$;

    console.log('new menu instance');
  }

  onExpand(index: number) {
    this.menuService.expand(index);
  }

  onClose() {
    this.menuService.toggleMenu();
  }
}
