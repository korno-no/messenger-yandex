import Block, { BlockProps } from '@core/block';
import './avatar.css';
import { ProfileActions } from 'actions/profile-actions';
import { imageUrl } from '@utils/const';
import { ChatsActions } from 'actions/chats-actions';

interface AvatarProps extends BlockProps {
    avatarUrl?: string | undefined;
    name?: string;
    mode?: 'chatAva' | 'profileAva' | 'contactCard';
    chatId?: number;
    src?: () => string;
}

export default class Avatar extends Block<AvatarProps> {
  profileActions = new ProfileActions();

  chatsActions = new ChatsActions();

  private _eventBound: boolean = false;

  constructor(props: AvatarProps) {
    super({ ...props });
    this.setProps({
      src: () => imageUrl + this.props.avatarUrl,
    });
  }

  handleFileChange(event: Event) {
    event.stopPropagation();
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (this.props.mode === 'profileAva') {
        this.profileActions.updateAvatar(file);
      } else {
        const formData = new FormData();
        formData.append('chatId', String(this.props.chatId));
        formData.append('avatar', file);

        this.chatsActions.uploadChatAvatar(formData);
      }
    }
  }

  componentDidMount() {
    if (this.props.mode !== 'contactCard') {
      if (this._eventBound) return; // Пропустить, если обработчик уже добавлен
      this._eventBound = true;

      this.element?.addEventListener('change', (event) => {
        const target = event.target as HTMLInputElement;
        if (target.classList.contains('image')) {
          this.handleFileChange(event);
        }
      });
    }
  }

  render() {
    return `
        {{#if (or (eq mode 'chatAva') (eq mode 'profileAva')) }}
            <label for="{{mode}}{{chatId}}">
                <input class="image" type="file" name="image" 
                id="{{mode}}{{chatId}}" accept=".jpeg, .jpg, .png, .gif"/>
                <img class='profile_avatar avatar' 
                alt={{name}} src={{src}}></img>
            </label>
        {{/if}}
        {{#if (eq mode 'contactCard')  }}
            <img class='profile_avatar avatar' 
                alt={{name}} src={{src}}></img>
        {{/if}}
       
        `;
  }
}
