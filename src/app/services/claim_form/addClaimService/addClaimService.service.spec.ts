/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddClaimServiceService } from './addClaimService.service';

describe('Service: AddClaimService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddClaimServiceService]
    });
  });

  it('should ...', inject([AddClaimServiceService], (service: AddClaimServiceService) => {
    expect(service).toBeTruthy();
  }));
});
