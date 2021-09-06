import classNames from 'classnames';
import { useState, useRef, useEffect } from 'react';

import { Icon, Button, EmojiPicker } from '../';
import './Textarea.scss';

const Textarea = ({ chat, post, onSend, api }) => {
  const textareaStyles = classNames(
    'textarea',
    { 'textarea--chat': chat },
    { 'textarea--post': post },
  );

  const textAreaRef = useRef(null);
  const [message, setMessage] = useState('');
  const [textAreaHeight, setTextAreaHeight] = useState('auto');

  const HandleSendMessage = async (e) => {
    if (message.trim() && e.keyCode === 13) {
      await api(message);
      textAreaRef.current.style.height = 34 + 'px';
      setMessage('');
    }
  };

  const onChangeHandler = (e) => {
    setTextAreaHeight('auto');
    setMessage(e.target.value);
  };

  const moveFocusCaretAtEnd = (e) => {
    const tempValue = e.target.value;
    e.target.value = '';
    e.target.value = tempValue;
  };

  useEffect(() => {
    setTextAreaHeight(`${textAreaRef.current.scrollHeight}px`);
    if (chat && textAreaRef.current) textAreaRef.current.focus();
  }, [message, textAreaHeight, textAreaRef]);

  return (
    <div className={textareaStyles}>
      <div className="textarea__content">
        <EmojiPicker message={message} messageHandler={setMessage} />
        <textarea
          rows={1}
          value={message}
          ref={textAreaRef}
          onKeyDown={(e) => HandleSendMessage(e)}
          onFocus={(e) => moveFocusCaretAtEnd(e)}
          onChange={(e) => onChangeHandler(e)}
          style={{
            height: textAreaHeight,
          }}
          placeholder={
            !post ? 'Напишите сообщение...' : 'Добавьте комментарий...'
          }
        />
        {message.trim() === '' && !post ? (
          <div className="textarea__content__add-atachments">
            <Icon
              name="photo"
              size="24px"
              className="textarea__content__add-atachments__icon"
            />
            <Icon
              name="heart"
              size="24px"
              className="textarea__content__add-atachments__icon"
            />
          </div>
        ) : (
          <Button
            variant="primary--outline"
            disabled={!message.trim()}
            onClick={onSend}>
            {!post ? 'Отправить' : 'Опубликовать'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Textarea;
