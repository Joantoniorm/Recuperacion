import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionesUpdateComponent } from './revisiones-update.component';

describe('RevisionesUpdateComponent', () => {
  let component: RevisionesUpdateComponent;
  let fixture: ComponentFixture<RevisionesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisionesUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevisionesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
