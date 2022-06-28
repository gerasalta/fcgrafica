import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  orders: any = [];
  spinner: boolean = false;
  pagination: any[] = [];
  actualPage: number = 1;
  nextPage: boolean = false;
  prevPage: boolean = false;
  keyword: FormControl = new FormControl("");

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
      next: data => {this.getOrders()}
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

}
