import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTrabajosComponent } from './details-trabajos.component';

describe('DetailsTrabajosComponent', () => {
  let component: DetailsTrabajosComponent;
  let fixture: ComponentFixture<DetailsTrabajosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsTrabajosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsTrabajosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
