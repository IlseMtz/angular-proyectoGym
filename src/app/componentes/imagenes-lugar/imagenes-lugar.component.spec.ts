import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenesLugarComponent } from './imagenes-lugar.component';

describe('ImagenesLugarComponent', () => {
  let component: ImagenesLugarComponent;
  let fixture: ComponentFixture<ImagenesLugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagenesLugarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagenesLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
