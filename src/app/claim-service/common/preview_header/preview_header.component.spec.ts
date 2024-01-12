/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Preview_headerComponent } from './preview_header.component';

describe('Preview_headerComponent', () => {
  let component: Preview_headerComponent;
  let fixture: ComponentFixture<Preview_headerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Preview_headerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Preview_headerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
