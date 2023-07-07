import { TestBed } from '@angular/core/testing';

import { BookReviewRepositoryService } from './book-review-repository.service';

describe('BookReviewRepositoryService', () => {
  let service: BookReviewRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookReviewRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
