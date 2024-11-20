import HTTP from "../core/http";
import { BaseAPI } from "./base-api";
import { baseUrl } from "@utils/const";


const chatsAPIInstance = new HTTP(`${baseUrl}/chats`);

class ChatsAPI extends BaseAPI {
    request() {
        return chatsAPIInstance.get("", {});
    }
    createChat(data: Record<string, string>){
        return chatsAPIInstance.post("", {
            data,
            headers: {'content-type': 'application/json'}
        });
    }
    delete(chatId: number){
        return chatsAPIInstance.delete("", 
            {data:{chatId:chatId},
            headers: {'content-type': 'application/json'}
        });
    }
    addUsers(data: { users: number[]; chatId: number; }){
        return chatsAPIInstance.put("/users", {
            data,
            headers: {'content-type': 'application/json'}
        }); 
    }
    getCommonChat(chatId: number){
        return chatsAPIInstance.get(`${chatId}/common`, {
            headers: {'content-type': 'application/json'}
        });

    }

}
export default new ChatsAPI();
