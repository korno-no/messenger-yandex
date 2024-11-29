import AuthApi from '@api/auth-api';
import { User, SignIn } from '@utils/types';
import { Page } from 'main';

export class AuthAction {
  public async createNewUser(data: User) {
    await AuthApi.create(data);
    this.login();
  }

  public async signin(data: SignIn) {
    AuthApi.signin(data);
    this.login();
  }

  public async logout() {
    await AuthApi.logout();
    window.router.go(Page.login);
  }

  public async login() {
    await this.getCurrentUser();
    window.router.go(Page.messenger);
  }

  public async getCurrentUser() {
    const user = await AuthApi.request();
    window.store.set({ storeUser: user });
  }
}
