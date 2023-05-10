import { Component } from '@angular/core';
import { missions } from 'src/app/data/service/fake.data';

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.css'],
})
export class MissionDetailsComponent {
  mission = missions[0];
}
