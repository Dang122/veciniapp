/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EspaciosService } from './espacios.service';

describe('Service: Espacios', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EspaciosService]
    });
  });

  it('should ...', inject([EspaciosService], (service: EspaciosService) => {
    expect(service).toBeTruthy();
  }));
});
