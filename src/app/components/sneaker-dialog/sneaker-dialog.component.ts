import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Sneaker } from '../../models/sneaker.model';

@Component({
  selector: 'app-sneaker-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Editar' : 'Novo' }} Item</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <mat-form-field class="full-width">
          <mat-label>Cliente</mat-label>
          <input matInput formControlName="customer" required>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Nome do Produto</mat-label>
          <input matInput formControlName="name" required>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Preço</mat-label>
          <input matInput type="number" formControlName="price" required>
        </mat-form-field>

        <mat-form-field class="full-width">
          <mat-label>Status</mat-label>
          <mat-select formControlName="status" required>
            <mat-option value="Completed">Completed</mat-option>
            <mat-option value="Pending">Pending</mat-option>
            <mat-option value="Cancelled">Cancelled</mat-option>
          </mat-select>
        </mat-form-field>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button type="button" (click)="onCancel()">Cancelar</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
          {{ data ? 'Atualizar' : 'Criar' }}
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: ['.full-width { width: 100%; margin-bottom: 15px; }']
})
export class SneakerDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SneakerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sneaker | null
  ) {
    this.form = this.fb.group({
      customer: [data?.customer || '', Validators.required],
      name: [data?.name || '', Validators.required],
      price: [data?.price || '', Validators.required],
      status: [data?.status || 'Pending', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}