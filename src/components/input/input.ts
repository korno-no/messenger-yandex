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
}

class Input extends Block<IInputProps> {
  constructor(props: IInputProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur ?? (() => {}),
      },
    });
  }

  render(): string {
    return (`
                <input
                    class='input_field input_field_{{name}} input_field_{{modificator}}'
                    placeholder=''
                    name = {{name}}
                    type = {{type}}
                    id = {{id}}
                />
            `);
  }
}

export default Input;
