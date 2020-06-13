import { Component, h, Prop } from '@stencil/core';
import { EnumType } from '../../contracts/enums';

@Component({
  tag: 'choice-from-enum',
  styleUrl: 'choice-from-enum.scss',
  shadow: true
})
export class ChoiceFromEnum {
  @Prop()
  enum: EnumType;

  @Prop()
  legend: string;

  @Prop()
  formField: string;

  // connectedCallback() {
  //   console.log(typeof this.enum, this.enum);
  // }

  render() {
    return (
      <fieldset>
        <legend>{this.legend}</legend>
        {Object.values(this.enum).map(entry => (
          <label>
            <input type="checkbox" name={this.formField} value={entry} />{' '}
            {entry}
          </label>
        ))}
      </fieldset>
    );
  }

}
