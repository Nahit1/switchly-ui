import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { FeatureFlagService } from '../../services/feature-flag.service';
import { FeatureFlag } from '../../models/response.model';

interface CreateFlagResult {
  name: string;
  description?: string;
  isEnabled: boolean;
}

@Component({
  standalone: true,
  selector: 'app-flag-create-dialog',
  templateUrl: './flag-create-dialog.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class FlagCreateDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(DialogRef<any>); // ✅ dönüş tipi
  private flagService = inject(FeatureFlagService);

  form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    key: [''],
  });

  save() {
    if (this.form.invalid) return;
    const model: FeatureFlag = {
      name: this.form.value.name ?? '',
      description: this.form.value.description ?? '',
      isEnabled: true,
      key: this.form.value.key ?? '',
      OrganizationId: '13359fc8-8f48-4c84-8bef-d123a595f25c',
    };
    this.flagService.create(model).subscribe({
      next: () => {
        this.dialogRef.close(this.form.value as CreateFlagResult);
      },
      error: () => {
        alert('Flag oluşturulamadı.');
      },
    });
    this.dialogRef.close(this.form.value as CreateFlagResult);
  }

  cancel() {
    this.dialogRef.close();
  }
}
