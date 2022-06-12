import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  orders: any[] = [];

  constructor(private db: DatabaseService) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(){
    this.orders = this.db.getOrders()
  }

}
