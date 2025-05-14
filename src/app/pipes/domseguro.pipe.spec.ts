import { DomseguroPipe } from './domseguro.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';

describe('DomseguroPipe', () => {
  let pipe: DomseguroPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    const sanitizer = TestBed.inject(DomSanitizer);
    pipe = new DomseguroPipe(sanitizer);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
