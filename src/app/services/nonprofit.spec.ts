import { TestBed } from '@angular/core/testing';



import { NonprofitService } from './nonprofit.service';


describe('Nonprofit', () => {
  let service: NonprofitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonprofitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
