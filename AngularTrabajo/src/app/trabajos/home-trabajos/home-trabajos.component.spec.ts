import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTrabajosComponent } from './home-trabajos.component';

describe('HomeTrabajosComponent', () => {
  let component: HomeTrabajosComponent;
  let fixture: ComponentFixture<HomeTrabajosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTrabajosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeTrabajosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
