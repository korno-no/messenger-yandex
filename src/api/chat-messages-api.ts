import HTTP from '../core/http';
import { BaseAPI } from './base-api';

const chatMessagesAPIInstance = new HTTP('api/v1/messages');

export default class ChatMessagesAPI extends BaseAPI {
    request(id: number) {
        return chatMessagesAPIInstance.get(`/${id}`,{});
    }
}