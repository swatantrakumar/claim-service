/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Claim_amount_with_bank_nbfcComponent } from './claim_amount_with_bank_nbfc.component';

describe('Claim_amount_with_bank_nbfcComponent', () => {
  let component: Claim_amount_with_bank_nbfcComponent;
  let fixture: ComponentFixture<Claim_amount_with_bank_nbfcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Claim_amount_with_bank_nbfcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Claim_amount_with_bank_nbfcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
