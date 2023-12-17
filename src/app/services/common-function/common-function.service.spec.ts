/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommonFunctionService } from './common-function.service';

describe('Service: CommonFunction', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonFunctionService]
    });
  });

  it('should ...', inject([CommonFunctionService], (service: CommonFunctionService) => {
    expect(service).toBeTruthy();
  }));
});
