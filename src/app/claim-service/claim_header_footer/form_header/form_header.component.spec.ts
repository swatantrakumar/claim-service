/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Form_headerComponent } from './form_header.component';

describe('Form_headerComponent', () => {
  let component: Form_headerComponent;
  let fixture: ComponentFixture<Form_headerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form_headerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form_headerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
