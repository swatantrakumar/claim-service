/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Form_footerComponent } from './form_footer.component';

describe('Form_footerComponent', () => {
  let component: Form_footerComponent;
  let fixture: ComponentFixture<Form_footerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form_footerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form_footerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
