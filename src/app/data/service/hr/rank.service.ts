import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rankEndPoint } from 'src/app/core/constants/endpoints';
import { Rank } from '../../schema/rank';

@Injectable()
export class RankService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Rank[]>(rankEndPoint);
  }
}
