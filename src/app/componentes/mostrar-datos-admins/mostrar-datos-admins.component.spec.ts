import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarDatosAdminsComponent } from './mostrar-datos-admins.component';

describe('MostrarDatosAdminsComponent', () => {
  let component: MostrarDatosAdminsComponent;
  let fixture: ComponentFixture<MostrarDatosAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarDatosAdminsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarDatosAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
