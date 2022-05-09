import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class formComponent implements OnInit {

 orderData:  FormGroup = new FormGroup({
  clientData: new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    address: new FormControl(''),
    email: new FormControl(''),
    company: new FormControl(''),
  }),
  balanceData: new FormGroup({
    amount: new FormControl('',Validators.required),
    warranty: new FormControl('',Validators.required),
    balance: new FormControl('',Validators.required),
  })
 }) 

  constructor() { }

  ngOnInit(): void {
  }

  sendData(){
    console.log(this.orderData.value);
  }


}
