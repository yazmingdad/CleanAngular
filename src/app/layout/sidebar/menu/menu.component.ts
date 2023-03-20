import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  MenuItem,
  modules,
  NavigationService,
} from 'src/app/core/service/navigation.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  // @Input() showMenu = false;
  // @Output() close = new EventEmitter();

  index$ = new Observable<number>();
  modules: MenuItem[] = modules;

  showMenu = false;

  constructor(private navigationService: NavigationService) {
    this.navigationService.showMenu$.subscribe((value) => {
      this.showMenu = value;
    });

    this.index$ = this.navigationService.index$;

    console.log('new menu instance');
  }

  onExpand(index: number) {
    this.navigationService.expand(index);
  }

  onClose() {
    this.navigationService.toggleMenu();
  }
}
