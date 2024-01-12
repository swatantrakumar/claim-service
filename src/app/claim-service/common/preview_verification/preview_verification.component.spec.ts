/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Preview_verificationComponent } from './preview_verification.component';

describe('Preview_verificationComponent', () => {
  let component: Preview_verificationComponent;
  let fixture: ComponentFixture<Preview_verificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Preview_verificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Preview_verificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
