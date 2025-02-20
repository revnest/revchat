import axios from 'axios';
import { ChatObject, UserAuthHeaders } from '../../interfaces';

interface NewChat {
  is_direct_chat?: boolean;
  usernames: string[];
}

export const getOrCreateChat = (
  host: string = 'https://chat.revnest.com',
  headers: UserAuthHeaders,
  data: NewChat,
  callback: (chat: ChatObject) => void
) => {
  axios
    .put(`${host}/chats/`, data, {
      headers,
    })

    .then((response) => {
      callback && callback(response.data);
    })

    .catch((error) => {
      console.log('Get or Create Chat Error', error);
    });
};
