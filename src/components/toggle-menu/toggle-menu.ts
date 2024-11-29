import Block, { BlockProps } from '@core/block';
import './toggle-menu.css';

interface IToggleMenuProps extends BlockProps {
    isActive: boolean;
    onClick?: (_event: Event) => void;
    events?: { [key: string]: EventListener };
}

class ToggleMenu extends Block<IToggleMenuProps> {
  constructor(props: IToggleMenuProps) {
    super({
      ...props,
      events: {
        click: props.onClick as EventListener,
      },
    });
  }

  render(): string {
    return (`<div class='toggle-menu  display{{#if isActive}}-active{{/if}}'>
                {{{DeleteChat}}}
                {{{AddUserToChat}}}
                {{{DeleteUserFormChat}}}
            </div>
        `);
  }
}
export default ToggleMenu;
