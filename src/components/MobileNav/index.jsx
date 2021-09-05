import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { Icon, Button, Image } from '../../components/';
import { selectCurrentUser } from '../../redux/reducers/user/userSelectors';
import './MobileNav.scss';

const MobileNav = () => {
  let { pathname } = useLocation();
  const currentUser = useSelector((state) => selectCurrentUser(state));

  return (
    <nav className="bottom-nav">
      <Link to="/" className="bottom-nav__menu-item">
        <Icon name={pathname === '/' ? 'home-active' : 'home'} size="24px" />
      </Link>
      <Link to="/explore" className="bottom-nav__menu-item">
        <Icon
          name={pathname === '/explore' ? 'search-active' : 'search'}
          size="24px"
        />
      </Link>
      <Button className="bottom-nav__menu-item" variant="transparent">
        <Icon name="add" size="24px" />
      </Button>
      <Button className="bottom-nav__menu-item" variant="transparent">
        <Icon name={'heart'} size="24px" />
      </Button>
      <Link
        className="bottom-nav__menu-item"
        to={`/user/${currentUser && currentUser.username}`}>
        <Image
          src={currentUser && currentUser.profileAvatar}
          width="24"
          height="24"
          alt="user profile photo"
          circle
        />
      </Link>
    </nav>
  );
};

export default MobileNav;
