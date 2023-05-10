import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MissionRoutingModule } from './mission-routing.module';
import { MissionListComponent } from './page/mission/mission-list/mission-list.component';
import { HomeComponent } from './page/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MissionItemComponent } from './page/mission/mission-item/mission-item.component';
import { MissionDetailsComponent } from './page/mission/mission-details/mission-details.component';
import { MissionFormComponent } from './page/mission/mission-form/mission-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MissionListComponent,
    HomeComponent,
    MissionItemComponent,
    MissionDetailsComponent,
    MissionFormComponent,
  ],
  imports: [
    CommonModule,
    MissionRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class MissionModule {}
