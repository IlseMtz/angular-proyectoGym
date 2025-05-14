import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjerciciosApiComponent } from './ejercicios-api.component';

describe('EjerciciosApiComponent', () => {
  let component: EjerciciosApiComponent;
  let fixture: ComponentFixture<EjerciciosApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EjerciciosApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjerciciosApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
