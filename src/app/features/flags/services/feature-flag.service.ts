import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeatureFlag, GetFeatureFlag } from '../models/response.model';
import { BaseResponse } from '../../../core/models/base-response.model';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService {
  private readonly apiUrl = 'http://localhost:5062/api'; // backend URL

  constructor(private http: HttpClient) {}

  getAll(): Observable<BaseResponse<GetFeatureFlag[]>> {
    return this.http.get<BaseResponse<GetFeatureFlag[]>>(
      `${this.apiUrl}/FeatureFlags/get-all`
    );
  }

  create(data: Partial<FeatureFlag>): Observable<any> {
    return this.http.post(`${this.apiUrl}/FeatureFlags`, data);
  }

  update(id: string, data: Partial<FeatureFlag>): Observable<any> {
    return this.http.put(`${this.apiUrl}/FeatureFlags/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/FeatureFlags/${id}`);
  }

  deleteRule(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/SegmentRules/${id}`);
  }
}
