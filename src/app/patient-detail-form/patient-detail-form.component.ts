import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PatientDetailService } from '../patient-detail.service';
import { PatientDetail } from '../patient-details-model';


@Component({
  selector: 'app-patient-detail-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './patient-detail-form.component.html',
  styleUrls: ['./patient-detail-form.component.css']
})
export class PatientDetailFormComponent implements OnInit {
  patientDetail: PatientDetail = {
    DetailID: 0,
    PatientID: 0,
    Diagnosis: '',
    TreatmentHistory: '',
    Medications: '',
    Allergies: '',
    Notes: ''
  };
  isEditMode = false;

  constructor(
    private patientDetailService: PatientDetailService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadPatientDetail(+id);
    }
  }

  loadPatientDetail(id: number): void {
    this.patientDetailService.getPatientDetail(id).subscribe(
      detail => this.patientDetail = detail,
      error => console.error('Error loading patient detail:', error)
    );
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.patientDetailService.updatePatientDetail(this.patientDetail).subscribe(
        () => this.router.navigate(['/patient-details']),
        error => console.error('Error updating patient detail:', error)
      );
    } else {
      this.patientDetailService.addPatientDetail(this.patientDetail).subscribe(
        () => this.router.navigate(['/patient-details']),
        error => console.error('Error adding patient detail:', error)
      );
    }
  }
}