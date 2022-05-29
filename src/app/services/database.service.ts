import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

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
    banner:{
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

  orders: any[] = [

  ]

  constructor() { }

  getPrice(material: any){
    return this.price[material]
  }

  postOrder(order: any){
    this.orders.push(order)
    console.log(this.orders)
  }

}
