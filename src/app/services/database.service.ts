import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  apiUrl: string = 'https://fc-grafica.herokuapp.com/api/orders'
  pageNumber: number = 1;
  limit: number = 8;

  price: any = {
    vinyl: {
      cut: 100,
      print: 100,
      mix: 2000,
      glossy: 2000,
      mate: 2200,
      perforated: 2200,
      frosted: 2200,
      install: 100,
      removeInstall: 200,
      justMaterial: 0
    },
    banner: {
      tensioner: 2080,
      doubleTensioner: 2580,
      rollUp: 3580,
      glossy: 2000,
      mate: 2200,
      back: 2500,
      install: 100,
      justMaterial: 0,
      removeInstall: 200,
      eyelets: 150,
      hangingBanner: 100,
      structuralIron: 3500,
      bright: 12000
    },
    light: {
      neon: 2000,
      led: 2000
    },
    polyfan: {
      20: 2500,
      25: 2800,
      30: 3000,
      print: 2000,
      install: 2000,
      justMaterial: 0
    }
  }

  constructor(private http: HttpClient) { }

  getPrice(material: any) {
    return this.price[material]
  }

  postOrder(order: any) {
    return this.http.post(this.apiUrl, order)
  }

  getOrders(pageNumber: number) {
    this.pageNumber = pageNumber
    return this.http.get(`${this.apiUrl}?page=${this.pageNumber}&limit=${this.limit}`)
  }

  deleteOrder(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

}
