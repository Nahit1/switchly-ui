import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagCreateDialogComponent } from './flag-create-dialog.component';

describe('FlagCreateDialogComponent', () => {
  let component: FlagCreateDialogComponent;
  let fixture: ComponentFixture<FlagCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlagCreateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlagCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
