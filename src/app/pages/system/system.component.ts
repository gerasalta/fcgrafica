import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

 

  form: FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
  }



}
