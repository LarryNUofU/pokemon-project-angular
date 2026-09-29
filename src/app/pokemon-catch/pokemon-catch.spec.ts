import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCatch } from './pokemon-catch';

describe('PokemonCatch', () => {
  let component: PokemonCatch;
  let fixture: ComponentFixture<PokemonCatch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCatch],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCatch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
