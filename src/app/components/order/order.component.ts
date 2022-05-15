import { Component, Input, OnInit } from '@angular/core';
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
	description: boolean = false;

	constructor() { }

	ngOnInit(): void {
		this.addOrder()
	}

	openDescription() {
		this.description === false ? this.description = true : this.description = false
	}

	addOrder() {
		let newOrder = new FormGroup({
			material: new FormControl('vinyl'),
			plotter: new FormControl(''),
			type: new FormControl(''),
			height: new FormControl(''),
			width: new FormControl(''),
			additionalMaterial: new FormControl(''),
			additionalService: new FormControl('')
		});
		this.orders?.controls.push(newOrder);
	}

}
