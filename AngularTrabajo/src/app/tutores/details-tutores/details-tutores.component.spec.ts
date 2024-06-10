import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTutoresComponent } from './details-tutores.component';

describe('DetailsTutoresComponent', () => {
  let component: DetailsTutoresComponent;
  let fixture: ComponentFixture<DetailsTutoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsTutoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsTutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
