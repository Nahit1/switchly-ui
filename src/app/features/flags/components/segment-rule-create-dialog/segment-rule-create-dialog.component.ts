import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { SegmentRuleService } from '../../services/segment-rule.service';
import { CreateSegmentRuleRequest } from '../../models/request.model';

@Component({
  standalone: true,
  selector: 'app-segment-rule-create-dialog',
  templateUrl: './segment-rule-create-dialog.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class SegmentRuleCreateDialogComponent {
  private fb = inject(FormBuilder);
  form = this.fb.group({
    property: ['', Validators.required],
    operator: ['', Validators.required],
    value: ['', Validators.required],
    rolloutPercentage: [100],
    order: [0],
  });

  constructor(
    private segmentRuleService: SegmentRuleService,
    private dialogRef: DialogRef<unknown>,
    @Inject(DIALOG_DATA) public data: { flagId: string }
  ) {}

  submit() {
    if (this.form.invalid) return;

    const payload: CreateSegmentRuleRequest = {
      featureFlagId: this.data.flagId,
      property: this.form.value.property!,
      operator: this.form.value.operator!,
      value: this.form.value.value!,
      rolloutPercentage: this.form.value.rolloutPercentage ?? 100,
      order: this.form.value.order ?? 0,
    };

    this.segmentRuleService.createSegmentRule(payload).subscribe(() => {
      this.dialogRef.close(true); // true → başarıyla eklendi
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
