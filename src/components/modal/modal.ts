import Block, { BlockProps } from '@core/block';
import './modal.css';

interface IModalProps extends BlockProps {
    isActive: boolean;
    title?: string;
    onClick?: (_event: Event) => void;
    events?: { [key: string]: EventListener };
}

class Modal extends Block<IModalProps> {
  constructor(props: IModalProps) {
    super({
      ...props,
      events: {
        click: props.onClick as EventListener,
    },
    });
  }

  render(): string {

    return (`
       
            <div class="wrapper display-{{#if isActive}}active{{/if}}" >
                <div class="modal">
                    {{{ExitButton}}}
                    <h1 class="wrapper_title">{{title}}</h1>
                    {{{Input}}}
                    {{{SubmitButton}}}
                </div>
            </div>
        
        `);
  }
}
export default Modal;
