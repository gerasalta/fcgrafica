import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {

	@Output() emitter = new EventEmitter<any>();
	form: FormGroup = new FormGroup({
		arrOrders: new FormArray([]),
		description: new FormControl('')
	});

	prices: any = {};
	orders: FormArray = this.form.get('arrOrders') as FormArray;
	showDescription: boolean = false;

	get disabledDelete() {
		return this.orders.controls.length <= 1
	}

	constructor(private db: DatabaseService) { }

	ngOnInit(): void {
		this.getPrices();
		this.emitter.emit(this.form);
		this.addOrder();
	}

	openDescription() {
		this.showDescription === false ? this.showDescription = true : this.showDescription = false
	}

	addOrder() {
		let newOrder = new FormGroup({
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
		});
		this.orders?.push(newOrder);
	}

	getPrices(){
		this.db.getPrices()
		.subscribe((data:any) => {this.prices = data, this.send()})
	};	

	calculateAmount() {
		let arr = this.orders.controls;
		for (let order of arr) {
			if (order.get('material')?.value === 'vinyl') {
				let material = this.prices[order.get('material')?.value]
				let additional = material[order.get('plotter')?.value] + material[order.get('materialType')?.value] + material[order.get('additionalService')?.value]
				let amount = order.get('width')?.value * order.get('height')?.value * additional
				order.get('partialAmount')?.setValue(amount, { emitEvent: false })
			}
			if (order.get('material')?.value === 'banner') {
				let material = this.prices[order.get('material')?.value]
				if (order.get('additionalMaterial')?.value === 'tensioner' || order.get('additionalMaterial')?.value === 'doubleTensioner' || order.get('additionalMaterial')?.value === 'rollUp') {
					order.get('width')?.setValue(0.9, { emitEvent: false })
					order.get('height')?.setValue(1.9, { emitEvent: false })
					let additional =  material[order.get('materialType')?.value] + material[order.get('additionalService')?.value]
					let amount = order.get('width')?.value * order.get('height')?.value * additional + material[order.get('additionalMaterial')?.value]
					order.get('partialAmount')?.setValue(amount, { emitEvent: false })
				}
				else {
					let additional = material[order.get('additionalMaterial')?.value] + material[order.get('materialType')?.value] + material[order.get('additionalService')?.value]
					let amount = order.get('width')?.value * order.get('height')?.value * additional
					order.get('partialAmount')?.setValue(amount, { emitEvent: false })
				}
			}
			if (order.get('material')?.value === 'light') {
				let material = this.prices[order.get('material')?.value]
				let additional = material[order.get('lightMaterial')?.value]
				let amount = order.get('meters')?.value * additional
				order.get('partialAmount')?.setValue(amount, { emitEvent: false })
			}
			if (order.get('material')?.value === 'polyfan') {
				let material = this.prices[order.get('material')?.value]
				let additional = material[order.get('thickness')?.value] + material[order.get('additionalMaterial')?.value] + material[order.get('additionalService')?.value]
				let amount = order.get('units')?.value * additional
				order.get('partialAmount')?.setValue(amount, { emitEvent: false })
			}
		}
	}

	deleteOrder(index: number) {
		this.orders.controls.splice(index, 1);
		this.emitter.emit(this.form)
	}

	send() {
		this.orders.valueChanges
			.subscribe(() => { this.calculateAmount(), this.emitter.emit(this.form)})
	}
}
