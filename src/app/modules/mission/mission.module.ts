import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MissionRoutingModule } from './mission-routing.module';
import { MissionListComponent } from './page/mission/mission-list/mission-list.component';
import { HomeComponent } from './page/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MissionListComponent, HomeComponent],
  imports: [CommonModule, MissionRoutingModule, SharedModule],
})
export class MissionModule {}
