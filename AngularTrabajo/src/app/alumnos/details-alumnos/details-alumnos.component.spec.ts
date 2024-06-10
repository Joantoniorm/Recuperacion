import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAlumnosComponent } from './details-alumnos.component';

describe('DetailsAlumnosComponent', () => {
  let component: DetailsAlumnosComponent;
  let fixture: ComponentFixture<DetailsAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsAlumnosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
