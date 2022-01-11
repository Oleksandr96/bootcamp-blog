import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';

const materialModules = [
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatProgressBarModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatTabsModule,
];

@NgModule({
  declarations: [],
  imports: [materialModules],
  exports: [materialModules],
})
export class MaterialModule {}
