import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Angular Material Components
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
// import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
// import { MatTabsModule } from '@angular/material/tabs';
// import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatStepperModule } from '@angular/material/stepper';

const modules = [  
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatDividerModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressBarModule,
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule,
  // MatSlideToggleModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  // MatRadioModule,
  MatCardModule,
  // MatTabsModule,
  // MatChipsModule,
  MatExpansionModule,
  // MatProgressSpinnerModule,
  // MatGridListModule,
  MatTooltipModule,
  // MatMenuModule,
  // MatCheckboxModule,
  MatSnackBarModule,
  // MatStepperModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modules,
  ],
  exports: [ modules ]
})
export class MaterialModule { }
