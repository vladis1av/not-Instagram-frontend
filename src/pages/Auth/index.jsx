import { Route } from 'react-router-dom';

import { LoginForm, RegisterForm } from '../../components/';
import './Auth.scss';

const Auth = () => {
  return (
    <section className="auth">
      <div className="auth__content">
        <Route exact path="/signin" component={LoginForm} />
        <Route exact path="/signup" component={RegisterForm} />
      </div>
    </section>
  );
};

export default Auth;
