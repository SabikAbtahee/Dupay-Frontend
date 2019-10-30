import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-merchant-notification',
  templateUrl: './merchant-notification.component.html',
  styleUrls: ['./merchant-notification.component.scss']
})
export class MerchantNotificationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export interface MerchantNotification {
  date: string;
  id: string;
  message: string;
  description: string;
}

const NOTIFICATION_DATA: MerchantNotification[] = [
  {
    date: '1',
    id: '123456789',
    message: 'dummy text',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
   date: '1',
    id: '123456789',
    message: 'dummy text',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    date: '1',
    id: '123456789',
    message: 'dummy text',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    date: '1',
    id: '123456789',
    message: 'dummy text',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    date: '1',
    id: '123456789',
    message: 'dummy text',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
     date: '1',
    id: '123456789',
    message: 'dummy text',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
   date: '1',
    id: '123456789',
    message: 'dummy text',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    date: '1',
    id: '123456789',
    message: 'dummy text',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    date: '1',
    id: '123456789',
    message: 'dummy text',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
  
    date: '1',
    id: '123456789',
    message: 'dummy text',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }

];