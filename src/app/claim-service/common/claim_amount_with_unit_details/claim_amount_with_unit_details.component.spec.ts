/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Claim_amount_with_unit_detailsComponent } from './claim_amount_with_unit_details.component';

describe('Claim_amount_with_unit_detailsComponent', () => {
  let component: Claim_amount_with_unit_detailsComponent;
  let fixture: ComponentFixture<Claim_amount_with_unit_detailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Claim_amount_with_unit_detailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Claim_amount_with_unit_detailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
