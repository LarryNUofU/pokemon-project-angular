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

});
