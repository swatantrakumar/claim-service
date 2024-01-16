/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClaimAmountWithOperationalComponent } from './claim-amount-with-operational.component';

describe('ClaimAmountWithOperationalComponent', () => {
  let component: ClaimAmountWithOperationalComponent;
  let fixture: ComponentFixture<ClaimAmountWithOperationalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimAmountWithOperationalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimAmountWithOperationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
