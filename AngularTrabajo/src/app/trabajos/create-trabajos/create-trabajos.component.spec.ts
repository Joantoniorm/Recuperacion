import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTrabajosComponent } from './create-trabajos.component';

describe('CreateTrabajosComponent', () => {
  let component: CreateTrabajosComponent;
  let fixture: ComponentFixture<CreateTrabajosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTrabajosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTrabajosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
