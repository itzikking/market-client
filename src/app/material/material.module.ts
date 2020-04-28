import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatMenuModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatStepperModule,
  MatGridListModule,
  MatSelectModule,
  MatSidenavModule,
  MatIconModule,
  MatExpansionModule,
  MatProgressBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatSnackBarModule,
} from "@angular/material";

const MaterialComponents = [
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatMenuModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatStepperModule,
  MatGridListModule,
  MatSelectModule,
  MatSidenavModule,
  MatIconModule,
  MatExpansionModule,
  MatProgressBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatSnackBarModule,
];


@NgModule({
  declarations: [],
  imports: [MaterialComponents, CommonModule],
  exports: [MaterialComponents]
})
export class MaterialModule { }
