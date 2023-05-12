import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import {
  employeeLightEndPoint,
  priorityEndpoint,
} from 'src/app/core/constants/endpoints';
import { Selectable } from 'src/app/shared/utility/select';
import { EmployeeCard } from '../../schema/employee';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from 'src/app/core/service/notifications.service';
import { City } from '../../schema/city';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  private _priorities$ = new BehaviorSubject<Selectable<number>[]>([]);

  get priorities$() {
    return this._priorities$.asObservable();
  }

  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService
  ) {
    this.http.get<Selectable<number>[]>(priorityEndpoint).subscribe({
      next: (priorities) => {
        this._priorities$.next(priorities);
      },
    });
  }
}
