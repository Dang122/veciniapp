/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResidenciasService } from './residencias.service';

describe('Service: Residencias', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResidenciasService]
    });
  });

  it('should ...', inject([ResidenciasService], (service: ResidenciasService) => {
    expect(service).toBeTruthy();
  }));
});
