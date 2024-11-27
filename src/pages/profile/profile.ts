import Block, { BlockProps } from '@core/block';
import Validation from '@utils/validation';
import { AuthAction } from 'actions/auth-actions';
import { ProfileActions } from 'actions/profile-actions';
import { Page } from 'main';
import connect from '@core/connect';
import { User, PasswordUpdate } from '@utils/types';
import {
  Button, Input, InputWrapper, Avatar,
} from '../../components';

 interface IProfileProps extends BlockProps {
    storeUser?: User;
    title: string;
    settings: {withInternalID: true},
}

class ProfilePage extends Block <IProfileProps> {
  authAction = new AuthAction();

  profileActions = new ProfileActions();

  constructor(props: IProfileProps) {
    super({
      ...props,
      title: 'Profile Page',

    });
    this.authAction.getCurrentUser();
  }

  init() {
    const EmailInput = new InputWrapper({
      type: 'email',
      name: 'email',
      label: 'email',
      error: false,
      settings: { withInternalID: true },
      Input: new Input({
        type: 'email',
        name: 'email',
        label: 'email',
        id: 'EmailInput',
        modificator: 'wide',
        value: this.props?.storeUser?.email,
        settings: { withInternalID: true },
        onBlur: (e: Event) => {
          const { value } = (e.target as HTMLInputElement);
          EmailInput.setProps({ error: !Validation.validate(value, 'email') });
        },
      }),
    });
    const LoginInput = new InputWrapper({
      type: 'text',
      name: 'login',
      label: 'login',
      error: false,
      settings: { withInternalID: true },
      Input: new Input({
        type: 'text',
        name: 'login',
        label: 'login',
        id: 'LoginInput',
        modificator: 'wide',
        value: this.props?.storeUser?.login,
        settings: { withInternalID: true },
        onBlur: (e: Event) => {
          const { value } = (e.target as HTMLInputElement);
          LoginInput.setProps({ error: !Validation.validate(value, 'login') });
        },
      }),
    });
    const FirstNameInput = new InputWrapper({
      type: 'text',
      name: 'first_name',
      label: 'first name',
      error: false,
      settings: { withInternalID: true },
      Input: new Input({
        type: 'text',
        name: 'first_name',
        label: 'first name',
        id: 'FirstNameInput',
        modificator: 'wide',
        value: this.props?.storeUser?.first_name,
        settings: { withInternalID: true },
        onBlur: (e: Event) => {
          const { value } = (e.target as HTMLInputElement);
          FirstNameInput.setProps({ error: !Validation.validate(value, 'first_name') });
        },
      }),
    });
    const SecondNameInput = new InputWrapper({
      type: 'text',
      name: 'second_name',
      label: 'second name',
      error: false,
      settings: { withInternalID: true },
      Input: new Input({
        type: 'text',
        name: 'second_name',
        label: 'second name',
        id: 'SecondNameInput',
        modificator: 'wide',
        value: this.props?.storeUser?.second_name,
        settings: { withInternalID: true },
        onBlur: (e: Event) => {
          const { value } = (e.target as HTMLInputElement);
          SecondNameInput.setProps({ error: !Validation.validate(value, 'second_name') });
        },
      }),
    });
    const NicknameInput = new InputWrapper({
      type: 'text',
      name: 'display_name',
      label: 'nickname',
      error: false,
      settings: { withInternalID: true },
      Input: new Input({
        type: 'text',
        name: 'display_name',
        label: 'nickname',
        modificator: 'wide',
        value: this.props?.storeUser?.display_name,
        settings: { withInternalID: true },
        id: 'NicknameInput',
        onBlur: (e: Event) => {
          const { value } = (e.target as HTMLInputElement);
          NicknameInput.setProps({ error: !Validation.validate(value, 'display_name') });
        },
      }),
    });
    const PhoneInput = new InputWrapper({
      type: '',
      name: 'phone',
      label: 'phone',
      error: false,
      settings: { withInternalID: true },
      Input: new Input({
        type: 'text',
        name: 'phone',
        label: 'phone',
        id: 'PhoneInput',
        modificator: 'wide',
        value: this.props?.storeUser?.phone,
        settings: { withInternalID: true },
        onBlur: (e: Event) => {
          const { value } = (e.target as HTMLInputElement);
          PhoneInput.setProps({ error: !Validation.validate(value, 'phone') });
        },
      }),
    });
    const PasswordInput = new InputWrapper({
      type: 'password',
      name: 'password',
      label: 'password',
      error: false,
      settings: { withInternalID: true },
      Input: new Input({
        type: 'password',
        name: 'password',
        label: 'password',
        id: 'PasswordInput',
        modificator: 'wide',
        value: this.props?.storeUser?.password,
        settings: { withInternalID: true },
        onBlur: (e: Event) => {
          const { value } = (e.target as HTMLInputElement);
          PasswordInput.setProps({ error: !Validation.validate(value, 'password') });
        },
      }),
    });

    const ChangeDataButton = new Button({
      mode: 'link',
      text: 'change data',
      modificator: 'wide',
      settings: { withInternalID: true },
      onClick: (e: Event) => {
        e.preventDefault();
        this.OnChangeData(e);
      },
    });
    const ChangePasswordButton = new Button({
      mode: 'link',
      text: 'change password',
      modificator: 'wide',
      settings: { withInternalID: true },
      onClick: (e: Event) => {
        e.preventDefault();
        this.OnChangePassword(e);
      },
    });

    const OldPasswordInput = new InputWrapper({
      type: 'password',
      name: 'oldPassword',
      label: 'password',
      error: false,
      settings: { withInternalID: true },
      Input: new Input({
        type: 'password',
        name: 'oldPassword',
        label: 'password',
        id: 'OldPasswordInput',
        modificator: 'wide',
        settings: { withInternalID: true },
        onBlur: (e: Event) => {
          const { value } = (e.target as HTMLInputElement);
          OldPasswordInput.setProps({ error: !Validation.validate(value, 'password') });
        },
      }),
    });
    const NewPasswordInput = new InputWrapper({
      type: 'password',
      name: 'newPassword',
      label: 'password',
      error: false,
      settings: { withInternalID: true },
      Input: new Input({
        type: 'password',
        name: 'newPassword',
        label: 'password',
        id: 'NewPasswordInput',
        modificator: 'wide',
        settings: { withInternalID: true },
        onBlur: (e: Event) => {
          const { value } = (e.target as HTMLInputElement);
          NewPasswordInput.setProps({ error: !Validation.validate(value, 'password') });
        },
      }),
    });

    const ExitButton = new Button({
      mode: 'link',
      text: 'exit',
      modificator: 'dangerous',
      settings: { withInternalID: true },
      onClick: (e: Event) => {
        e.preventDefault();
        this.authAction.logout();
      },
    });
    const BackButton = new Button({
      mode: 'secondary',
      modificator: 'arrow-left',
      settings: { withInternalID: true },
      onClick: (e: Event) => {
        e.preventDefault();
        window.router.go(Page.messenger);
      },
    });

    const ProfileAvatar = new Avatar({
      name: 'profile ava',
      mode: 'profileAva',
      avatarUrl: this.props.storeUser?.avatar,
    });

    this.children = {
      ...this.children,
      EmailInput,
      LoginInput,
      FirstNameInput,
      SecondNameInput,
      NicknameInput,
      PhoneInput,
      PasswordInput,
      ChangeDataButton,
      ChangePasswordButton,
      OldPasswordInput,
      NewPasswordInput,
      ExitButton,
      BackButton,
      ProfileAvatar,
    };
  }

  OnChangeData(event: Event) {
    const form = (event.target as HTMLElement).closest('form') as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as unknown as User;

    const dataWithStringId: { [key: string]: string } = {
      ...data,
      id: String(data.id), // Convert id to string
    };
    const invalidFields = Validation.validateFrom(dataWithStringId);
    if (invalidFields.length > 0) {
      Object.values(this.children).forEach((child) => {
        if (child.name && invalidFields.includes(child.name)) {
          child.setProps({ error: true });
        }
      });
    } else {
      this.profileActions.update(data);
    }
  }

  OnChangePassword(event: Event) {
    const form = (event.target as HTMLElement).closest('form') as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as PasswordUpdate;
    const invalidFields = Validation.validateFrom(data);
    if (invalidFields.length > 0) {
      Object.values(this.children).forEach((child) => {
        if (child.name && invalidFields.includes(child.name)) {
          child.setProps({ error: true });
        }
      });
    } else {
      this.profileActions.updatePassword(data);
    }
  }

  componentDidMount(): void {
    this.authAction.getCurrentUser();
  }

  componentDidUpdate(): boolean {
    this.children.EmailInput.children.Input
      .setProps({ value: this.props?.storeUser?.email });
    this.children.LoginInput.children.Input
      .setProps({ value: this.props?.storeUser?.login });
    this.children.FirstNameInput.children.Input
      .setProps({ value: this.props?.storeUser?.first_name });
    this.children.SecondNameInput.children.Input
      .setProps({ value: this.props?.storeUser?.second_name });
    this.children.NicknameInput.children.Input
      .setProps({ value: this.props?.storeUser?.display_name });
    this.children.PhoneInput.children.Input
      .setProps({ value: this.props?.storeUser?.phone });
    this.children.PasswordInput.children.Input
      .setProps({ value: this.props?.storeUser?.password });
    this.children.ProfileAvatar
      .setProps({ avatarUrl: this.props.storeUser?.avatar });
    return true;
  }

  render(): string {
    return (`
            <div class='profile'>
            <aside class='profile_asside asside'>
                 {{{BackButton}}}
            </aside>
            <main class='profile_main'>
               {{{ProfileAvatar}}}
                <form class='profile_form'>
                    {{{EmailInput}}}
                    {{{LoginInput}}}
                    {{{FirstNameInput}}}
                    {{{SecondNameInput}}}
                    {{{NicknameInput}}}
                    {{{PhoneInput}}}
                    {{{PasswordInput}}}

                    {{{ChangeDataButton}}}
                   

                </form>
                <form class='profile_form'>
                    {{{ChangePasswordButton}}}
                    {{{OldPasswordInput}}}
                    {{{NewPasswordInput}}}
                    {{{ExitButton}}}
                </form>
               
            </main>
        </div>

        `);
  }
}

export default connect((
  {storeUser,
    passwordUpdated }) => ({ 
      storeUser, 
      passwordUpdated }))
  (ProfilePage as unknown as typeof Block);
