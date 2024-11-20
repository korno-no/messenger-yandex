import Block, { BlockProps } from '@core/block';
import Validation from '@utils/validation';
import { Button, Input, InputWrapper } from '../../components';
import { SignIn } from "@utils/types";
import { AuthAction } from 'actions/auth-actions';


interface ILoginProps extends BlockProps {
    title: string;
    settings: {withInternalID: true},
    onClick?: () => void;
    events?: { [key: string]: EventListener };
}

export default class LoginPage extends Block <ILoginProps> {
  authAction= new AuthAction();
  constructor(props: ILoginProps) {
    super({
      ...props,
      title: 'Login Page',
    });
  this.authAction.getCurrentUser()

  }
  
  init() {
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
    const ButtonSignIn = new Button({
      mode: 'primary',
      text: 'Sign in',
      type: 'submit',
      settings: { withInternalID: true },
      onClick: (e: Event) => {
        e.preventDefault();
        this.onSignIn(e);
      },
    });
    const ButtonSignUp = new Button({
      mode: 'link',
      text: 'Sign up',
      settings: { withInternalID: true },
      onClick: (e: Event) => {
        e.preventDefault();
        this.onSignUp();
      },
    });
    this.children = {
      ...this.children,
      LoginInput,
      PasswordInput,
      ButtonSignIn,
      ButtonSignUp,
    };
  }

  onSignIn(event: Event) {
    const form = (event.target as HTMLElement).closest("form") as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as SignIn;
    const invalidFields = Validation.validateFrom(data);
    if(invalidFields.length > 0){
      Object.values(this.children).forEach( child => {
        if(child.name && invalidFields.includes(child.name)){
          child.setProps({ error: true });
        } 
      })
    }
    else{ 
      this.authAction.signin(data);
    }
  }


  onSignUp() {
    window.router.go('/registration')
  }

  render(): string {
    return (`
            <div class='wrapper'>
                    <div class='modal'>
                        <h1 class='wrapper_title'>{{title}}</h1>
                        <form class='login_form'>
                            {{{LoginInput}}}
                            {{{PasswordInput}}}
                            {{{ButtonSignIn}}}
                        </form>
                        {{{ButtonSignUp}}}
                </div>
            </div>
        `);
  }
}
