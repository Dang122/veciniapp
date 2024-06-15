/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IncidenciasService } from './incidencias.service';

describe('Service: Incidencias', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncidenciasService]
    });
  });

  it('should ...', inject([IncidenciasService], (service: IncidenciasService) => {
    expect(service).toBeTruthy();
  }));
});
