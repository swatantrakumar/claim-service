/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeleteRecordService } from './deleteRecord.service';

describe('Service: DeleteRecord', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeleteRecordService]
    });
  });

  it('should ...', inject([DeleteRecordService], (service: DeleteRecordService) => {
    expect(service).toBeTruthy();
  }));
});
