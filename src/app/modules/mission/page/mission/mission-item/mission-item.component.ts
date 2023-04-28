import { Component, Input } from '@angular/core';
import { Mission } from 'src/app/data/schema/mission';

@Component({
  selector: 'app-mission-item',
  templateUrl: './mission-item.component.html',
  styleUrls: ['./mission-item.component.css'],
})
export class MissionItemComponent {
  @Input() mission: Mission;

  constructor() {
    console.log('mission-item', this.mission);
  }

  ngOnInit() {
    console.log('mission-item', this.mission);
  }
}
