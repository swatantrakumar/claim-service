/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Form_c_bodyComponent } from './form_c_body.component';

describe('Form_c_bodyComponent', () => {
  let component: Form_c_bodyComponent;
  let fixture: ComponentFixture<Form_c_bodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form_c_bodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form_c_bodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
