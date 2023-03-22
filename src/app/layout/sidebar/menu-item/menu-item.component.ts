import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MenuItem } from 'src/app/core/service/menu.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
})
export class MenuItemComponent {
  @Input() index$: Observable<number>;

  @Input() menuItem: MenuItem;
  @Output() expand = new EventEmitter();
  @Output() navigate = new EventEmitter();
  isExpanded = false;

  ngOnInit() {
    this.index$.subscribe((index) => {
      if (index === this.menuItem.index) {
        this.isExpanded = true;
      } else {
        this.isExpanded = false;
      }
    });
  }

  onClick() {
    if (!this.isExpanded) {
      this.isExpanded = true;
      this.expand.emit(this.menuItem.index);
    } else {
      this.isExpanded = false;
    }
  }

  onNavigate() {
    this.navigate.emit();
  }
}
