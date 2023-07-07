import { Component } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { BookReview } from '../DTOs/book-review';
import { BookReviewRepositoryService } from '../book-review-repository/book-review-repository.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {
  reviews$?: Observable<BookReview[]>;

  errorMessage = 'Loading...';

  constructor(repository: BookReviewRepositoryService, activatedRoute: ActivatedRoute){
    activatedRoute.data.subscribe(data => {

      let reviews$: Observable<BookReview[]>;

      switch(data['style'])
      {
        case 'summary': 
          reviews$ = repository.getSummary();
          break;
        default:
          reviews$ = repository.getReviews();
          break;
      }

      this.reviews$ = reviews$.pipe(
        map(reviews => reviews.sort((l,r) => l.title.localeCompare(r.title))),
        tap (() => this.errorMessage = ''),
        catchError(err => {
          this.errorMessage = 'Failed to retrieve data.'
          return throwError(() => new Error(err.message));
        })
      );
    });
  }
}
