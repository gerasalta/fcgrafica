import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

	form: FormGroup = new FormGroup({
		arrOrders: new FormArray([])
	});
	orders: FormArray = this.form.get('arrOrders') as FormArray;
	showDescription: boolean = false;

	get disabledDelete (){
		return this.orders.controls.length <= 1
	}

	constructor() { }

	ngOnInit(): void {
		this.addOrder();
	}

	openDescription() {
		this.showDescription === false ? this.showDescription = true : this.showDescription = false
	}

	addOrder() {
		let newOrder = new FormGroup({
			material: new FormControl('vinyl'),
			plotter: new FormControl(''),
			type: new FormControl(''),
			height: new FormControl(''),
			width: new FormControl(''),
			additionalMaterial: new FormControl(''),
			additionalService: new FormControl(''),
			description: new FormControl(''),
		});
		this.orders?.controls.push(newOrder);
	}

	deleteOrder(index: number) {
		this.orders.controls.splice(index, 1)
	}
	
}
