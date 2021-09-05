import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';

import './Modal.scss';
import { modalHide } from '../../redux/reducers/modal/modalAction';
import { useDispatch } from 'react-redux';

const Modal = ({ component, hideModal, ...additionalProps }) => {
  const dispatch = useDispatch();
  const modalRoot = document.querySelector('.app');
  const el = document.createElement('div');
  const Child = require(`../../components/${component}`).default;
  el.className = 'modal-overlay';

  useEffect(() => {
    const hide = ({ target }) => {
      if (target === el || !el.contains(target)) {
        dispatch(modalHide(component));
      }
    };
    el.addEventListener('mousedown', hide, false);
    modalRoot.appendChild(el);

    return () => {
      el.removeEventListener('mousedown', hide, false);
      modalRoot.removeChild(el);
    };
  }, [el, modalRoot, hideModal, component]);

  return ReactDOM.createPortal(
    <Child hide={() => dispatch(modalHide(component))} {...additionalProps} />,
    el,
  );
};

export default Modal;
