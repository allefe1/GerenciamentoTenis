import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sneaker } from '../models/sneaker.model';

@Injectable({
  providedIn: 'root'
})
export class SneakerService {
  private apiUrl = 'http://localhost:3000/sneakers';

  constructor(private http: HttpClient) {}

  getSneakers(page: number, limit: number, search?: string): Observable<Sneaker[]> {
    let params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', limit.toString());

    if (search) {
      params = params.set('q', search);
    }

    return this.http.get<Sneaker[]>(this.apiUrl, { params });
  }

  createSneaker(sneaker: Sneaker): Observable<Sneaker> {
    return this.http.post<Sneaker>(this.apiUrl, sneaker);
  }

  updateSneaker(id: number, sneaker: Sneaker): Observable<Sneaker> {
    return this.http.put<Sneaker>(`${this.apiUrl}/${id}`, sneaker);
  }

  deleteSneaker(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}