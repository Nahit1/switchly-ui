import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EvaluateResult } from '../models/response/response.model';
import { Observable } from 'rxjs';
import { EvaluateRequest } from '../models/request/request.model';

@Injectable({
  providedIn: 'root',
})
export class EvaluateService {
  private readonly apiUrl = 'http://localhost:5062/api/Evaluate'; // backend URL

  constructor(private http: HttpClient) {}

  evaluateFlag(payload: EvaluateRequest): Observable<any> {
    return this.http.post<EvaluateResult>(this.apiUrl, payload);
  }
}
