import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCollectionDetail } from './pokemon-collection-detail';

describe('PokemonCollectionDetail', () => {
  let component: PokemonCollectionDetail;
  let fixture: ComponentFixture<PokemonCollectionDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCollectionDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCollectionDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
