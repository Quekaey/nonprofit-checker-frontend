import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CheckerComponent } from './checker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NonprofitService } from '../../services/nonprofit.service';
import { of, throwError } from 'rxjs';

describe('CheckerComponent (standalone)', () => {
  let fixture: ComponentFixture<CheckerComponent>;
  let component: CheckerComponent;
  let svc: jasmine.SpyObj<NonprofitService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('NonprofitService', ['checkByEin']);

    TestBed.configureTestingModule({
      imports: [CheckerComponent, ReactiveFormsModule, HttpClientTestingModule],
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
    const mock = { data: { foo: 'bar' }, history: [] };
    svc.checkByEin.and.returnValue(of(mock));

    component.form.setValue({ ein: '123', name: '' });
    component.submit();

    expect(svc.checkByEin).toHaveBeenCalledWith('123');
    expect(component.data).toEqual(mock.data);
    expect(component.history).toEqual(mock.history);
    expect(component.loading).toBeFalse();
  });
});
