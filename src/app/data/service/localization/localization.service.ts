import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { citiesEndPoint } from 'src/app/core/constants/endpoints';
import { NotificationsService } from 'src/app/core/service/notifications.service';
import { Selectable } from 'src/app/shared/utility/select';
import { City } from '../../schema/city';

@Injectable()
export class LocalizationService {
  private _cities$ = new Subject<City[]>();
  get cities$() {
    return this._cities$.asObservable();
  }
  constructor(
    private http: HttpClient,
    private notificationService: NotificationsService
  ) {}

  getCities() {
    return this.http.get<City[]>(citiesEndPoint).subscribe({
      next: (cities) => this._cities$.next(cities),
    });
  }
}
