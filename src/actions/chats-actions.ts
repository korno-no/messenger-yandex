import ChatsApi from '@api/chats-api';
import ChatMessagesApi from '@api/chat-messages-api';

let chaInterval: number | undefined 

export class ChatsActions {
  public async getChats() {
    const response = await ChatsApi.request();
    window.store.set({ storeChats: response });
    this.setInterval();
  }

  public setInterval(){
    chaInterval = setInterval(async () => {
      const updatedResponse = await ChatsApi.request();
      window.store.set({ storeChats: updatedResponse });
    }, 5000);
  }

  public clearInterval(){
    clearInterval(chaInterval);
  }

  public async createChat(data: string) {
    await ChatsApi.createChat({ title: data });
    this.getChats();
  }

  public async deleteChat(chatId: number) {
    await ChatsApi.delete(chatId);
    this.getChats();
  }

  public async addUsersToChat(users: string, chatId: number) {
    const usersArray = users.split(',').map((user) => parseInt(user, 10));
    await ChatsApi.addUsers({
      users: usersArray,
      chatId,
    });
  }

  public async deleteUsersFromChat(users: string, chatId: number) {
    const usersArray = users.split(',').map((user) => parseInt(user, 10));
    await ChatsApi.deleteUsers({
      users: usersArray,
      chatId,
    });
  }

  public async uploadChatAvatar(avatar: FormData) {
    const response = await ChatsApi.uploadAvatar(avatar);
    return response;
  }

  //  messages
  public async startConversation(userId: number, chatId: number) {
    try {
      const tokenResponse = await ChatMessagesApi.getToken(chatId)as { token: string } | any;
      if ('token' in tokenResponse) {
        await ChatMessagesApi.estWsConnection(userId, chatId, tokenResponse.token);
        ChatMessagesApi.getMessages();
      } else {
        console.error('Invalid response structure');
      }
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }

  public async sendMessage(message: string) {
    const response = await ChatMessagesApi.sendMessage(message);
    console.log(response);
  }
}
