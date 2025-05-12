import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  imports: [CommonModule, RouterModule, RouterOutlet],
})
export class AppLayoutComponent {}
