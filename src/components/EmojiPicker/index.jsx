import { Picker } from 'emoji-mart';
import { useRef, useState } from 'react';

import { useOutside } from '../../hooks';
import { Button, Icon } from '../';
import './EmojiPicker.scss';

const EmojiPicker = ({ message, messageHandler }) => {
  const emojiRef = useRef(null);
  const [emojiVisible, setEmojiVisible] = useState(false);

  useOutside(emojiRef, () => setEmojiVisible(false));

  const toggleEmojiVisible = () => {
    setEmojiVisible(!emojiVisible);
  };

  const addEmoji = (e) => {
    const sym = e.unified.split('-');
    const codesArray = [];
    sym.forEach((el) => codesArray.push('0x' + el));
    const emoji = String.fromCodePoint(...codesArray);
    messageHandler((message + '' + emoji).trim());
  };

  return (
    <div className="emoji-picker-wrapper">
      <div className="emoji-picker" ref={emojiRef}>
        {emojiVisible && (
          <Picker
            native={true}
            enableFrequentEmojiSort={true}
            showPreview={false}
            showSkinTones={false}
            emojiSize={32}
            sheetSize={20}
            onSelect={(emojiTag) => addEmoji(emojiTag)}
          />
        )}
      </div>
      <Button variant="transparent" onClick={toggleEmojiVisible}>
        <Icon name="smile" size="24px" />
      </Button>
    </div>
  );
};

export default EmojiPicker;
