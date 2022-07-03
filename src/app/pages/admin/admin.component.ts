import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  page: number = 1;
  prevPage: boolean = false;
  nextPage: boolean = false;
  updatePack: any = {};

  constructor(private db: DatabaseService) { }

  prices: any = {};

  ngOnInit(): void {
    this.disabledPagintion()
    this.getPrices()
  }

  getPrices(){
    this.db.getPrices()
    .subscribe(data => this.prices = data)
  }

  turnPage(page: number){
    this.page += page
    this.disabledPagintion()
  }

  disabledPagintion(){
    this.page === 1 ? this.prevPage = true : this.prevPage = false;
    this.page === 3 ? this.nextPage = true : this.nextPage = false;
  }

}
