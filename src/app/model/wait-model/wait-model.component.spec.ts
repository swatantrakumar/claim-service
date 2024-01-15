/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WaitModelComponent } from './wait-model.component';

describe('WaitModelComponent', () => {
  let component: WaitModelComponent;
  let fixture: ComponentFixture<WaitModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
