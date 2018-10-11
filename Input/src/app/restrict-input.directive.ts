import { Directive, Input, ElementRef,  HostListener } from '@angular/core';
import { ReactiveFormsModule, NG_VALIDATORS, FormControl, ValidatorFn, Validator } from '@angular/forms';

@Directive({
  selector: '[appRestrictInput]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: RestrictInputDirective,
      multi: true
    }
  ]
})
export class RestrictInputDirective implements Validator {
  validator: ValidatorFn;
  option: string;
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowRight', 'ArrowLeft'];
  @Input('appRestrictInput') optionType: string;

  constructor(private el: ElementRef) {
    this.validator = this.restrictInput();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.optionType != null) {
      switch (this.optionType) {
        case 'digitsOnly': this.option = '^[0-9]*$'; break;
        case 'lettersOnly': this.option = '^[a-zA-Z \-\']*$'; break;
        case 'decimalOnly': this.option = '^[0-9{0,9}]+(\.[0-9]{0,2}){0,1}$'; break;
        case 'uppercaseLettersOnly': this.option = '^[A-Z]*$'; break;
        case 'lettersAndDigitsOnly': this.option = '^[a-zA-Z0-9]*$'; break;
        case 'validPhoneCharsOnly': this.option = '^[0-9 ()/-]*$'; break;
        default: this.option = '';
      }
    }

    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    if (this.optionType == 'decimalOnly' && !String(event.key).match('^[0-9 .]*$')) {
        event.preventDefault();
    }
    const cursorPosition: number = event.target['selectionStart'];
    const current: string = this.el.nativeElement.value;
    console.log('This is current', current);
    const res = current.split('');
    if (res.length > cursorPosition + 2) {
      event.key != '.' ? res[cursorPosition] = event.key : event.preventDefault() ;
    } else {
      event.key == '.' ? res.includes('.') ? event.preventDefault() : res[cursorPosition] = event.key :  res[cursorPosition] = event.key;
    }
    const reg = new RegExp(this.option);
    const next: string = res.join('');
    const decimalPosition = next.indexOf('.');
    const errorPosition = decimalPosition + 3;
    if ( (next.includes('.')) && (cursorPosition >= errorPosition)) {
      event.preventDefault();
    } else if ( (next.includes('.')) && (((cursorPosition == decimalPosition + 1) && next.charAt(decimalPosition + 2))  || (((cursorPosition == decimalPosition + 2) && next.charAt(decimalPosition + 2)))) ) {
      this.el.nativeElement.value = next;
      event.preventDefault();
    }
    if (next && !String(next).match(reg)) {
      event.preventDefault();
    }
  }

  validate(c: FormControl) {
    return this.validator(c);
  }
  restrictInput(): ValidatorFn {
    return (c: FormControl) => {
      // console.log("this.option" + this.option);
      const reg = new RegExp(this.option);
      const isValid = reg.test(c.value);
      if (isValid) {
        return null;
      } else {
        return {
          restrictInput: {
            valid: false
          }
        };
      }
    };
  }
}
