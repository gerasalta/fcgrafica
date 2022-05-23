import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  price: any = {
    cut: 2000,
    print: 2000,
    mix: 4000,
    glossy: 0,
    frosted: 200,
    perforated: 200,
    justMaterial: 0,
    install: 200,
    removeInstall: 400,
    yes: 0
  }

  constructor() { }

  getPrice(){
    return this.price
  }

}
