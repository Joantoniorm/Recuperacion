import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTrabajosComponent } from './update-trabajos.component';

describe('UpdateTrabajosComponent', () => {
  let component: UpdateTrabajosComponent;
  let fixture: ComponentFixture<UpdateTrabajosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTrabajosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateTrabajosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
