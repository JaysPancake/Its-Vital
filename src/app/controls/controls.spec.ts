import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { Controls } from './controls';
import { SessionService } from '../session.service';

describe('Controls', () => {
  let component: Controls;
  let fixture: ComponentFixture<Controls>;

  beforeEach(async () => {
    localStorage.clear();
    localStorage.setItem('session-abc', '');

    await TestBed.configureTestingModule({
      imports: [Controls, RouterTestingModule],
      providers: [
        SessionService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ code: 'abc' }) } } }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Controls);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
