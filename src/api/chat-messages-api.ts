import HTTP from '@core/http';
import WsTransport from '@core/ws';
import { baseUrl } from '@utils/const';
import { BaseAPI } from './base-api';

const chatsAPIInstance = new HTTP(`${baseUrl}/chats`);

class ChatMessagesApi extends BaseAPI {
  ws!: WsTransport;

  getToken(chatId: number) {
    return chatsAPIInstance.post(`/token/${chatId}`, {
      headers: { 'content-type': 'application/json' },
    });
  }

  async estWsConnection(userId: number, chatId: number, token: string) {
    if (this.ws) {
      this.ws.closeConnetion();
    }
    this.ws = new WsTransport(userId, chatId, token);
    await this.ws.waitForConnection(); // Wait for WebSocket to be ready
  }

  sendMessage(content: string) {
    this.ws.sendMessage(content, 'message');
  }

  getMessages() {
    this.ws.sendMessage('0', 'get old');
  }
}
export default new ChatMessagesApi();
