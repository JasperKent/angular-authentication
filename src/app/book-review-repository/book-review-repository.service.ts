import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookReview } from '../DTOs/book-review';
import { environment } from 'src/environments/environment';

@Injectable()
export class BookReviewRepositoryService {

  constructor(private httpClient: HttpClient) { }

  getReviews(): Observable<BookReview[]>{
    return this.httpClient.get<BookReview[]>(`${environment.serverUrl}/api/BookReviews`);
  }

  getSummary(): Observable<BookReview[]>{
    return this.httpClient.get<BookReview[]>(`${environment.serverUrl}/api/BookReviews/Summary`);
  }
}
