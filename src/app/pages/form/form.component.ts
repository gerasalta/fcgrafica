import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class formComponent implements OnInit {

 form:  FormGroup = new FormGroup({
  clientData: new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    address: new FormControl(''),
    email: new FormControl(''),
    company: new FormControl(''),
  }),
  orderData: new FormGroup({
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
    console.log(this.form.value);
  }

  getData(data: any){
    this.form.setControl('orderData', data)
    let arr = (this.form.get('orderData')?.get('arrOrders') as FormArray).controls
    let totalControl = this.form.get('balanceData')?.get('amount')
    let total = 0;
    arr.forEach(order => total += order.get('partialAmount')?.value)
    console.log(total)
    totalControl?.setValue(total)
  }

}