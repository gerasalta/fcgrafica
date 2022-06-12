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

  orders: any[] = [
    {
      "clientData":
        { "name": "Gera", "lastName": "Gutierrez", "phone": "3875335055", "address": "Buenos Aires 418", "email": "geragutierrezsalta@gmail.com", "company": "Fc Grafica" }
      , "balanceData": { "total": 4200, "subTotal": 4200, "warranty": 0, "balance": 4200, "discount": 0 }
      , "orderData":
      {
        "arrOrders": [
          { "material": "vinyl", "plotter": "print", "materialType": "glossy", "height": "2", "width": "1", "additionalMaterial": "justMaterial", "additionalService": "justMaterial", "meters": 0, "colours": "white", "thickness": 20, "units": 0, "print": "false", "partialAmount": 4200, "lightMaterial": "neon" }
        ],
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    },
    {
      "clientData":
        { "name": "Nacho", "lastName": "Patypus", "phone": "3874116061", "address": "B° Limache Block 43 Depto 4", "email": "nachopatypus@gmail.com", "company": "Agente P" },
      "balanceData": { "total": 34200, "subTotal": 34200, "warranty": "5000", "balance": 29200, "discount": 0 },
      "orderData": {
        "arrOrders": [
          { "material": "vinyl", "plotter": "print", "materialType": "glossy", "height": "2", "width": "1", "additionalMaterial": "justMaterial", "additionalService": "justMaterial", "meters": 0, "colours": "white", "thickness": 20, "units": 0, "print": "false", "partialAmount": 4200, "lightMaterial": "neon" },
          { "material": "banner", "plotter": "print", "materialType": "glossy", "height": "3", "width": "3", "additionalMaterial": "justMaterial", "additionalService": "justMaterial", "meters": 0, "colours": "white", "thickness": 20, "units": 0, "print": "false", "partialAmount": 18000, "lightMaterial": "neon" },
          { "material": "light", "plotter": "print", "materialType": "glossy", "height": 0, "width": 0, "additionalMaterial": "justMaterial", "additionalService": "justMaterial", "meters": "6", "colours": "blue", "thickness": 20, "units": 0, "print": "false", "partialAmount": 12000, "lightMaterial": "neon" }
        ],
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    },
    {
      "clientData":
        { "name": "Lola", "lastName": "Patypus", "phone": "4244107", "address": "B° Limache Block 43 Dpto 4", "email": "lolapatypus@gmail.com", "company": "Agente P" },
      "balanceData": { "total": 13000, "subTotal": 13000, "warranty": "2000", "balance": 11000, "discount": 0 },
      "orderData":
      {
        "arrOrders": [
          { "material": "polyfan", "plotter": "print", "materialType": "glossy", "height": 0, "width": 0, "additionalMaterial": "print", "additionalService": "install", "meters": 0, "colours": "white", "thickness": 20, "units": "2", "print": "false", "partialAmount": 13000, "lightMaterial": "neon" }
        ],
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    }
  ]

  constructor() { }

  getPrice(material: any) {
    return this.price[material]
  }

  postOrder(order: any) {
    this.orders.push(order)
    console.log(JSON.stringify(this.orders))
  }

  getOrders() {
    return this.orders
  }

}
