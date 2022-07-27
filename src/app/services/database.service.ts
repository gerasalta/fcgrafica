import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  apiUrl: string = 'https://backend-fc.herokuapp.com/api'
  pageNumber: number = 1;
  limit: number = 8;
  
  constructor(private http: HttpClient) { }

  getPrices(){
    return this.http.get(`${this.apiUrl}/prices`)
  }

  postOrder(order: any) {
    return this.http.post(`${this.apiUrl}/orders`, order)
  }

  getOrders(pageNumber: number, keyword: string) {
    this.pageNumber = pageNumber
    return this.http.get(`${this.apiUrl}/orders?page=${this.pageNumber}&limit=${this.limit}&keyword=${keyword}`)
  }

  deleteOrder(id: string) {
    return this.http.delete(`${this.apiUrl}/orders/${id}`)
  }

  updatePrice(updatePack: string){
    return this.http.put(`${this.apiUrl}/prices`, JSON.parse(updatePack))
  }

  createDebotr(order: any){
    return this.http.put(`${this.apiUrl}/debtors`, order)
  }
  
}
