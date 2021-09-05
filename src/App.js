import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import { useHistory } from 'react-router-dom';

import { AppLoader, PrivateRoute, Layout, Modal } from './components';
import {
  Activate,
  Auth,
  Direct,
  Home,
  Profile,
  Explore,
  Settings,
} from './pages/';
import { checkAuth } from './redux/reducers/user/userAction';
import { selectIsReady } from './redux/reducers/user/userSelectors';

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuth } = useSelector(({ user }) => user);
  const { modals } = useSelector(({ modal }) => modal);
  const isReady = useSelector((state) => selectIsReady(state));

  const renderModals = () => {
    if (modals.length > 0) {
      document.querySelector('body').setAttribute('style', 'overflow: hidden;');
      return modals.map((modal, i) => (
        <Modal key={i} component={modal.component} {...modal.props} />
      ));
    } else {
      document.querySelector('body').setAttribute('style', '');
    }
  };

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  useEffect(() => {
    if (!isAuth && isReady) {
      history.push('/signin');
    } else if (history.location.pathname === '/signin') {
      history.push('/');
    }
  }, [isAuth, isReady]);

  if (!isReady) {
    return <AppLoader />;
  }

  return (
    <div className="app">
      {renderModals()}
      <Switch>
        <Route path={['/auth', '/signin', '/signup']} component={Auth} />
        <Layout>
          <Route path="/user/activate/:hash" component={Activate} />
          <Route path="/user/:id" component={Profile} />
          <PrivateRoute path="/explore" component={Explore} isAuth={isAuth} />
          <PrivateRoute
            path="/settings/edit"
            component={Settings}
            isAuth={isAuth}
          />
          <PrivateRoute
            exact
            path={['/direct', '/direct/:id']}
            component={Direct}
            isAuth={isAuth}
          />
          <PrivateRoute exact path="/" component={Home} isAuth={isAuth} />
        </Layout>
      </Switch>
    </div>
  );
}

export default App;
