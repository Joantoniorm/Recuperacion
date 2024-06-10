import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlumnosComponent } from './create-alumnos.component';

describe('CreateAlumnosComponent', () => {
  let component: CreateAlumnosComponent;
  let fixture: ComponentFixture<CreateAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAlumnosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
