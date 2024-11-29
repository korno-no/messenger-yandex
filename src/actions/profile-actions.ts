import UserApi from '@api/user-api';
import { User, PasswordUpdate } from '@utils/types';

export class ProfileActions {
  public async update(data: User) {
    await UserApi.update(data);
  }

  public async updatePassword(data: PasswordUpdate) {
    const response = await UserApi.updatePassword(data);
    window.store.set({ passwordUpdated: response });
  }

  public async updateAvatar(file: File) {
    const result = await UserApi.updateAvatar(file);
    window.store.set({ storeUser: result });
  }
}
