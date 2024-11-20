import UserApi from "@api/user-api";
import { User, PasswordUpdate } from "@utils/types";


export class ProfileActions {

    public async update(data: User)  {
        const response = await UserApi.update(data);
        window.store.set({'storeUser': data})
    }
    public async updatePassword(data: PasswordUpdate)  {
        const response = await UserApi.updatePassword(data);
        window.store.set({'passwordUpdated': response})
    }
} 
