/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClaimFormSubmitModelComponent } from './claim-form-submit-model.component';

describe('ClaimFormSubmitModelComponent', () => {
  let component: ClaimFormSubmitModelComponent;
  let fixture: ComponentFixture<ClaimFormSubmitModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimFormSubmitModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimFormSubmitModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
