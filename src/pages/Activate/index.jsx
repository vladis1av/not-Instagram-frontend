import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setUser, setUserLoading } from '../../redux/reducers/user/userAction';
import { loadingStatusTypes } from '../../redux/reducers/user/userTypes';
import { authApi } from '../../services/api/';
import './Activate.scss';

const Activate = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserLoading(loadingStatusTypes.NEVER));
    const hash = window.location.pathname.split('/').pop();

    if (hash) {
      authApi
        .verify(hash)
        .then(({ data }) => {
          window.localStorage.setItem('token', data.token);
          dispatch(setUser(data));
          dispatch(setUserLoading(loadingStatusTypes.SUCCESS));
        })
        .catch(() => {
          dispatch(setUserLoading(loadingStatusTypes.LOADED));
        });
    }
  }, []);

  return null;
};

export default Activate;
