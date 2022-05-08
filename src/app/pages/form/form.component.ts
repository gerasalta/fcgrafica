import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class formComponent implements OnInit {

 clientData:  FormGroup = new FormGroup({
  name: new FormControl('', Validators.required),
  lastName: new FormControl('', Validators.required),
  phone: new FormControl('', (Validators.required, Validators.minLength(10))),
  email: new FormControl('', Validators.email),
  address: new FormControl(''),
  company: new FormControl(''),
 }) 

  constructor() { }

  ngOnInit(): void {
  }

  logData(){
    console.log(this.clientData.value);
  }


}
