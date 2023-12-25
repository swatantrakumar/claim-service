/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Form_caComponent } from './form_ca.component';

describe('Form_caComponent', () => {
  let component: Form_caComponent;
  let fixture: ComponentFixture<Form_caComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form_caComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form_caComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
