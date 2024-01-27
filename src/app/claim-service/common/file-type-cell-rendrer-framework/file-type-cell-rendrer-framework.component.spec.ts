/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FileTypeCellRendrerFrameworkComponent } from './file-type-cell-rendrer-framework.component';

describe('FileTypeCellRendrerFrameworkComponent', () => {
  let component: FileTypeCellRendrerFrameworkComponent;
  let fixture: ComponentFixture<FileTypeCellRendrerFrameworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileTypeCellRendrerFrameworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileTypeCellRendrerFrameworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
