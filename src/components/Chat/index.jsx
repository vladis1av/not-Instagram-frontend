import { useEffect, useRef, useState } from 'react';

import { Textarea, ChatMessageItem, ChatStatus } from '../';
import { useChangeDocumentTitle } from '../../hooks';
import messageApi from '../../services/api/messageApi';
import socket from '../../core/socket';
import './Chat.scss';
import ItemsLoader from '../ItemsLoader';

const Chat = ({ currentUser, currentDialog }) => {
  const ref = useRef();
  const [currentMessage, setCurrentMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageValue, setMessageValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessageHandler = () => {
    messageApi
      .send(messageValue, currentDialog)
      .then(() => {
        setMessageValue('');
      })
      .catch((error) => console.log(error));
  };

  const fetchMessages = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await messageApi.getAllByDialogId(id);
      setMessages(data);
    } catch (error) {
      console.error(error);
      alert('Произошла ошибка при загрузке сообщений');
    } finally {
      setIsLoading(false);
    }
  };

  const setCurrentMessageId = (id) => setCurrentMessage(id);

  const fetchNewMessages = (data) => {
    setMessages((prevState) => [...prevState, data]);
  };

  const removeMessage = ({ id }) => {
    setCurrentMessage(id);
    if (messages.includes(currentMessage)) {
      const filteredMessages = messages.filter(
        (item) => item.id !== currentMessage,
      );
      setMessages(filteredMessages);
    }
  };

  useChangeDocumentTitle('not-Instagram • Direct');

  useEffect(() => {
    if (currentDialog) {
      fetchMessages(currentDialog);
    }
    socket.on('SERVER:NEW_MESSAGE', fetchNewMessages);
    socket.on('SERVER:REMOVED_MESSAGE', removeMessage);
    return () => {
      socket.removeListener('SERVER:NEW_MESSAGE', fetchNewMessages);
      socket.removeListener('SERVER:REMOVED_MESSAGE', removeMessage);
    };
  }, [currentDialog, currentMessage]);

  useEffect(() => {
    ref.current.scrollTo(0, 999999);
  }, [messages]);

  return (
    <div className="chat">
      <ChatStatus />
      <div className="chat__messages" ref={ref}>
        {!isLoading ? (
          <div>
            {messages.map((message) => {
              return (
                <ChatMessageItem
                  key={message._id}
                  message={message}
                  isMe={message.user._id === currentUser._id}
                  setCurrentMessage={setCurrentMessageId}
                />
              );
            })}
          </div>
        ) : (
          isLoading && <ItemsLoader size="30px" center />
        )}
      </div>
      <Textarea
        chat
        value={messageValue}
        setValue={setMessageValue}
        sendMessage={sendMessageHandler}
      />
    </div>
  );
};

export default Chat;
