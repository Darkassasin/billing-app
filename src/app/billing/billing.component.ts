import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Submeter {
  presentRDG: number;
  previousRDG: number;
  units: number;
  subMeterAmount: number;
  actualAmount: number;
}

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
  standalone: true,
  imports: [FormsModule,CommonModule]
})
export class BillingComponent {

  rate = 10;
  numberOfSubmeters = 1;
  submeters: Submeter[] = [{ presentRDG: 0, previousRDG: 0, units: 0 , subMeterAmount: 0, actualAmount: 0}];

  totalUnits:number = 0;
  billAmount:number = 0;
  presentRDG:number = 0;
  previousRDG:number = 0;

  subMetersTotalUnits:number = 0;

  remainingUnits:number = 0;
  remainingAmount:number = 0;

  updateSubmetersCount() {
    this.numberOfSubmeters = Number(this.numberOfSubmeters);
    if (this.numberOfSubmeters < 1 || isNaN(this.numberOfSubmeters)) {
      this.numberOfSubmeters = 1;
    }

    const newSubmeters = [...this.submeters];

    while (newSubmeters.length < this.numberOfSubmeters) {
      newSubmeters.push({ presentRDG: 0, previousRDG: 0, units: 0, subMeterAmount:0, actualAmount: 0 });
    }
    while (newSubmeters.length > this.numberOfSubmeters) {
      newSubmeters.pop();
    }

    this.submeters = newSubmeters;
    this.calculate();
  }

  calculate() {
    this.subMetersTotalUnits = 0;
    for (const submeter of this.submeters) {
      submeter.units = submeter.presentRDG - submeter.previousRDG;
      this.subMetersTotalUnits += submeter.units;
      if (submeter.units < 0) {
        submeter.units = 0;
      }
    
      submeter.subMeterAmount = submeter.units * this.rate;
    }
  }

  calculateTotalUnits() {
    this.totalUnits = this.presentRDG - this.previousRDG;
    this.billAmount = this.totalUnits * this.rate
  }

  calculateTotals(){
    
    this.remainingUnits =  this. totalUnits - this.subMetersTotalUnits;
    this.remainingAmount = this.remainingUnits * this.rate
    for (const submeter of this.submeters) {
      submeter.actualAmount = submeter.subMeterAmount + this.remainingAmount/this.numberOfSubmeters;
    }
    if (this.remainingUnits < 0) {
      this.remainingUnits = 0;
    }

    if (this.remainingAmount < 0) {
      this.remainingAmount = 0;
    }

    this.remainingUnits =  this. totalUnits - this.subMetersTotalUnits;
    this.remainingAmount = this.remainingUnits * this.rate
  }
}