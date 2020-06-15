/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EscalaService } from './escala.service';

describe('Service: Escala', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EscalaService]
    });
  });

  it('should ...', inject([EscalaService], (service: EscalaService) => {
    expect(service).toBeTruthy();
  }));
});
