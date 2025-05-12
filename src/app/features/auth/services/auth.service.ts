import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { BaseResponse } from '../../../core/models/base-response.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:5062/api/Auth'; // backend URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<BaseResponse<{ token: string }>>(`${this.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(tap((res) => localStorage.setItem('token', res.data.token)));
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
