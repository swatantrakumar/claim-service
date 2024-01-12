/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Preview_declarationComponent } from './preview_declaration.component';

describe('Preview_declarationComponent', () => {
  let component: Preview_declarationComponent;
  let fixture: ComponentFixture<Preview_declarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Preview_declarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Preview_declarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
