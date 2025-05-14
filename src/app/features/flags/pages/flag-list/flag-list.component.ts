import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { FlagCreateDialogComponent } from '../../components/flag-create-dialog/flag-create-dialog.component';
import { FeatureFlagService } from '../../services/feature-flag.service';
import { FeatureFlag, GetFeatureFlag } from '../../models/response.model';

import { Router } from '@angular/router';
import { SegmentRuleCreateDialogComponent } from '../../components/segment-rule-create-dialog/segment-rule-create-dialog.component';
import { EvaluateService } from '../../../evaluate/services/evaluate.service';

interface FlagModel {
  name: string;
  enabled: boolean;
}

interface CreateFlagDto {
  name: string;
  description?: string;
  isEnabled: boolean;
}

@Component({
  standalone: true,
  selector: 'app-flag-list',
  templateUrl: './flag-list.component.html',
  imports: [CommonModule, DialogModule],
})
export class FlagListComponent {
  flags: GetFeatureFlag[] = [];

  private dialog = inject(Dialog);
  private flagService = inject(FeatureFlagService);
  private evaluateService = inject(EvaluateService);
  private router = inject(Router);

  ngOnInit() {
    this.loadFlags();
  }

  loadFlags() {
    this.flagService.getAll().subscribe((res) => (this.flags = res.data));
  }

  openCreateDialog() {
    this.dialog
      .open<CreateFlagDto>(FlagCreateDialogComponent)
      .closed.subscribe((result) => {
        if (result) {
          console.log(result);
        }
      });
  }

  evaluate(model: GetFeatureFlag) {
    const traitObject: { [key: string]: string } = {};
    for (const trait of model.featureSegments) {
      if (trait.property) traitObject[trait.property] = trait.value;
    }
    const payload = {
      flagKey: model.key,
      Env: 'dev',
      userContextModel: {
        traits: traitObject,
        Env: 'dev',
      },
    };

    this.evaluateService.evaluateFlag(payload).subscribe((res) => {
      console.log(res);
    });
  }

  openAddRuleDialog(flagId: string) {
    this.dialog
      .open(SegmentRuleCreateDialogComponent, {
        data: { flagId },
        backdropClass: 'cdk-overlay-dark-backdrop',
        panelClass: 'dialog-panel-class',
      })
      .closed.subscribe((result) => {
        if (result) {
          this.loadFlags();
        }
      });
  }
}
