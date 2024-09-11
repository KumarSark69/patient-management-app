import { Routes } from '@angular/router';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientDetailFormComponent } from './patient-detail-form/patient-detail-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/patient-details', pathMatch: 'full' },
  { path: 'patient-details', component: PatientDetailsComponent },
  { path: 'add-patient-detail', component: PatientDetailFormComponent },
  { path: 'edit-patient-detail/:id', component: PatientDetailFormComponent }
];