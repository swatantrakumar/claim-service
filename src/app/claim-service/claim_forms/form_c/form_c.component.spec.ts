/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Form_cComponent } from './form_c.component';

describe('Form_cComponent', () => {
  let component: Form_cComponent;
  let fixture: ComponentFixture<Form_cComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form_cComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form_cComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
