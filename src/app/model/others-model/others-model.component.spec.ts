/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OthersModelComponent } from './others-model.component';

describe('OthersModelComponent', () => {
  let component: OthersModelComponent;
  let fixture: ComponentFixture<OthersModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
