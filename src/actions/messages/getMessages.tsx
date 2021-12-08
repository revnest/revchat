import { MessagesProps } from '../../interfaces';

import axios from 'axios';
import _ from 'lodash';

type GetMessages = (
  projectId: string,
  myUsername: string,
  mySecret: string,
  chatId: number,
  messageCount: number,
  callback: (chatId: number, messages: MessagesProps) => void
) => void;

export const getMessages: GetMessages = (
  projectId,
  myUsername,
  mySecret,
  chatId,
  messageCount,
  callback
) => {
  axios
    .get(
      `http://127.0.0.1:8000/chats/${chatId}/messages/latest/${messageCount}/`,
      {
        headers: {
          'Public-Key': projectId,
          'User-Name': myUsername,
          'User-Secret': mySecret,
        },
      }
    )
    .then((response) => {
      // props.onGetMessages && props.onGetMessages(chatId, response.data)
      callback(chatId, _.mapKeys(response.data, 'created'));
    })
    .catch((error) => {
      console.log('Fetch Latest Messages Error', error);
    });
};
