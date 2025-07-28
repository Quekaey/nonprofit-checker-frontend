import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CheckResponse {
  data: any;
  history: Array<{ query: any; timestamp: string; result: any }>;
}

@Injectable({ providedIn: 'root' })
export class NonprofitService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private authHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${environment.authToken}`,
      }),
    };
  }

  checkByEin(ein: string): Observable<CheckResponse> {
    const params = new HttpParams().set('ein', ein);
    return this.http.get<CheckResponse>(`${this.baseUrl}/check`, {
      params,
      ...this.authHeaders(),
    });
  }
  checkByName(name: string): Observable<CheckResponse> {
    const params = new HttpParams().set('name', name);
    return this.http.get<CheckResponse>(`${this.baseUrl}/check`, {
      params,
      ...this.authHeaders(),
    });
  }
}
