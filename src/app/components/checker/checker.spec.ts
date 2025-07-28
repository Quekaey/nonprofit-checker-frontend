import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CheckerComponent } from './checker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NonprofitService } from '../../services/nonprofit.service';
import { of, throwError } from 'rxjs';

describe('CheckerComponent', () => {
  let component: CheckerComponent;
  let fixture: ComponentFixture<CheckerComponent>;
  let svc: jasmine.SpyObj<NonprofitService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('NonprofitService', ['checkByEin']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [CheckerComponent],
      providers: [{ provide: NonprofitService, useValue: spy }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CheckerComponent);
        component = fixture.componentInstance;
        svc = TestBed.inject(
          NonprofitService
        ) as jasmine.SpyObj<NonprofitService>;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form invalid when empty', () => {
    component.form.setValue({ ein: '', name: '' });
    expect(component.form.invalid).toBeTrue();
  });

  it('should call service on valid EIN submit', () => {
    const mockResponse = { data: { name: 'Test Org' }, history: [] };
    svc.checkByEin.and.returnValue(of(mockResponse));

    component.form.setValue({ ein: '123456789', name: '' });
    component.submit();

    expect(svc.checkByEin).toHaveBeenCalledWith('123456789');
    expect(component.data).toEqual(mockResponse.data);
    expect(component.history).toEqual(mockResponse.history);
    expect(component.loading).toBeFalse();
  });

  it('should handle service error', () => {
    svc.checkByEin.and.returnValue(
      throwError(() => ({ error: { error: 'Not Found' } }))
    );

    component.form.setValue({ ein: '000000000', name: '' });
    component.submit();

    expect(component.error).toBe('Not Found');
    expect(component.loading).toBeFalse();
  });
});
