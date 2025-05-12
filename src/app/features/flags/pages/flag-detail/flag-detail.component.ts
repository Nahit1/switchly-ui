import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SegmentRuleService } from '../../services/segment-rule.service';
import { SegmentRuleDto } from '../../models/response.model';

@Component({
  standalone: true,
  selector: 'app-flag-detail',
  templateUrl: './flag-detail.component.html',
  imports: [CommonModule],
})
export class FlagDetailComponent implements OnInit {
  flagId!: string;
  rules: SegmentRuleDto[] = [];

  constructor(
    private route: ActivatedRoute,
    private segmentRuleService: SegmentRuleService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.flagId = id;
        this.loadRules();
      }
    });
  }

  loadRules() {
    this.segmentRuleService.getSegmentRules(this.flagId).subscribe((rules) => {
      this.rules = rules;
    });
  }
}
