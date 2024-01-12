/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Preview_bodyComponent } from './preview_body.component';

describe('Preview_bodyComponent', () => {
  let component: Preview_bodyComponent;
  let fixture: ComponentFixture<Preview_bodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Preview_bodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Preview_bodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
