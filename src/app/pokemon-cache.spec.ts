import { TestBed } from '@angular/core/testing';
import { PokemonCache } from './pokemon-cache';

describe('PokemonCache', () => {
  let service: PokemonCache;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonCache);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
