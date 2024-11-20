import Block, { BlockProps } from '@core/block';
import Validation from '@utils/validation';
import {
  Button, Input, 
  InputWrapper, ContactCard, 
  Message, Modal, 
  CoverScreen, Chat
} from '../../components';
import { ChatsActions } from 'actions/chats-actions';
import connect from '@core/connect';
import backgroundImg from '../../assets/images/background.jpg';


import ava1 from '../../assets/images/ava1.jpeg';
import ava2 from '../../assets/images/ava2.jpeg';
import ava3 from '../../assets/images/ava3.jpeg';
import ava4 from '../../assets/images/ava4.jpeg';
import ava5 from '../../assets/images/ava5.jpg';
import ava6 from '../../assets/images/ava6.jpeg';
import ava7 from '../../assets/images/ava7.jpeg';
import ava8 from '../../assets/images/ava8.jpeg';

interface IMessengerProps extends BlockProps {
    title: string;
    settings: {withInternalID: true}
    isOpenChat: boolean;
}

class MessengerPage extends Block <IMessengerProps> {
  chatsActions = new ChatsActions()
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
          NewDialogModal.setProps({isActive: false});
        }
      }),
      Input:  new Input({
          type: 'text',
          name: 'dialog_name',
          label: 'Dialog name',
          id: 'dialogName',
          settings: { withInternalID: true }
      }),
      SubmitButton: new Button({
        mode: 'primary',
        type: 'submit',
        text: 'Add new dialog',
        settings: { withInternalID: true },
        onClick: (e: Event) => {
          e.preventDefault();
          const inputName = document.getElementById('dialogName') as HTMLInputElement;
          this.chatsActions.createChat(inputName.value)
          NewDialogModal.setProps({isActive: false});

        },
      })
    })
    const ProfileButton = new Button({
      type: 'text',
      text: 'profile >',
      modificator: 'pull-right',
      settings: { withInternalID: true },
      onClick: (e: Event) => {
        e.preventDefault();
        window.router.go('/profile')
      },
    });
    const NewChatButton = new Button({
      type: 'text',
      text: '+ new chat',
      settings: { withInternalID: true },
      onClick: (e: Event) => {
        NewDialogModal.setProps({isActive: true});
        
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
      chatId: null 
    })

    /* const Messages = [
      new Message({
        type: 'text', direction: 'incoming', time: '11:35', text: `shalom,
                question: i you could be any character from Futurama who would you pick?
                For me, I'dtotally choose Fry. I mean, waking up in the future and discovering 
                all the crazy stuff that’s happened, plus all the wild adventures with Bender 
                and Leela? That’d be epic! Plus, Fry’s got that laid-back 
                vibe and gets to experience the future firsthand. 🍕🚀`,
      }),
      new Message({
        type: 'image', direction: 'incoming', time: '11:36', text: './assets/images/message.jpg',
      }),
      new Message({
        type: 'text', direction: 'outgoing', time: '12:00', text: 'Futurama?!?!',
      }),
      new Message({
        type: 'text', direction: 'outgoing', time: '12:00', text: 'dude',
      }),
      new Message({
        type: 'text', direction: 'outgoing', time: '12:00', text: 'I\'m an X-Men fan',
      }),
    ]; */

    const ContactCards = this.props.storeChats.map((chat: Record<string, T>) => {
      const contactCard =  new ContactCard ({
          chatId: chat.id,
          name: chat.title, 
          avatar: chat.avatar,
          created_by: chat.created_by,
          unread_count: chat.unread_count,
          last_message: chat.last_message,
          onClick: (e: Event) => this.selectChat(e, contactCard),
      })
      return contactCard
    })

    const SelectChatCover = new CoverScreen({
      text: 'Select a chat to start conversation',
      background: backgroundImg
    })

    const AddUserToChat = new Modal({
      
      settings: { withInternalID: true },
      isActive: this.props.isOpenAddUserToChat,

      ExitButton: new Button({
        mode: 'secondary',
        modificator: 'pull-right',
        text: 'X',
        onClick: (e: Event) => {
          e.preventDefault();
          this.props.isOpenAddUserToChat = false
          AddUserToChat.setProps({isActive: this.props.isOpenAddUserToChat})
        }
      }),
      Input:  new Input({
          type: 'text',
          name: 'usersId',
          label: 'Users id',
          id: 'usersId',
          settings: { withInternalID: true }
      }),
      SubmitButton: new Button({
        mode: 'primary',
        type: 'submit',
        text: 'Add new users',
        settings: { withInternalID: true },
        onClick: (e: Event) => {
          e.preventDefault();
          const inputName = document.getElementById('usersId') as HTMLInputElement;
          debugger
          this.chatsActions.addUsersToChat(inputName.value, this.children.CurrentChat.props.chatId )
          this.props.isOpenAddUserToChat = false
          AddUserToChat.setProps({isActive: this.props.isOpenAddUserToChat})
        },
      })
    })

    this.children = {
      ...this.children,
      ProfileButton,
      NewChatButton,
      SearchInput,
      NewDialogModal,
      SelectChatCover,
      CurrentChat,
      AddUserToChat
      
    };

    this.lists = {
      ...this.lists,
      ContactCards,
     // Messages,
    };
  }
  

    componentDidUpdate(oldProps: any, newProps: any): boolean {
      if(oldProps.storeChats !== newProps.storeChats) {
        this.lists.ContactCards = this.props.storeChats.map((chat: Record<string, any>) => {
          const contactCard =  new ContactCard ({
              chatId: chat.id,
              name: chat.title, 
              avatar: chat.avatar,
              created_by: chat.created_by,
              unread_count: chat.unread_count,
              last_message: chat.last_message,
              onClick: (e: Event) => this.selectChat(e, contactCard),
          })
          return contactCard
        })
      }
      if(oldProps.storeChats > newProps.storeChats ) {
        this.setProps({isOpenChat: false})
      }
      if(this.props.isOpenAddUserToChat ){
        this.children.AddUserToChat.setProps({isActive: true})
      }
      return super.componentDidUpdate(oldProps, newProps);
    }

  selectChat(e: Event,contactCard: ContactCard){
      this.setProps({isOpenChat: true})
      this.children.CurrentChat.setProps({
      dialogName: contactCard.props.name,
      chatId: contactCard.props.chatId
    })
  }

  onSubmitNewDialog(){
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
            </div>
        `);
  }
}
export default connect(({storeChats, isOpenAddUserToChat}) => 
  ({ storeChats, isOpenAddUserToChat}))(MessengerPage)

