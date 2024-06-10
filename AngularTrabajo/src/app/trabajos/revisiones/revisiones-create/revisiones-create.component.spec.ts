import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionesCreateComponent } from './revisiones-create.component';

describe('RevisionesCreateComponent', () => {
  let component: RevisionesCreateComponent;
  let fixture: ComponentFixture<RevisionesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisionesCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevisionesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
