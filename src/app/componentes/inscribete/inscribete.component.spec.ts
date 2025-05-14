import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscribeteComponent } from './inscribete.component';

describe('InscribeteComponent', () => {
  let component: InscribeteComponent;
  let fixture: ComponentFixture<InscribeteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscribeteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscribeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
