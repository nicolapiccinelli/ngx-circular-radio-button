import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class RadioButtonGroupCommunicator {
	private _disabled: boolean = undefined;
	private _value: any = undefined;
	private _name: string = undefined;

	public disabledChanged = new EventEmitter<boolean>();
	public valueChanged = new EventEmitter<any>();
	public nameChanged = new EventEmitter<string>();

	public setDisabled(value: boolean) { 
		if (this._disabled !== value) {
			this._disabled = value;
			this.disabledChanged.emit(this._disabled);
		}
	}

	public setValue(value: any) {
		if (this._value !== value) {
			this._value = value;
			this.valueChanged.emit(this._value);
		}
	}

	public setName(value: string) {
		if (this._name !== value) {
			this._name = value;
			this.nameChanged.emit(this._name);
		}
	}	
}