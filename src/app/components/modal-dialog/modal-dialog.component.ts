import { Component, inject, Inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PeriodicElement } from '../../models/periodic-element';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-modal-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    TranslateModule,
  ],

  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.scss',
})
export class ModalDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ModalDialogComponent>);
  readonly data = inject<PeriodicElement>(MAT_DIALOG_DATA);
  readonly element = model(this.data);

  updateElement() {
    console.log('update', this.element);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
