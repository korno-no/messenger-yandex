import Block, { BlockProps } from '@core/block';
import './input.css';

interface IInputProps extends BlockProps {
    label: string;
    name: string;
    type: string;
    modificator?: string;
    onBlur?: (_e: Event) => void;
    events?: { [key: string]: EventListener };
    id?: string,
    value?: string,
}

class Input extends Block<IInputProps> {
  value: string | undefined;
  constructor(props: IInputProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur ?? (() => {}),
      },
    });
    this.name= props.name
  }

  render(): string {
    return (`
                <input
                    class='input_field input_field_{{name}} input_field_{{modificator}}'
                    placeholder=''
                    name = {{name}}
                    type = {{type}}
                    id = {{id}}
                    {{#if value}}value="{{value}}"{{/if}}
                />
            `);
  }
}

export default Input;
