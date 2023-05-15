import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Mission, MissionCard } from 'src/app/data/schema/mission';
import { Priority } from 'src/app/data/schema/priority';

@Component({
  selector: 'app-mission-item',
  templateUrl: './mission-item.component.html',
  styleUrls: ['./mission-item.component.css'],
})
export class MissionItemComponent {
  @Input() mission: MissionCard;
  @Input() selectedIndex: number;
  @Output() view = new EventEmitter<number>();

  get Priority() {
    return Priority;
  }

  constructor() {
    console.log('mission-item', this.mission);
  }

  ngOnInit() {
    console.log('mission-item', this.mission);
  }

  onClick(id: number) {
    this.view.emit(id);
  }
}
