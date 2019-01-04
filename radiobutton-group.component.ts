import {
  Component,
  Input,
  EventEmitter,
  Output,
  forwardRef,
  HostBinding,
  ViewEncapsulation,
  ContentChildren,
  QueryList
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { RadioButtonComponent } from './radiobutton.component';
import { RadioButtonGroupCommunicator } from './radiobuttongroup-com.service';

const RADIOGROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioButtonGroupComponent),
  multi: true
};

let nextId = 0;

@Component({
  selector: 'ngx-radiobutton-group',
  providers: [RADIOGROUP_VALUE_ACCESSOR, RadioButtonGroupCommunicator],
  template: `
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./radiobutton.component.scss'],
  host: {
    class: 'ngx-radiobutton-group'
  }
})
export class RadioButtonGroupComponent implements ControlValueAccessor {

  private _uniqueId: string = `ngx-radio-group-${++nextId}`;
  
  @HostBinding('class.disabled')
  @Input() id: string = this._uniqueId;
  @Input() tabindex: number = 0;
  @Input() set disabled(value) {
    this.radioGroupCommunicator.setDisabled(value);
  }

  @Output() change = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();

  @ContentChildren(forwardRef(() => RadioButtonComponent), { descendants: true })
  _radios: QueryList<RadioButtonComponent>;

  @Input() get value(): any {
    return this._value;
  }

  set value(value) {
    if (this._value !== value) {
      this._value = value;
      this.radioGroupCommunicator.setValue(this._value);
      this._updateSelectedRadioFromValue();
      this.onChangeCallback(this._value);
    }
  }

  @Input() get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (this._name !== value) {
      this.radioGroupCommunicator.setName(value);
    }
  }

  get selected(): RadioButtonComponent {
    return this._selected;
  }

  private _name: string = this._uniqueId;
  private _value: boolean = false;
  private _selected: RadioButtonComponent;

  constructor(public radioGroupCommunicator: RadioButtonGroupCommunicator) {
    this.radioGroupCommunicator = radioGroupCommunicator;

    this.radioGroupCommunicator.valueChanged.subscribe((val: any) => {
      this.value = val;
    });
  }

  private _updateSelectedRadioFromValue(): void {
    if (this._radios) {
      this._radios.forEach(radio => {
        if (this.value == radio.value) {
          this._selected = radio;
        }
      });
    }
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  private onChangeCallback = (_: any) => {
    // placeholder
  }

  private onTouchedCallback = () => {
    // placeholder
  }
}