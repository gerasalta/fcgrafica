import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  
  orders: any = [];
  spinner: boolean = false;
  pagination: any[] = [];
  actualPage: number = 1;
  nextPage: boolean = false;
  prevPage: boolean = false;
  keyword: FormControl = new FormControl("");
  debt: FormControl = new FormControl();

  constructor(private db: DatabaseService) { }

  ngOnInit(): void {
    this.getOrders();
    this.sendKeyword();
  }

  getOrders(){
    this.pagination = [];
    this.spinner = true;
    this.db.getOrders(this.actualPage, this.keyword.value)
    .subscribe({
      next: (data:any) => {
        this.orders = data.docs;
        this.nextPage = data.hasNextPage;
        this.prevPage = data.hasPrevPage;  
      },
      complete: () => this.spinner = false 
      })
  }

  deleteOrder(index: number){
    this.db.deleteOrder(this.orders[index]._id)
    .subscribe({
      next: () => {this.getOrders()},
      error: err => console.log(err)
    })
  }

  turnPage(page: number){
    this.actualPage += page
    this.getOrders()
  }

  sendKeyword(){
    this.keyword.valueChanges
    .pipe(debounceTime(500))
    .subscribe((data)=>{this.getOrders()});
  }

  completeOrder(index: number){
    if(this.debt.value < this.orders[index].balanceData.balance){
      this.db.createDebotr(this.orders[index])
      .subscribe({
        next: data => this.deleteOrder(index),
        error: err => console.log(err)
      })
    }
    else{
      this.deleteOrder(index)
    }
  
  }
}
