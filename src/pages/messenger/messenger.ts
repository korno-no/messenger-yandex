import Block, { BlockProps } from '@core/block';
import { ChatsActions } from 'actions/chats-actions';
import { AuthAction } from 'actions/auth-actions';
import connect from '@core/connect';
import {
  Button, Input,
  InputWrapper, ContactCard,
  Modal,
  CoverScreen, Chat,
} from '../../components';
import backgroundImg from '../../assets/images/background.jpg';

interface IMessengerProps extends BlockProps {
    title: string;
    settings: {withInternalID: true}
    isOpenChat: boolean;
}

class MessengerPage extends Block <IMessengerProps> {
  chatsActions = new ChatsActions();

  authAction = new AuthAction();

  constructor(props: IMessengerProps) {
    super({
      ...props,
      title: 'Messenger Page',

    });
  }

  init() {
    const NewDialogModal = new Modal({
      isActive: false,
      settings: { withInternalID: true },
      ExitButton: new Button({
        mode: 'secondary',
        modificator: 'pull-right',
        text: 'X',
        onClick: (e: Event) => {
          e.preventDefault();
          NewDialogModal.setProps({ isActive: false });
        },
      }),
      Input: new Input({
        type: 'text',
        name: 'dialog_name',
        label: 'Dialog name',
        id: 'dialogName',
        settings: { withInternalID: true },
      }),
      SubmitButton: new Button({
        mode: 'primary',
        type: 'submit',
        text: 'Add new dialog',
        settings: { withInternalID: true },
        onClick: (e: Event) => {
          e.preventDefault();
          const inputName = document.getElementById('dialogName') as HTMLInputElement;
          this.chatsActions.createChat(inputName.value);
          NewDialogModal.setProps({ isActive: false });
        },
      }),
    });
    const ProfileButton = new Button({
      type: 'text',
      text: 'profile >',
      modificator: 'pull-right',
      settings: { withInternalID: true },
      onClick: (e: Event) => {
        e.preventDefault();
        this.setProps({ isOpenChat: false });
        this.chatsActions.clearInterval();
        window.router.go('/profile');
      },
    });
    const NewChatButton = new Button({
      type: 'text',
      text: '+ new chat',
      settings: { withInternalID: true },
      onClick: () => {
        NewDialogModal.setProps({ isActive: true });
      },
    });

    const SearchInput = new InputWrapper({
      type: 'search',
      name: 'search',
      label: 'search',
      error: false,
      settings: { withInternalID: true },
      Input: new Input({
        type: 'search',
        name: 'search',
        label: 'search',
        id: 'SearchInput',
        settings: { withInternalID: true },

      }),
    });

    const CurrentChat = new Chat({
      dialogName: '',
      chatId: null,
    });

    const ContactCards: ContactCard[] = [];

    const UsersInChat: Button[] = [];

    const SelectChatCover = new CoverScreen({
      text: 'Select a chat to start conversation',
      background: backgroundImg,
    });

    const AddUserToChat = new Modal({

      settings: { withInternalID: true },
      isActive: this.props.isOpenAddUserToChat,

      ExitButton: new Button({
        mode: 'secondary',
        modificator: 'pull-right',
        text: 'X',
        onClick: (e: Event) => {
          e.preventDefault();
          this.props.isOpenAddUserToChat = false;
          AddUserToChat.setProps({ isActive: this.props.isOpenAddUserToChat });
          window.store.set({ isOpenAddUserToChat: false });
        },
      }),
      Input: new Input({
        type: 'text',
        name: 'usersId',
        label: 'Users id',
        id: 'usersId',
        settings: { withInternalID: true },
      }),
      SubmitButton: new Button({
        mode: 'primary',
        type: 'submit',
        text: 'Add new users',
        settings: { withInternalID: true },
        onClick: (e: Event) => {
          e.preventDefault();
          const inputName = document.getElementById('usersId') as HTMLInputElement;
          this.chatsActions.addUsersToChat(inputName.value, this.children.CurrentChat.props.chatId);
          this.props.isOpenAddUserToChat = false;
          AddUserToChat.setProps({ isActive: this.props.isOpenAddUserToChat });
          window.store.set({ isOpenAddUserToChat: false });
        },
      }),
    });

    // isOpenDeleteUsersFromChat

    const DeleteUserFromChat = new Modal({

      settings: { withInternalID: true },
      isActive: this.props.isOpenDeleteUsersFromChat,

      ExitButton: new Button({
        mode: 'secondary',
        modificator: 'pull-right',
        text: 'X',
        onClick: (e: Event) => {
          e.preventDefault();
          this.props.isOpenDeleteUsersFromChat = false;
          DeleteUserFromChat.setProps({ isActive: this.props.isOpenDeleteUsersFromChat });
          window.store.set({ isOpenDeleteUsersFromChat: false });
        },
      }),
      Input: new Input({
        type: 'text',
        name: 'usersId',
        label: 'Users id',
        id: 'usersId',
        settings: { withInternalID: true },
      }),
      SubmitButton: new Button({
        mode: 'primary',
        type: 'submit',
        text: 'Delete users',
        settings: { withInternalID: true },
        onClick: (e: Event) => {
          e.preventDefault();
          const inputName = document.getElementById('usersId') as HTMLInputElement;

          this.chatsActions.deleteUsersFromChat(
            inputName.value,
            this.children.CurrentChat.props.chatId,
          );

          this.props.isOpenDeleteUsersFromChat = false;
          DeleteUserFromChat.setProps({ isActive: this.props.isOpenDeleteUsersFromChat });
          window.store.set({ isOpenDeleteUsersFromChat: false });
        },
      }),
    });

    this.children = {
      ...this.children,
      ProfileButton,
      NewChatButton,
      SearchInput,
      NewDialogModal,
      SelectChatCover,
      CurrentChat,
      AddUserToChat,
      DeleteUserFromChat,

    };

    this.lists = {
      ...this.lists,
      ContactCards,
      UsersInChat,
    };
  }

  componentDidMount(): void {
    this.authAction.getCurrentUser();
    this.chatsActions.getChats();
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps.storeChats !== newProps.storeChats) {
      this.lists.ContactCards = this.props.storeChats.map((chat: Record<string, any>) => {
        const contactCard = new ContactCard({
          chatId: chat.id,
          name: chat.title,
          avatar: chat.avatar,
          created_by: chat.created_by,
          unread_count: chat.unread_count,
          last_message: chat.last_message?.content,
          date: chat.last_message?.time,
          from: chat.last_message?.login,
          onClick: () => this.selectChat(contactCard),
        });
        if (this.children.CurrentChat.props.chatId === chat.id) {
          this.children.CurrentChat.setProps({ avatar: chat.avatar });
        }
        return contactCard;
      });
    }
    if (oldProps.storeChats > newProps.storeChats) {
      this.setProps({ isOpenChat: false });
    }
    if (this.props.isOpenAddUserToChat) {
      this.children.AddUserToChat.setProps({ isActive: true });
    }
    if (this.props.isOpenDeleteUsersFromChat) {
      this.children.DeleteUserFromChat.setProps({ isActive: true });
    }
    return super.componentDidUpdate(oldProps, newProps);
  }

  selectChat(contactCard: ContactCard) {
    this.setProps({ isOpenChat: true });
    this.children.CurrentChat.setProps({
      dialogName: contactCard.props.name,
      chatId: contactCard.props.chatId,
      avatar: contactCard.props.avatar,
    });
  }

  render(): string {
    return (`
            <div class='messenger'>
                <aside class='messenger_asside asside'>
                    <div class='asside_header'>
                      <div class='header_buttons'>
                        {{{NewChatButton}}}
                        {{{ProfileButton}}}
                      </div>
                      {{{SearchInput}}}
                    </div>
                    <div class='asside_list list'>
                        {{{ContactCards}}}
                    </div>
                </aside>
                <main class='messenger_main conversation'>
                  {{#if isOpenChat}}
                    {{{CurrentChat}}}
                  {{/if}}
                  {{#unless isOpenChat}}
                    {{{SelectChatCover}}}
                  {{/unless}}
                </main>
                {{{NewDialogModal}}}
                {{{AddUserToChat}}}
                {{{DeleteUserFromChat}}}
            </div>
        `);
  }
}
export default connect((
  {
    storeChats,
    isOpenAddUserToChat,
    isOpenDeleteUsersFromChat,
  },
) => ({
  storeChats,
  isOpenAddUserToChat,
  isOpenDeleteUsersFromChat,
}))(MessengerPage as unknown as typeof Block);
