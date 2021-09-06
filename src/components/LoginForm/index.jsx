import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import { login } from '../../redux/reducers/user/userAction';
import { Button } from '../';
import { useChangeDocumentTitle } from '../../hooks';
import logo from '../../assets/images/instagram-logo.svg';

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleClickSubmit = async (data, e) => {
    dispatch(login(data));
  };

  const validationSchema = yup.object().shape({
    login: yup.string().max(50).required('Введите E-mail или username'),
    password: yup.string().min(8).required('Введите свой пароль'),
  });

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleClickSubmit,
  });

  useChangeDocumentTitle('Войти • not-Instagram');

  return (
    <>
      <div className="form-block">
        <div className="form-login__wrapper">
          <div className="form-login__wrapper__logo">
            <span>not</span>
            <img src={logo} alt="" height="51px" width="175px" />
          </div>
          <div className="form-wrapper">
            <form onSubmit={formik.handleSubmit}>
              <div className="form__group">
                <input
                  className="form__input form__input--with-valdation-icon"
                  id="login"
                  type="login"
                  name="login"
                  onBlur={formik.handleBlur}
                  placeholder=" "
                  onChange={formik.handleChange}
                  values={formik.values.login}
                />
                <label className="form__label" htmlFor="login">
                  Email или username
                </label>
              </div>
              <div className="form__group">
                <input
                  className="form__input"
                  id="password"
                  type="password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  values={formik.values.password}
                  placeholder=" "
                />
                <label className="form__label" htmlFor="password">
                  Пароль
                </label>
              </div>

              <Button
                size="small"
                variant="primary"
                type="submit"
                disabled={!(formik.dirty && formik.isValid)}
                className="p10">
                Войти
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="form-block">
        <div className="form__bottom">
          <p>
            У вас ещё нет аккаунта?
            <Link to="/signup">
              <span>Зарегистрироваться</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
