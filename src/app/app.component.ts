import { Component } from '@angular/core';
import { BillingComponent } from './billing/billing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BillingComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { }