import Block, { BlockProps } from '@core/block';
import {
  Input, Button, ToggleMenu, Message, Avatar,
} from 'components';
import './chat.css';
import Validation from '@utils/validation';
import { ChatsActions } from 'actions/chats-actions';
import connect from '@core/connect';

interface IChatProps extends BlockProps {
    chatId?: number;
    avatar?: string;
    dialogName: string;
    isMenueOpen?: boolean;
}

class Chat extends Block<IChatProps> {
  chatsActions = new ChatsActions();

  constructor(props: IChatProps) {
    super({ ...props });
  }

  init() {
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
            this.chatsActions.sendMessage(messageInput.value);
            messageInput.value = '';
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
        onClick: () => {
          this.chatsActions.deleteChat(this.props.chatId ?? 0);
          AdditionalInfoToggleMenu.setProps({ isActive: !AdditionalInfoToggleMenu.props.isActive });
        },
      }),
      AddUserToChat: new Button({
        type: 'text',
        text: 'add user to chat',
        settings: { withInternalID: true },
        onClick: () => {
          window.store.set({ isOpenAddUserToChat: true });
          AdditionalInfoToggleMenu.setProps({ isActive: !AdditionalInfoToggleMenu.props.isActive });
        },
      }),
      DeleteUserFormChat: new Button({
        type: 'text',
        text: 'delete user from chat',
        settings: { withInternalID: true },
        onClick: () => {
          window.store.set({ isOpenDeleteUsersFromChat: true });
          AdditionalInfoToggleMenu.setProps({ isActive: !AdditionalInfoToggleMenu.props.isActive });
        },
      }),
    });

    const Messages: Message[] = [];

    const AdditionalInfoButton = new Button({
      modificator: 'additional-info',
      onClick: (e: Event) => {
        e.preventDefault();
        AdditionalInfoToggleMenu.setProps({ isActive: !AdditionalInfoToggleMenu.props.isActive });
      },
    });

    const ChatAvatar = new Avatar({});

    this.children = {
      ...this.children,
      MessageInput,
      SendButton,
      AdditionalInfoButton,
      AdditionalInfoToggleMenu,
      ChatAvatar,
    };
    this.lists = {
      ...this.lists,
      Messages,
    };
  }

  componentDidUpdate(_oldProps: IChatProps, _newProps: IChatProps): boolean {
    if (this.props.chatId && _oldProps.chatId !== this.props.chatId) {
      this.chatsActions.startConversation(this.props.storeUser.id, this.props.chatId);
    }

    // render if the number of messages has been changed
    if (_oldProps.storeMessages.length !== this.props.storeMessages.length) {
      this.lists.Messages = this.props.storeMessages.map((message: Record<string, any>) => {
        const ConversationMessages = new Message({
          chat_id: message.chat_id,
          type: 'text',
          direction: message.user_id === this.props.storeUser.id ? 'outgoing' : 'incoming',
          time: message.time,
          text: message.content,
          isRead: message.isRead,
          file: message.file,
        });
        return ConversationMessages;
      });
    }

    this.children.ChatAvatar = new Avatar({
      name: 'chat ava',
      mode: 'chatAva',
      avatarUrl: this.props.avatar,
      chatId: this.props.chatId,
    });

    return super.componentDidUpdate(_oldProps, _newProps);
  }

  render(): string {
    return (`<div>
                    <div class='conversation_contact '>
                        {{{ChatAvatar}}}
                        {{dialogName}}
                        {{{AdditionalInfoButton}}}
                        {{{AdditionalInfoToggleMenu}}}
                        
                    </div>

                    <div class='conversation_chat chat'>
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
export default connect((
  {
    isOpenAddUserToChat,
    storeUser,
    storeMessages,
    isOpenDeleteUsersFromChat,
  }:any,
) => (
  {
    isOpenAddUserToChat,
    storeUser,
    storeMessages,
    isOpenDeleteUsersFromChat,
  }

))(Chat as unknown as typeof Block);
