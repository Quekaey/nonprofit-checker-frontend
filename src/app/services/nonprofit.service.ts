import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CheckResponse {
  data: any;
  history: Array<{ query: any; timestamp: string; result: any }>;
}

@Injectable({ providedIn: 'root' })
export class NonprofitService {
  private baseUrl = '';

  constructor(private http: HttpClient) {}

  checkByEin(ein: string): Observable<CheckResponse> {
    const params = new HttpParams().set('ein', ein);
    return this.http.get<CheckResponse>(`${this.baseUrl}/check`, { params });
  }

  checkByName(name: string): Observable<CheckResponse> {
    const params = new HttpParams().set('name', name);
    return this.http.get<CheckResponse>(`${this.baseUrl}/check`, { params });
  }
}
