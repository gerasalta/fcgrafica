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
  material: FormControl = new FormControl('vinyl');
  service: FormControl = new FormControl('print');
  newPrice: FormControl = new FormControl(0);
  updatePack: string = "";
  prices: any = [];
  materials: any = [];

  constructor(private db: DatabaseService) { }

  ngOnInit(): void {
    this.getPrices()
  }

  getPrices() {
    this.prices.length = 0;
    this.db.getPrices()
      .subscribe({
        next: (data:any) => {
          delete data._id
          this.materials = Object.keys(data);
          this.materials.forEach((material) => {
            let services = Object.keys(data[material])
            let objServices = {service: [], name: material}
            services.forEach(service => {objServices.service.push(data[material][service])})
            this.prices.push(objServices)
          });
        },
        error: err => console.log(err),
        complete: ()=>{this.spinner = false}
      })
  }

  updatePrice() {
    this.spinner = true;
    this.updatePack = `{"${this.material.value}.${this.service.value}.price":${this.newPrice.value}}`;
    this.db.updatePrice(this.updatePack)
      .subscribe({
        next: (data) => { this.getPrices(); console.log(data)},
        error: err => console.log(err),
        complete: () => { this.spinner = false }
      })
  }
}
