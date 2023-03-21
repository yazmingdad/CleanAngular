import { Injectable } from '@angular/core';
import { map, merge, switchMap, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

export interface Confirmation {
  status: boolean;
  message?: string;
  observable?: Observable<Object>;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  constructor() {
    this._show$ = new Subject<Confirmation>();
    this._confirmation$ = new Subject<boolean>();

    this.confirmation$ = this._confirmation$.pipe(
      switchMap((value) => {
        if (value) {
          if (this._observable) {
            return this._observable;
          }
        }
        return new Observable<Object>((observer) => {
          observer.next('No');
        });
      })
    );
  }

  private _show$: Subject<Confirmation>;
  private _confirmation$: Subject<boolean>;
  private _observable?: Observable<Object>;

  confirmation$: Observable<Object>;

  get show$() {
    return this._show$.pipe(
      tap(({ observable }) => {
        this._observable = observable;
      }),
      map(({ status, message }) => {
        return { status, message };
      })
    );
  }

  confirm(message: string, observable: Observable<Object>) {
    this._show$.next({
      status: true,
      message,
      observable,
    });
  }

  validate(confirmation: boolean) {
    this._confirmation$.next(confirmation);
    this.dismiss();
  }

  dismiss() {
    this._show$.next({
      status: false,
    });
  }
}
