import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MenuItem } from 'src/app/shared/utility/menu';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
})
export class MenuItemComponent {
  @Input() index$: Subject<number>;
  @Input() menuItem: MenuItem;
  @Output() expand = new EventEmitter();

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
}
