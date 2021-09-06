import { useEffect, useRef, useState } from 'react';

import { Textarea, ChatMessageItem, ChatStatus } from '../';
import { useChangeDocumentTitle } from '../../hooks';
import messageApi from '../../services/api/messageApi';
import socket from '../../core/socket';
import './Chat.scss';

const Chat = ({ currentUser, currentDialog }) => {
  const ref = useRef();
  const [currentMessage, setCurrentMessage] = useState(null);
  const [messages, setMessages] = useState([]);

  const fetchMessages = async (id) => {
    const { data } = await messageApi.getAllByDialogId(id);
    setMessages(data);
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

  const onAddMessage = async (message) => {
    try {
      const data = await messageApi.send(message, currentDialog);
      return data;
    } catch (error) {
      console.log(error);
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
      </div>
      <Textarea chat api={onAddMessage} />
    </div>
  );
};

export default Chat;
