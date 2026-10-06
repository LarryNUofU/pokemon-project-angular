import { TestBed } from '@angular/core/testing';
import { PageClickService } from './page-click-service';

describe('PageClickService', () => {
  let service: PageClickService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageClickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
