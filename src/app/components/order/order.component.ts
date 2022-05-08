import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderType: any = 'vinyl'
  description: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  openDescription(){
    this.description === false ? this.description = true : this.description = false
  }

}
