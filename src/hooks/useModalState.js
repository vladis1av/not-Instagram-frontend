import { useState } from 'react';

const useModalState = ({ initialOpen = false } = {}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return [isOpen, onToggle];
};

export default useModalState;
