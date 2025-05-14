import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarDatosAdminsAuxComponent } from './mostrar-datos-admins-aux.component';

describe('MostrarDatosAdminsAuxComponent', () => {
  let component: MostrarDatosAdminsAuxComponent;
  let fixture: ComponentFixture<MostrarDatosAdminsAuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarDatosAdminsAuxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarDatosAdminsAuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
