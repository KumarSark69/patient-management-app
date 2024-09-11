import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PatientDetailService } from '../patient-detail.service';
import { PatientDetail } from '../patient-details-model';


@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  patientDetails: PatientDetail[] = [];
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  Math = Math;
  isLoading = false;
  error: string | null = null;

  constructor(
    private patientDetailService: PatientDetailService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPatientDetails();
  }

  loadPatientDetails(): void {
    this.isLoading = true;
    this.error = null;
    this.patientDetailService.getPatientDetails().subscribe({
      next: (details: PatientDetail[]) => {
        this.patientDetails = details;
        this.totalItems = details.length;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching patient details:', error);
        this.error = 'Failed to load patient details. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  get paginatedPatientDetails(): PatientDetail[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.patientDetails.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  editPatientDetail(id: number): void {
    this.router.navigate(['/edit-patient-detail', id]);
  }

  deletePatientDetail(id: number): void {
    this.patientDetailService.deletePatientDetail(id).subscribe({
      next: () => {
        this.patientDetails = this.patientDetails.filter(detail => detail.DetailID !== id);
        this.totalItems--;
      },
      error: (error) => {
        console.error('Error deleting patient detail:', error);
        // Handle error (e.g., show an error message to the user)
      }
    });
  }
}