import { TestBed } from '@angular/core/testing';
import { PokemonHttp } from './pokemon-http';

describe('PokemonHttp', () => {
  let service: PokemonHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
