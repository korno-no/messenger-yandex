import Block, { BlockProps } from '@core/block';
import './contact-card.css';

interface IContactCardProps extends BlockProps {
    chatId: number,
    name: string,
    created_by: number,
    last_message: string,
    sender?: number,
    isRead?: boolean,
    unread_count: number,
    date?: string,
    active?: boolean,
    avatar: string
    settings?: {withInternalID: true},
    onClick?: (e: Event) => void;
    events?: { [key: string]: EventListener };

}

class ContactCard extends Block <IContactCardProps> {
    
  constructor(props: IContactCardProps) {
    super({
      ...props,
      events: {
        click: props.onClick as EventListener,
      },
    });
    
  }
  

  render(): string {
    
    return (`<div class='contact-card contact-card_{{active}}'>
                    {{{DeleteChatButton}}}
                    <img src={{avatar}} alt='Avatar' class='contact-card_avatar avatar'>
                    <div class='contact-card_info'>
                        <div class='contact-card_1-line'>
                            <div class='contact-card_name'>  {{name}}</div>
                            <div class='contact-card_date'>{{date}}</div>
                        </div>
                        <div class='contact-card_2-line'>

                            <div class='contact-card_message'> 
                                {{#if sender}}
                                    Me:
                                {{/if}}
                                {{last_message}}
                            </div>
                            {{#if unread_count}}
                                <div class='contact-card_amount'>
                                    <div class='contact-card_amount-back'>{{unread_count}}</div>
                                </div>
                            {{/if}}
                        </div>
                    </div>
                </div>
            `);
  }
}
export default ContactCard;
