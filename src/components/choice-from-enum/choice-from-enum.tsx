import { Component, h, Prop } from '@stencil/core';
import { EnumType } from '../../contracts/enums';

@Component({
  tag: 'choice-from-enum',
  styleUrl: 'choice-from-enum.scss',
})
export class ChoiceFromEnum {
  @Prop()
  enum!: EnumType;

  @Prop()
  legend: string;

  @Prop()
  formField: string;

  checkboxesFromEnum() {
    return Object.values(this.enum).map((entry) => (
      <label>
        <input type="checkbox" name={this.formField} value={entry} /> {entry}
      </label>
    ));
  }

  render() {
    return this.legend ? (
      <fieldset>
        <legend>{this.legend}</legend>
        {this.checkboxesFromEnum()}
      </fieldset>
    ) : (
      this.checkboxesFromEnum()
    );
  }
}
