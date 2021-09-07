import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { authApi } from '../../services/api';
import { Button, Icon } from '../';
import { useChangeDocumentTitle } from '../../hooks';
import logo from '../../assets/images/instagram-logo.svg';

const RegisterForm = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const handleClickSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await authApi.registration(data);

      if (res.status === 200) {
        setIsLoading(false);
        history.push('/signin');
      }

      return res;
    } catch (error) {
      setIsLoading(false);
      console.error(error.response?.data?.message);
    }
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Введите верный E-mail')
      .max(50)
      .required('Введите Email'),
    fullname: yup.string().max(40).required('Укажите Имя и Фамилию'),
    username: yup.string().min(3).max(20).required('Укажите имя пользователя'),
    password: yup.string().min(8).required('Введите свой пароль'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      fullname: '',
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleClickSubmit,
  });

  useChangeDocumentTitle('Регистрация • not-Instagram');

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
                  id="email"
                  type="email"
                  name="email"
                  onBlur={formik.handleBlur}
                  placeholder=" "
                  onChange={formik.handleChange}
                  values={formik.values.email}
                />
                <label className="form__label" htmlFor="email">
                  Email
                </label>
                <span className="form__input__validation">
                  {!formik.touched.email ? (
                    ''
                  ) : formik.errors.email ? (
                    <Icon name="error" size="22px" />
                  ) : (
                    <Icon name="check" size="22px" />
                  )}
                </span>
              </div>
              <div className="form__group">
                <input
                  className="form__input form__input--with-valdation-icon"
                  id="fullname"
                  name="fullname"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  values={formik.values.fullname}
                  placeholder=" "
                />
                <label className="form__label" htmlFor="fullname">
                  Имя и фамилия
                </label>
                <span className="form__input__validation">
                  {!formik.touched.fullname ? (
                    ''
                  ) : formik.errors.fullname ? (
                    <Icon name="error" size="22px" />
                  ) : (
                    <Icon name="check" size="22px" />
                  )}
                </span>
              </div>
              <div className="form__group">
                <input
                  className="form__input form__input--with-valdation-icon"
                  id="username"
                  name="username"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  values={formik.values.username}
                  placeholder=" "
                />
                <label className="form__label" htmlFor="username">
                  Имя пользователя
                </label>
                <span className="form__input__validation">
                  {!formik.touched.username ? (
                    ''
                  ) : formik.errors.username ? (
                    <Icon name="error" size="22px" />
                  ) : (
                    <Icon name="check" size="22px" />
                  )}
                </span>
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
                <span className="form__input__validation">
                  {!formik.touched.password ? (
                    ''
                  ) : formik.errors.password ? (
                    <Icon name="error" size="22px" />
                  ) : (
                    <Icon name="check" size="22px" />
                  )}
                </span>
              </div>

              <Button
                isLoading={isLoading}
                size="small"
                variant="primary"
                type="submit"
                disabled={!(formik.dirty && formik.isValid) || isLoading}
                className="p10">
                Зарегистрироваться
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="form-block">
        <div className="form__bottom">
          <p>
            Есть аккаунт?
            <Link to="/signin">
              <span>Войти</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
