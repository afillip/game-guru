import { Component, ComponentInterface, h, Prop, Event, EventEmitter } from '@stencil/core';
import { IBoardGame } from '../../contracts/interfaces/IBoardGame';

export type InputType = 'text' | 'textarea' | 'number' | 'checkbox' | 'radio' | 'range' | 'date';

@Component({
  tag: 'two-way-input',
  styleUrl: 'two-way-input.scss',
})
export class TwoWayInput implements ComponentInterface {
  @Prop()
  name!: keyof IBoardGame;

  @Prop()
  type: InputType = 'text';

  @Prop()
  value: string | number | string[];

  @Prop()
  checked = false;

  @Event()
  inputChange: EventEmitter;

  onInput(evt: InputEvent) {
    this.inputChange.emit({ [this.name]: evt.data });
  }

  render() {
    return this.type === 'textarea' ? (
      <textarea name={this.name} value={this.value} onInput={this.onInput.bind(this)} />
    ) : (
      <input
        name={this.name}
        type={this.type}
        value={this.value}
        checked={this.checked}
        onInput={this.onInput.bind(this)}
      />
    );
  }
}
