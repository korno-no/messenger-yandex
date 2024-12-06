import Block, { BlockProps } from '../../core/block.ts';
import './button.css';

interface IButtonProps extends BlockProps {
    mode?: 'primary' | 'link' | 'secondary';
    type?: 'submit' | 'text';
    text?: string;
    modificator?: string;
    onClick?: (_event: Event) => void;
    events?: { [key: string]: EventListener };
}

class Button extends Block<IButtonProps> {
  constructor(props: IButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick as EventListener,
      },
    });
  }

  render(): string {
    return (`<button class='button button_{{mode}} button_{{modificator}}' type='{{type}}'>
                    {{#if (eq modificator 'arrow-right')}}
                        <img class='svg' src='./assets/icons/arrow-right.svg' alt='arror right'>
                    {{/if}}
                    {{#if (eq modificator 'arrow-left')}}
                        <img class='svg' src='./assets/icons/arrow-left.svg' alt='arror left'>
                    {{/if}}
                    {{#if (eq modificator 'additional-info')}}
                      <img src='./assets/icons/add-info.svg'/ 
                        alt='additional information' class='conversation_add-info svg img-btn'>
                    {{/if}}
                    {{text}}
                </button>
            `);
  }
}
export default Button;
