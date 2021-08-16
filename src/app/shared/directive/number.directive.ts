import { Output,EventEmitter, ElementRef, Directive, Input, ChangeDetectorRef, OnDestroy, ViewRef } from '@angular/core';

@Directive({
  selector: '[ngModel][autonum]',
  host: {
    "(keydown)": 'onKeyUp($event)',
    "(input)": 'onInputChange($event)',
    "(blur)": 'onBlur($event)',
    "(focus)": 'onFocus($event)'
  }
})
export class NumberDirective {

  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  private value: any;
  private DECIMAL_SEPARATOR: string;
  private THOUSANDS_SEPARATOR: string;
  private PADDING = "000000";
  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef) {
    // TODO comes from configuration settings
    this.DECIMAL_SEPARATOR = ".";
    this.THOUSANDS_SEPARATOR = ",";
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.el.value = this.transform(this.el.value);
  }

  onInputChange($event) {
    let temp = $event.target.value;
    this.value = this.formatValue(temp);
    this.ngModelChange.emit(this.value);
  }

  onKeyUp($event) {
    let key = $event.key;

    if (!this.IsValidKey(key)) {
      $event.preventDefault();
    }
  }

  onBlur($event) {
    this.el.value = this.transform($event.target.value);
  }

  onFocus($event) {
    this.el.value = this.parse($event.target.value);
  }

  formatValue(value: number): number {
    return value;
  }

  IsValidKey(value: any): boolean {
    if (value.trim().length < 2) {

      if (value == ',' || value == '.' || value == '`') {
        return true;
      }

      if (!this.IsNumber(value)) {
        return false;
      }
    }
    return true;
  }

  IsNumber(value: any): boolean {
    var reg = new RegExp("^[0-9]+$");
    return reg.test(value);
  }

  transform(value: number | string, fractionSize: number = 0): string {
    let [integer, fraction = ""] = (value || "").toString()
      .split(this.DECIMAL_SEPARATOR);

    fractionSize = fractionSize || fraction.length;

    fraction = fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + this.PADDING).substring(0, fractionSize)
      : "";

    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);

    return integer + fraction;
  }

  parse(value: string, fractionSize: number = 0): string {
    let [integer, fraction = ""] = (value || "").split(this.DECIMAL_SEPARATOR);

    fractionSize = fractionSize || fraction.length;

    integer = integer.replace(new RegExp(this.THOUSANDS_SEPARATOR, "g"), "");

    fraction = parseInt(fraction, 10) > 0 && fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + this.PADDING).substring(0, fractionSize)
      : "";

    return integer + fraction;
  }

}


@Directive({
  selector: '[ngModel][precentagenum]',
  host: {
    "(input)": 'onInputChange($event)',
    "(keydown)":"onKeyUp($event)",
  }
})
export class PercentageDirective{

  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  private min : number = 0
  private max : number = 100
  private value: any;
  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef,
              private ref : ChangeDetectorRef) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    setInterval(() => { 
      if(!(this.ref as ViewRef).destroyed)
      {

        this.valueChange()
        this.ref.detectChanges();
      }
      
    }, 400);
  }

  onInputChange($event) {
    let temp = $event.target.value;
    this.value = this.formatValue(temp);
    this.ngModelChange.emit(this.value);
  }

  onKeyUp($event) {
    let key = $event.key;

    if($event.keyCode !== 8)
    {
      if (!this.IsValidKey(key)) {
        $event.preventDefault();
      }
    }   
  }
  valueChange()
  {
    if(this.value)
    {
      if(+this.value > 100 )
      {
        this.value = this.max
      }else if(+this.value < 0)
      {
        this.value = this.min
      }
      this.el.value =this.value
    }
    
  }
  formatValue(value: number): number {
    return value;
  }

  IsValidKey(value: any): boolean {
    if(value.trim().length > 3)
    {
     return false
    }
    if (value.trim().length < 2) {

      if (value == ',' || value == '.' || value == '`') {
        return true;
      }

      if (!this.IsNumber(value)) {
        return false;
      }
    }
    return true;
  }

  IsNumber(value: any): boolean {
    var reg = new RegExp("^[0-9]+$");
    return reg.test(value);
  }
}



