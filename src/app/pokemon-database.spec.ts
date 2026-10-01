import { TestBed } from '@angular/core/testing';
import { PokemonDatabase } from './pokemon-database';

describe('PokemonDatabase', () => {
  let service: PokemonDatabase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonDatabase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
