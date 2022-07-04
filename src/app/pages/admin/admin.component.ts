import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  spinner: boolean = true;
  page: number = 1;
  prevPage: boolean = false;
  nextPage: boolean = false;
  material: FormControl = new FormControl('vinyl');
  service: FormControl = new FormControl('print');
  newPrice: FormControl = new FormControl(0);
  updatePack: string = "";

  constructor(private db: DatabaseService) { }

  prices: any = {};

  ngOnInit(): void {
    this.disabledPagintion()
    this.getPrices()
  }

  getPrices() {
    this.db.getPrices()
      .subscribe({
        next: data => this.prices = data,
        error: err => console.log(err),
        complete: ()=>{this.spinner = false}
      })
  }

  turnPage(page: number) {
    this.page += page
    this.disabledPagintion()
  }

  disabledPagintion() {
    this.page === 1 ? this.prevPage = true : this.prevPage = false;
    this.page === 3 ? this.nextPage = true : this.nextPage = false;
  }

  updatePrice() {
    this.updatePack = `{"${this.material.value}.${this.service.value}":${this.newPrice.value}}`;
    this.db.updatePrice(this.updatePack)
      .subscribe({
        next: () => { this.getPrices()},
        error: err => console.log(err),
        complete: () => { this.spinner = false }
      })
  }

}
