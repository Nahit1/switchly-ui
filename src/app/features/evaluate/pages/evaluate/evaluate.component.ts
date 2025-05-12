import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EvaluateService } from '../../services/evaluate.service';

@Component({
  standalone: true,
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class EvaluateComponent {
  fb = new FormBuilder();
  form = this.fb.group({
    flagKey: ['', Validators.required],
    traits: this.fb.array([
      this.fb.group({
        key: ['', Validators.required],
        value: ['', Validators.required],
      }),
    ]),
  });

  result?: boolean;

  constructor(private evaluateService: EvaluateService) {}

  get traits(): FormArray {
    return this.form.get('traits') as FormArray;
  }

  addTrait() {
    this.traits.push(this.fb.group({ key: [''], value: [''] }));
  }

  removeTrait(index: number) {
    this.traits.removeAt(index);
  }

  evaluate() {
    //if (this.form.invalid) return;
    console.log(this.traits);
    const traitObject: { [key: string]: string } = {};
    for (const trait of this.traits.value) {
      if (trait.key) traitObject[trait.key] = trait.value;
    }

    const payload = {
      flagKey: this.form.value.flagKey!,
      userContextModel: {
        flagKey: this.form.value.flagKey!,
        traits: traitObject,
      },
    };

    this.evaluateService.evaluateFlag(payload).subscribe((res) => {
      this.result = res.isEnabled;
    });
  }
}
