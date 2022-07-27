import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderComponent } from 'src/app/components/order/order.component';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class formComponent implements OnInit {

  @ViewChild('description') description: OrderComponent;

  form: FormGroup = new FormGroup({
    clientData: new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      address: new FormControl(''),
      email: new FormControl(''),
      company: new FormControl(''),
    }),
    orderData: new FormGroup({
      arrOrders: new FormArray([
        new FormGroup({
          material: new FormControl('vinyl'),
          plotter: new FormControl('print'),
          materialType: new FormControl('glossy'),
          height: new FormControl(0),
          width: new FormControl(0),
          additionalMaterial: new FormControl('justMaterial'),
          additionalService: new FormControl('justMaterial'),
          meters: new FormControl(0),
          colours: new FormControl('white'),
          thickness: new FormControl('extraSmall'),
          units: new FormControl(0),
          print: new FormControl('false'),
          partialAmount: new FormControl(0),
          lightMaterial: new FormControl('neon'),
        }),
      ]),
      description: new FormControl(''),
      finishDate: new FormControl('')
    }),
    balanceData: new FormGroup({
      total: new FormControl(0),
      subTotal: new FormControl(0),
      warranty: new FormControl(0),
      balance: new FormControl(0),
      discount: new FormControl(0),
      date: new FormControl(''),
    })
  })

  initialValue = this.form.value

  constructor(private db: DatabaseService) { }

  ngOnInit(): void {
    this.calculateAmount();
  }

  confirm() {
    this.db.postOrder(this.form.value)
      .subscribe({
        next: ()=>{},
        error: err => {console.log(err)}
      })
    this.form.reset(this.initialValue)
    this.resetOrders()
  }

  resetForm() {
    this.form.reset(this.initialValue)
    this.description.showDescription = false;
    this.resetOrders()
  }

  resetOrders() {
    let ordersLenght = this.form.get('orderData')?.get('arrOrders') as FormArray
    ordersLenght.controls.splice(1, ordersLenght.length - 1)
  }

  getData(data: any) {
    this.form.setControl('orderData', data)
    console.log();
  }

  calculateAmount() {
    this.form.valueChanges
      .subscribe(() => {
        let balanceData = this.form.get('balanceData')
        let discountControls = balanceData?.get('discount')
        let arr = (this.form.get('orderData')?.get('arrOrders') as FormArray).controls
        let totalControls = balanceData?.get('total')
        let warrantyControls = balanceData?.get('warranty')
        let balanceControls = balanceData?.get('balance')
        let subtotalAmount = 0;
        arr.forEach(order => subtotalAmount += order.get('partialAmount')?.value)
        let discount = (subtotalAmount / 100) * discountControls?.value
        balanceData?.get('subTotal')?.setValue(subtotalAmount, { emitEvent: false })
        totalControls?.setValue(subtotalAmount - discount, { emitEvent: false })
        balanceControls?.setValue(subtotalAmount - discount - warrantyControls?.value, { emitEvent: false })
      })
  }
}