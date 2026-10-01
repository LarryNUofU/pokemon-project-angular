import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonStorage } from './pokemon-storage';

describe('PokemonStorage', () => {
  let component: PokemonStorage;
  let fixture: ComponentFixture<PokemonStorage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonStorage],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonStorage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should store Pokémon IDs in a number array signal', () => {
    expect(component.items()).toEqual([]);

    component.items.set([1, 25, 150]);

    expect(component.items()).toEqual([1, 25, 150]);
  });
});
