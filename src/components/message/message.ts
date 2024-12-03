import Block, { BlockProps } from '@core/block';
import './message.css';

interface IMessageProps extends BlockProps {
    chat_id: number;
    direction: 'incoming' | 'outgoing';
    type: string;
    time: string;
    text: string;
    isRead: boolean;
    file?: File;
    onClick?: () => void;
    events?: { [key: string]: EventListener };
}

export default class Message extends Block<IMessageProps> {
  constructor(props: IMessageProps) {
    super({
      ...props,
      events: {
        click: props.onClick ?? (() => {}),
      },
    });
  }

  render(): string {
    return (`<div class='message  message_{{direction}}' >
                    {{#if (eq type 'image')}}
                        <div class='message_image'>
                            <img class='image' src={{text}} alt='message as picture'>

                        </div>
                    {{/if}}
                    {{#if (eq type 'text')}}
                        <div class='message_text'>{{text}}</div>
                    {{/if}}
                    <div class='message_time'>
                        {{time}}
                        {{#if (eq direction 'outgoing')}}
                            <img class='svg message_checked' 
                            src='./assets/icons/checks-double-v.svg'  alt='message have been read'>
                        {{/if}}
                    </div>
                </div>

            `);
  }
}
