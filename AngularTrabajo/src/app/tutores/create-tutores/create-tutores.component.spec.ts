import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTutoresComponent } from './create-tutores.component';

describe('CreateTutoresComponent', () => {
  let component: CreateTutoresComponent;
  let fixture: ComponentFixture<CreateTutoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTutoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
