import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit {

  @ViewChild('inputValidation') inputValidate: NgForm;



  public inputValidationValue: any;
  constructor() {
  }


  ngOnInit() {
  }

}
