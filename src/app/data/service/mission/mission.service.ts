import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import {
  activeMissionEndPoint,
  cancelledMissionEndPoint,
  employeeLightEndPoint,
  missionEndpoint,
  priorityEndpoint,
} from 'src/app/core/constants/endpoints';
import { Selectable } from 'src/app/shared/utility/select';
import { EmployeeCard } from '../../schema/employee';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from 'src/app/core/service/notifications.service';
import { City } from '../../schema/city';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { MissionCard, MissionPost } from '../../schema/mission';
import { catchError, tap, throwError } from 'rxjs';
import { CleanResponse } from '../../schema/response';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  private _priorities$ = new BehaviorSubject<Selectable<number>[]>([]);
  private _missions$: Subject<MissionCard[]>;
  get missions$() {
    return this._missions$.asObservable();
  }
  get priorities$() {
    return this._priorities$.asObservable();
  }

  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService
  ) {
    this._missions$ = new Subject<MissionCard[]>();
    this.http.get<Selectable<number>[]>(priorityEndpoint).subscribe({
      next: (priorities) => {
        this._priorities$.next(priorities);
      },
    });
  }

  reload(isActive: boolean = true) {
    this.getAll().subscribe((missions) => {
      this._missions$.next(missions);
    });
  }

  private getAll(isActive: boolean = true) {
    let url;
    if (isActive) {
      url = activeMissionEndPoint;
    } else {
      url = cancelledMissionEndPoint;
    }
    return this.http.get<MissionCard[]>(url);
  }

  insert(payload: MissionPost) {
    return this.http.post(missionEndpoint, payload).pipe(
      tap(() => {
        this.notificationService.addSuccess('Mission Added');
      }),
      catchError((err) => {
        let error = err.error as CleanResponse;

        if (!error) {
          error = {
            reason: 'Mission Insert Failed',
          };
        }
        console.log(error.reason);
        this.notificationService.addError(error.reason);
        return throwError(() => new Error(''));
      })
    );
  }
}
