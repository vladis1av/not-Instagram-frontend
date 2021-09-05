import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Icon, Image, Button, Menu } from '../index';
import { logout } from '../../redux/reducers/user/userAction';
import { modalShow } from '../../redux/reducers/modal/modalAction';
import { selectUnreadDialogs } from '../../redux/reducers/dialogs/dialogsSelectors';
import { selectCurrentUser } from '../../redux/reducers/user/userSelectors';
import { fetchUnreadDialogsCount } from '../../redux/reducers/dialogs/dialogsAction';
import socket from '../../core/socket';
import logo from '../../assets/images/instagram-logo.svg';
import './Header.scss';

export default function Header() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => selectCurrentUser(state));
  const unreadDialogs = useSelector((state) => selectUnreadDialogs(state));

  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const {
    location: { pathname },
  } = useHistory();

  const handlerSingOut = () => {
    dispatch(logout());
  };

  const addPostHandler = () => {
    dispatch(
      modalShow({
        component: 'UploadImages',
      }),
    );
  };

  const menuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const getUnreadDialogsCount = async () => {
    dispatch(fetchUnreadDialogsCount());
  };

  useEffect(() => {
    getUnreadDialogsCount();

    socket.on('SERVER:NEW_MESSAGE', getUnreadDialogsCount);
    return () => {
      socket.removeListener('SERVER:NEW_MESSAGE', getUnreadDialogsCount);
    };
  }, []);

  return (
    <header className="header">
      <div className="header__navbar">
        <div className="header__navbar__logo">
          <div style={{ maxWidth: '128px' }}>
            <Link to="/" className="link-logo">
              <div className="logo-container  d-flex align-center default-link">
                <span className="fw-bold">not</span>
                <img src={logo} alt="not Instagram logo" />
              </div>
            </Link>
          </div>
        </div>
        <div
          className={`header__navbar__search-input ${
            searchValue.trim() && 'header__navbar__search-input__label--hide'
          }`}>
          <input
            id="searchInput"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <label htmlFor="searchInput">Поиск</label>
        </div>
        <div className="nav-menu">
          <div className="nav-menu__item">
            <Link to="/" className="default-link">
              <Icon
                name={pathname === '/' ? 'home-active' : 'home'}
                size="22"
              />
            </Link>
          </div>
          <div className="nav-menu__item">
            <Link to="/direct" className="default-link">
              {unreadDialogs > 0 && (
                <div className="dialog-unread">
                  <div className="dialog-unread__total-count">
                    {unreadDialogs > 9 ? '9+' : unreadDialogs}
                  </div>
                </div>
              )}
              <Icon
                name={
                  pathname.split('/')[1] === 'direct'
                    ? 'direct-active'
                    : 'direct'
                }
                size="22"
              />
            </Link>
          </div>
          <div className="nav-menu__item">
            <Button variant="transparent" onClick={addPostHandler}>
              <Icon name="add" size="22" />
            </Button>
          </div>
          <div className="nav-menu__item">
            <Link to="/explore" className="default-link">
              <Icon
                name={pathname === '/explore' ? 'explore-active' : 'explore'}
                size="22"
              />
            </Link>
          </div>
          <div className="nav-menu__item">
            <Button
              variant="transparent"
              className="nav-menu__item__heart"
              onClick={() => {
                setNotificationOpen(true);
              }}>
              <span>
                <Icon
                  name={notificationOpen && true ? 'heart-active' : 'heart'}
                  size="22"
                />
              </span>

              {/* {notificationOpen && <NotificationsCard />} */}
            </Button>
          </div>
          <div
            className={`nav-menu__close-panel ${
              menuOpen || notificationOpen
                ? 'nav-menu__close-panel--active'
                : ''
            }`}
            onClick={() => {
              setMenuOpen(false);
              setNotificationOpen(false);
            }}></div>
          <div
            className={`nav-menu__profile-photo ${
              currentUser &&
              pathname === '/user/' + currentUser.username &&
              'nav-menu__profile-photo--active'
            }
                `}
            onClick={menuToggle}>
            <Image
              circle
              src={currentUser && currentUser.profileAvatar}
              alt="user profile photo"
              width="28"
              height="28"
            />
            {menuOpen && (
              <Menu
                handlerSingOut={handlerSingOut}
                currentUser={currentUser}
                onMenuOpen={menuToggle}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
