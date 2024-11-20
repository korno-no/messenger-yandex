
import ChatsApi from "@api/chats-api";
import { ContactCard } from "components";
export class ChatsActions {

    public async getChats()  {
        const response = await ChatsApi.request();
        window.store.set({'storeChats': response})
    }
    public async createChat(data: string) {  
        const finaldata = {title:data} 
        const response = await ChatsApi.createChat(finaldata);
        this.getChats()
    }

    public async deleteChat(chatId: number)  {
        const response = await ChatsApi.delete(chatId);
        this.getChats()
    }

   /* {
        "users": [
          0
        ],
        "chatId": 0
      }*/
    public async addUsersToChat(users: string, chatId: number)  {
        const usersArray = users.split(',').map((user) => parseInt(user, 10));

        const response = await ChatsApi.addUsers({
            users: usersArray, 
            chatId: chatId 
        });
    }




} 
