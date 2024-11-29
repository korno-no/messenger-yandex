import { User, PasswordUpdate } from '@utils/types';
import { baseUrl } from '@utils/const';
import HTTP from '../core/http';
import { BaseAPI } from './base-api';

const userApi = new HTTP(`${baseUrl}/user`);

class UserApi extends BaseAPI {
  update(data: User) {
    return userApi.put('/profile', { data, headers: { 'content-type': 'application/json' } });
  }

  updatePassword(data: PasswordUpdate) {
    return userApi.put('/password', { data, headers: { 'content-type': 'application/json' } });
  }

  updateAvatar(file: File) {
    const data = new FormData();
    data.append('avatar', file);
    return userApi.put('/profile/avatar', { data });
  }
}
export default new UserApi();
