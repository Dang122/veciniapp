/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AnunciosService } from './anuncios.service';

describe('Service: Anuncios', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnunciosService]
    });
  });

  it('should ...', inject([AnunciosService], (service: AnunciosService) => {
    expect(service).toBeTruthy();
  }));
});
