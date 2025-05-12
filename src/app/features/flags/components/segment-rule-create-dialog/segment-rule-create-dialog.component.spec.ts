import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentRuleCreateDialogComponent } from './segment-rule-create-dialog.component';

describe('SegmentRuleCreateDialogComponent', () => {
  let component: SegmentRuleCreateDialogComponent;
  let fixture: ComponentFixture<SegmentRuleCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentRuleCreateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegmentRuleCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
