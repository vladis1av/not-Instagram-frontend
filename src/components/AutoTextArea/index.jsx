import { useState, useEffect, useRef } from 'react';

import './AutoTextArea.scss';

const AutoTextArea = ({ value, onChange, ...rest }) => {
  const textAreaRef = useRef(null);
  const [textAreaHeight, setTextAreaHeight] = useState('auto');

  useEffect(() => {
    if (textAreaRef.current.scrollHeight <= 90) {
      setTextAreaHeight(`${textAreaRef.current.scrollHeight}px`);
    }
  }, [value]);

  const onChangeHandler = (e) => {
    if (!e.target.value.trim()) {
      setTextAreaHeight('auto');
    }
    onChange(e);
  };
  return (
    <textarea
      {...rest}
      ref={textAreaRef}
      rows={1}
      style={{
        height: textAreaHeight,
      }}
      onChange={onChangeHandler}
    />
  );
};

export default AutoTextArea;
