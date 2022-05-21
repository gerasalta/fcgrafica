import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

	@Output() emitter = new EventEmitter();
	form: FormGroup = new FormGroup({
		arrOrders: new FormArray([]),
		description: new FormControl('')
	});
	orders: FormArray = this.form.get('arrOrders') as FormArray;
	showDescription: boolean = false;

	get disabledDelete (){
		return this.orders.controls.length <= 1
	}

	constructor() { }

	ngOnInit(): void {
		this.addOrder();
		this.send();
	}

	openDescription() {
		this.showDescription === false ? this.showDescription = true : this.showDescription = false
	}

	addOrder() {
		let newOrder = new FormGroup({
			material: new FormControl('vinyl', [Validators.required]),
			plotter: new FormControl(''),
			materialType: new FormControl(''),
			height: new FormControl(''),
			width: new FormControl(''),
			additionalMaterial: new FormControl(''),
			additionalService: new FormControl(''),
			meters: new FormControl(''),
			colours: new FormControl(''),
			clientType: new FormControl(''),
			thickness: new FormControl(''),
			units: new FormControl(''),
			print: new FormControl(''),
		});
		this.orders?.push(newOrder);
	}

	deleteOrder(index: number) {
		this.orders.controls.splice(index, 1)
	}

	send(){
		this.emitter.emit(this.form)
		this.orders.valueChanges
		.subscribe(data => this.emitter.emit(this.form))
	}
	
}
