import { Component } from '@angular/core';
import { missions } from 'src/app/data/service/fake.data';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.css'],
})
export class MissionListComponent {
  missions = missions;
}