import { User, SignIn } from '../utils/types.ts';
import { baseUrl } from '../utils/const.ts';
import HTTP from '../core/http.ts';
import { BaseAPI } from './base-api.ts';

const authApi = new HTTP(`${baseUrl}/auth`);

class AuthApi extends BaseAPI {
  create(data: User) {
    return authApi.post('/signup', { data, headers: { 'content-type': 'application/json' } });
  }

  signin(data: SignIn) {
    return authApi.post('/signin', { data, headers: { 'content-type': 'application/json' } });
  }

  logout() {
    return authApi.post('/logout', {});
  }

  request() {
    return authApi.get('/user', {});
  }

  changeAvatar() {

  }
}
export default new AuthApi();
