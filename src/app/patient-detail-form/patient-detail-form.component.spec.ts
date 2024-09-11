import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailFormComponent } from './patient-detail-form.component';

describe('PatientDetailFormComponent', () => {
  let component: PatientDetailFormComponent;
  let fixture: ComponentFixture<PatientDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientDetailFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
