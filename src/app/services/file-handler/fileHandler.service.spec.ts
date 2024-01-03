/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FileHandlerService } from './fileHandler.service';

describe('Service: FileHandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileHandlerService]
    });
  });

  it('should ...', inject([FileHandlerService], (service: FileHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
