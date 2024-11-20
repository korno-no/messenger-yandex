import Block, { BlockProps } from '@core/block';
import {Input, Button, ToggleMenu} from '../../components';
import './chat.css';
import Validation from '@utils/validation';
import { ChatsActions } from 'actions/chats-actions';
import connect from '@core/connect';

interface IChatProps extends BlockProps {
    chatId?: number;
    chatAvatar?: string;
    dialogName: string;
    isMenueOpen?: boolean;
}

class Chat extends Block<IChatProps> {
  chatsActions = new ChatsActions()

  constructor(props: IChatProps) {
    super({...props});
  }
  init(){

    const MessageInput = new Input({
      type: 'message', name: 'message', label: '', modificator: 'bottom',
    });

    const SendButton = new Button({
      text: '',
      mode: 'secondary',
      modificator: 'arrow-right',
      onClick: (e: Event) => {
        e.preventDefault();
        const messageInput = document.querySelector('.input_field_message') as HTMLInputElement;
        if (messageInput) {
          const error = !Validation.validate(messageInput.value, 'message');
          if (error) console.log('ooops, input is empty, we cant send empty message');
          else {
            console.log({ messageInput: messageInput.value });
          }
        }
      },
    });

    const AdditionalInfoToggleMenu = new ToggleMenu({
      isActive: false,
      DeleteChat: new Button({
        type: 'text',
        text: 'delete chat',
        settings: { withInternalID: true },
        onClick: (e: Event) => {
          this.chatsActions.deleteChat(this.props.chatId?? 0)
          AdditionalInfoToggleMenu.setProps({isActive: !AdditionalInfoToggleMenu.props.isActive});

        },
      }),
      AddUserToChat: new Button({
        type: 'text',
        text: 'add user to chat',
        settings: { withInternalID: true },
        onClick: (e: Event) => {
          window.store.set({isOpenAddUserToChat: true})
          AdditionalInfoToggleMenu.setProps({isActive: !AdditionalInfoToggleMenu.props.isActive});
        },
      })
    })

    const AdditionalInfoButton = new Button({
      modificator: 'additional-info',
      onClick: (e: Event) => {
        e.preventDefault();
        AdditionalInfoToggleMenu.setProps({isActive: !AdditionalInfoToggleMenu.props.isActive});
      },
    });

   

    this.children = {
      ...this.children,
      MessageInput,
      SendButton,
      AdditionalInfoButton,
      AdditionalInfoToggleMenu,
    };
  
  }
  
  render(): string {
    return (`<div>
                    <div class='conversation_contact '>
                        <img src='{{chatAvatar}}' alt='avatar' 
                        class='conversation_avatar avatar'>
                        {{dialogName}}
                        {{{AdditionalInfoButton}}}
                        {{{AdditionalInfoToggleMenu}}}
                        
                    </div>

                    <div class='conversation_chat chat'>
                    <div class='c'>19 June</div>
                        {{{Messages}}}
                    </div>

                    <div class='conversation_bottom bottom'>
                        <img class='bottom_clip svg' alt='clip' src='./assets/icons/clip.svg'/ >
                        {{{MessageInput}}}
                        {{{SendButton}}}
                    </div>
                    {{{AddUserToChat}}}
                </div>
            `);
  }
}
export default connect(({isOpenAddUserToChat}) => ({ isOpenAddUserToChat}))(Chat)

