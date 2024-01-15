/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Preview_footerComponent } from './preview_footer.component';

describe('Preview_footerComponent', () => {
  let component: Preview_footerComponent;
  let fixture: ComponentFixture<Preview_footerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Preview_footerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Preview_footerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
