import { Component, Input, SimpleChanges } from '@angular/core';
import { MissionCard } from 'src/app/data/schema/mission';
import { Priority } from 'src/app/data/schema/priority';
import { MissionOrder } from 'src/app/data/reports/mission-order';

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.css'],
})
export class MissionDetailsComponent {
  @Input() mission: MissionCard;
  private reporter: MissionOrder;
  constructor() {}
  ngOnInit() {
    console.log('mission details', this.mission);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('mission details change', this.mission);
    this.reporter = new MissionOrder(this.mission);
    console.log('reporter', this.reporter);
  }
  get Priority() {
    return Priority;
  }

  onView() {
    this.reporter.OpenReport();
  }

  onDownload() {
    this.reporter.DownloadReport(this.mission.code);
  }
}
