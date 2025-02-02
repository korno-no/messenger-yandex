import Block, { BlockProps } from '../../core/block.ts';
import Validation from '../../utils/validation.ts';
import { Button, Input, InputWrapper } from '../../components/index.ts';
import { User } from '../../utils/types.ts';
import { AuthAction } from '../../actions/auth-actions.ts';
import { Page } from '../../main.ts';

export default class RegistrationPage extends Block {
  authAction = new AuthAction();

  constructor(props:BlockProps) {
    super({
      ...props,
      title: 'Registration Page',
    });
    this.authAction.logout(false);
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
        settings: { withInternalID: true },
        id: 'SecondNameInput',
        onBlur: (e: Event) => {
          const { value } = (e.target as HTMLInputElement);
          SecondNameInput.setProps({ error: !Validation.validate(value, 'second_name') });
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
        settings: { withInternalID: true },
        onBlur: (e: Event) => {
          const { value } = (e.target as HTMLInputElement);
          PasswordInput.setProps({ error: !Validation.validate(value, 'password') });
        },
      }),
    });
    const PasswordConfirmInput = new InputWrapper({
      type: 'password',
      name: 'password_confirm',
      label: 'password confirm',
      error: false,
      settings: { withInternalID: true },
      Input: new Input({
        type: 'password',
        name: 'password_confirm',
        label: 'password confirm',
        id: 'PasswordConfirmInput',
        settings: { withInternalID: true },
        onBlur: (e: Event) => {
          const { value } = (e.target as HTMLInputElement);
          PasswordConfirmInput.setProps({ error: !Validation.validate(value, 'password_confirm') });
        },
      }),
    });
    const ButtonSignUp = new Button({
      mode: 'primary',
      text: 'Sign up',
      type: 'submit',
      settings: { withInternalID: true },
      onClick: (e: Event) => {
        e.preventDefault();
        this.onSignUp(e);
      },
    });
    const ButtonSignIn = new Button({
      mode: 'link',
      text: 'Sign in',
      settings: { withInternalID: true },
      onClick: (e: Event) => {
        e.preventDefault();
        this.onSignIn();
      },
    });

    this.children = {
      ...this.children,
      EmailInput,
      LoginInput,
      FirstNameInput,
      SecondNameInput,
      PhoneInput,
      PasswordInput,
      PasswordConfirmInput,
      ButtonSignIn,
      ButtonSignUp,
    };
  }

  onSignUp(event: Event) {
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
      this.authAction.createNewUser(data);
    }
  }

  onSignIn() {
    window.router.go(Page.login);
  }

  render(): string {
    return (`
            <div class='wrapper'>
                    <div class='modal'>
                        <h1 class='wrapper_title'>{{title}}</h1>
                        <form class='registration_form' id='registrationForm'>
                            {{{EmailInput}}}
                            {{{LoginInput}}}
                            {{{FirstNameInput}}}
                            {{{SecondNameInput}}}
                            {{{PhoneInput}}}
                            {{{PasswordInput}}}
                            {{{PasswordConfirmInput}}}
                            {{{ButtonSignUp}}}
                        </form>
                        {{{ButtonSignIn}}}
                </div>
            </div>
        `);
  }
}
