import Block, { BlockProps } from '@core/block';
import { imageUrl } from '@utils/const';
import './avatar.css';

interface AvatarProps extends BlockProps {
    avatarUrl?: string | undefined;
    name?: string;
    mode?: 'chatAva' | 'profileAva' | 'contactCard';
    chatId?: number;
    events?: { [key: string]: EventListener };
    beginingUrl?: string;
}

export default class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super({
      ...props,
      beginingUrl: imageUrl,
    });
  }

  render() {
    return `
        {{#if (or (eq mode 'chatAva') (eq mode 'profileAva')) }}
            <label for="{{mode}}{{chatId}}">
                <input class="image" type="file" name="{{mode}}{{chatId}}" 
                id="{{mode}}{{chatId}}" accept=".jpeg, .jpg, .png, .gif"/>
                <img class='profile_avatar avatar' 
                alt={{name}} src={{beginingUrl}}{{avatarUrl}}></img>
            </label>
        {{/if}}
        {{#if (eq mode 'contactCard')  }}
            <img class='profile_avatar avatar' 
                alt={{name}} src={{beginingUrl}}{{avatarUrl}}></img>
        {{/if}}
       
        `;
  }
}
