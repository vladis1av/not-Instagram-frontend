import { useEffect } from 'react';

const useChangeDocumentTitle = (valueToChange) => {
  const defaultValue = document.title;

  useEffect(() => {
    if (defaultValue && valueToChange) {
      document.title = valueToChange;
    }
    return () => {
      document.title = defaultValue;
    };
  }, [valueToChange]);
};

export default useChangeDocumentTitle;
