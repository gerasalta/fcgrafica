import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderType: any = 'vinyl'
  description: boolean = false


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  openDescription(){
    this.description === false ? this.description = true : this.description = false
  }
  
}
