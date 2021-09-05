import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth === true ? <Component {...props} /> : <Redirect to="/signin" />
    }
  />
);

export default PrivateRoute;
