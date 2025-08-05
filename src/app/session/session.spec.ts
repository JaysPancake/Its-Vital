import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { Session } from './session';
import { SessionService } from '../session.service';

describe('Session', () => {
  let component: Session;
  let fixture: ComponentFixture<Session>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Session, RouterTestingModule],
      providers: [
        SessionService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ code: 'abc' }) } } }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Session);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
