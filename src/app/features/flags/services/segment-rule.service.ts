import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SegmentRuleDto } from '../models/response.model';
import { CreateSegmentRuleRequest } from '../models/request.model';

@Injectable({ providedIn: 'root' })
export class SegmentRuleService {
  private readonly baseUrl = 'http://localhost:5062/api'; // backend URL

  constructor(private http: HttpClient) {}

  getSegmentRules(flagId: string): Observable<SegmentRuleDto[]> {
    return this.http.get<SegmentRuleDto[]>(
      `${this.baseUrl}/segmentRules?featureFlagId=${flagId}`
    );
  }

  createSegmentRule(
    payload: CreateSegmentRuleRequest
  ): Observable<SegmentRuleDto> {
    return this.http.post<SegmentRuleDto>(
      `${this.baseUrl}/segmentRules`,
      payload
    );
  }
}
