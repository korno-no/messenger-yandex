import AuthApi from "@api/auth-api";
import ChatsAPI from "@api/chats-api";
import { User, SignIn } from "@utils/types";
import { Page } from "main";
import { ChatsActions } from "./chats-actions";

export class AuthAction{

    chatsActions = new ChatsActions()
    public async createNewUser(data: User)  {
        const response = await AuthApi.create(data);
        this.getCurrentUser()
        window.router.go(Page.messenger);
    }

    public async signin(data: SignIn)  {
        const response = await AuthApi.signin(data);
        this.getCurrentUser()
        window.router.go(Page.messenger);
    }

    public async logout()  {
        const response = await AuthApi.logout();
        window.router.go(Page.login);
    }

    public async getCurrentUser()  {
        const user = await AuthApi.request();
        const chats = await this.chatsActions.getChats();
        window.store.set({'storeUser': user})
        window.router.go(Page.messenger);
        
    }
} 