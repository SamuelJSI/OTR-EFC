import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MoneyCode } from '../models/money.code.model';

@Injectable({
  providedIn: 'root',
})
export class MoneyCodeService {
  constructor(private http: HttpClient) {}

  getMoneyCodes(): Observable<Array<MoneyCode>> {
    return this.http.get<Array<MoneyCode>>('assets/money-codes.json');
  }
}
