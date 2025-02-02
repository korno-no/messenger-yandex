import Block, { BlockProps } from '../../../core/block.ts';
import './input-wrapper.css';

interface IInputProps extends BlockProps {
    error: boolean;
    label: string;
    name: string;
    type: string;
    modificator?: string;
}

class InputWrapper extends Block<IInputProps> {
  constructor(props: IInputProps) {
    super({
      ...props,
    });
    this.name = props.name;
  }

  render(): string {
    return (`
            <div class='input input_{{modificator}}' >
                <label class='input_container' for='{{name}}'>
                {{#if error}}
                    <div class='input_error input_error_background'></div>
                    <div class='input_error-text'>{{label}} is wrong</div> 
                {{/if}}
                {{{Input}}}
                {{#unless error}}
                    <div class='input_label input_label_{{modificator}}'>{{label}}</div>
                {{/unless}}
                </label>
            </div>
            `);
  }
}

export default InputWrapper;
