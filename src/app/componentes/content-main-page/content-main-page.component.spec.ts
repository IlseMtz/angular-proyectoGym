import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentMainPageComponent } from './content-main-page.component';

describe('ContentMainPageComponent', () => {
  let component: ContentMainPageComponent;
  let fixture: ComponentFixture<ContentMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentMainPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
