import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

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

	get disabledDelete() {
		return this.orders.controls.length <= 1
	}

	constructor(private db: DatabaseService) { }

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
			plotter: new FormControl('print'),
			materialType: new FormControl('glossy'),
			height: new FormControl(0),
			width: new FormControl(0),
			additionalMaterial: new FormControl('justMaterial'),
			additionalService: new FormControl('install'),
			meters: new FormControl(0),
			colours: new FormControl('white'),
			thickness: new FormControl(20),
			units: new FormControl(1),
			print: new FormControl('false'),
			partialAmount: new FormControl('')
		});
		this.orders?.push(newOrder);
	}

	calculateAmount() {
		let arr = this.orders.controls
		for (let order of arr){
			if (order.get('material')?.value === 'vinyl') {
				let additional = this.db.price[order.get('plotter')?.value] + this.db.price[order.get('materialType')?.value] + this.db.price[order.get('additionalService')?.value]
				let amount = order.get('width')?.value * order.get('height')?.value * additional
				order.get('partialAmount')?.setValue(amount, {emitEvent: false})
			}
		}
	}

	deleteOrder(index: number) {
		this.orders.controls.splice(index, 1)
	}

	send() {
		this.orders.valueChanges
			.subscribe(
				{ next: data => {this.calculateAmount(),  this.emitter.emit(this.form)} }
			)
	}

}
