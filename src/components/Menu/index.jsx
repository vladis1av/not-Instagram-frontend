import { Link } from 'react-router-dom';

import { Icon } from '../';
import './Menu.scss';

const Menu = ({ currentUser, onMenuOpen, handlerSingOut }) => {
  return (
    <div className="menu" onClick={onMenuOpen}>
      <Link
        className="menu__item"
        to={`/user/${currentUser.username}`}
        style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="menu__arrow-top"></div>
        <Icon name="user" size="16" />
        <span>Профиль</span>
      </Link>
      <div className="menu__item">
        <Icon name="saved" size="16" />
        <span>Сохраненное</span>
      </div>
      <Link to="/settings/edit" className="menu__item">
        <Icon name="settings" size="16" />
        <span>Настройки</span>
      </Link>
      <div className="menu__item" onClick={handlerSingOut}>
        <span>Выйти</span>
      </div>
    </div>
  );
};

export default Menu;
