import classNames from 'classnames';
import { useState, useRef, useEffect } from 'react';

import { Icon, Button, EmojiPicker } from '../';
import './Textarea.scss';

//разгрести этот щедевр
const Textarea = ({ chat, post, value, setValue, sendMessage }) => {
  const textareaStyles = classNames(
    'textarea',
    { 'textarea--chat': chat },
    { 'textarea--post': post },
  );

  const textAreaRef = useRef(null);
  const [textAreaHeight, setTextAreaHeight] = useState('auto');
  const valueIsNotEmpty = value.trim();

  const sendMessageOnKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      sendMessage();
    }
  };

  const onChangeHandler = (e) => {
    setTextAreaHeight('auto');
    setValue(e.target.value);
  };

  useEffect(() => {
    if (!valueIsNotEmpty) {
      textAreaRef.current.style.height = 34 + 'px';
    }
  }, [valueIsNotEmpty]);

  const moveFocusCaretAtEnd = (e) => {
    const tempValue = e.target.value;
    e.target.value = '';
    e.target.value = tempValue;
  };

  useEffect(() => {
    setTextAreaHeight(`${textAreaRef.current.scrollHeight}px`);
    if (chat && textAreaRef.current) textAreaRef.current.focus();
  }, [value, textAreaHeight, textAreaRef]);

  return (
    <div className={textareaStyles}>
      <div className="textarea__content">
        <EmojiPicker message={value} messageHandler={setValue} />
        <textarea
          rows={1}
          value={value}
          ref={textAreaRef}
          onKeyDown={(e) => sendMessageOnKeyPress(e)}
          onFocus={(e) => moveFocusCaretAtEnd(e)}
          onChange={(e) => onChangeHandler(e)}
          style={{
            height: textAreaHeight,
          }}
          placeholder={
            !post ? 'Напишите сообщение...' : 'Добавьте комментарий...'
          }
        />
        {!valueIsNotEmpty && !post ? (
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
            disabled={!valueIsNotEmpty}
            onClick={sendMessage}>
            {!post ? 'Отправить' : 'Опубликовать'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Textarea;
