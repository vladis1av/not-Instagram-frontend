import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Image } from '../../components';
import { useChangeDocumentTitle } from '../../hooks';
import { updateUserData } from '../../redux/reducers/user/userAction';
import { selectCurrentUser } from '../../redux/reducers/user/userSelectors';
import { userApi } from '../../services/api';
import './Settings.scss';

const Settings = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => selectCurrentUser(state));

  const handleClickSubmit = async (data) => {
    const res = await userApi.updateUser(data);
    if (res.status === 200) {
      dispatch(updateUserData(data));
    }
  };

  const formik = useFormik({
    initialValues: {
      fullname: `${currentUser.fullname}`,
      username: `${currentUser.username}`,
      website: `${currentUser.website ? currentUser.website : ''}`,
      bio: `${currentUser.bio ? currentUser.bio : ''}`,
    },
    onSubmit: handleClickSubmit,
  });

  useChangeDocumentTitle('Редактировать профиль • not-Instagram');

  return (
    <div className="edit">
      <div className="edit__content">
        <div className="edit__content__left">
          <ul>
            <li>
              <Link
                className="edit__content__left__item__link default-link "
                to="/settings/edit">
                Редактировать профиль
              </Link>
            </li>
          </ul>
        </div>
        <div className="edit__content__right">
          <form onSubmit={formik.handleSubmit} className="form-edit">
            <div className="edit__content__right__form__group">
              <div className="edit__content__right__user__avatar">
                <Image
                  className="messages__item__user-avatar"
                  src={currentUser.profileAvatar}
                  alt="user profile photo"
                  width="38"
                  height="38"
                  circle
                />
              </div>
              <div className="edit__content__right__user__info">
                <h1>{currentUser.username}</h1>
                <label className="edit__content__right__user__info__label">
                  Сменить фото профиля
                </label>
              </div>
            </div>
            <div className="edit__content__right__form__group">
              <label htmlFor="fullname">Имя</label>
              <div>
                <input
                  id="fullname"
                  name="fullname"
                  placeholder={currentUser.fullname}
                  onChange={formik.handleChange}
                  values={formik.values.fullname}
                />
                <p>
                  Чтобы людям было проще находить ваш аккаунт, используйте имя,
                  под которым вас знают: ваше имя и фамилию, никнейм или
                  название компании.
                </p>
              </div>
            </div>
            <div className="edit__content__right__form__group">
              <label htmlFor="username">Имя пользователя</label>
              <input
                id="username"
                name="username"
                placeholder={currentUser.username}
                onChange={formik.handleChange}
                values={formik.values.username}
              />
            </div>
            <div className="edit__content__right__form__group">
              <label htmlFor="website">Веб-сайт</label>
              <input
                id="website"
                name="website"
                placeholder={
                  currentUser.website ? currentUser.website : 'Веб - сайт'
                }
                onChange={formik.handleChange}
                values={formik.values.website}
              />
            </div>
            <div className="edit__content__right__form__group">
              <label htmlFor="bio">О себе</label>
              <textarea
                id="bio"
                name="bio"
                placeholder={currentUser.bio ? currentUser.bio : 'О себе'}
                onChange={formik.handleChange}
                values={formik.values.bio}
              />
            </div>
            <div className="edit__content__right__form__group">
              <label></label>
              <Button variant="primary" size="small">
                Отправить
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;

// const LoginForm = () => {
//   return (
//     <>
//       <div className="form-block">
//         <div className="form-login__wrapper">
//           <div className="form-login__wrapper__logo">
//             <span>not</span>
//             <img src={logo} alt="" height="51px" width="175px" />
//           </div>
//           <div className="form-wrapper">
//             <form onSubmit={formik.handleSubmit}>
//               <div className="form__group">
//                 <input
//                   className="form__input form__input--with-valdation-icon"
//                   id="login"
//                   type="login"
//                   name="login"
//                   onBlur={formik.handleBlur}
//                   placeholder=" "
//                   onChange={formik.handleChange}
//                   values={formik.values.login}
//                 />
//                 <label className="form__label" htmlFor="login">
//                   Email или username
//                 </label>
//               </div>
//               <div className="form__group">
//                 <input
//                   className="form__input"
//                   id="password"
//                   type="password"
//                   name="password"
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                   values={formik.values.password}
//                   placeholder=" "
//                 />
//                 <label className="form__label" htmlFor="password">
//                   Пароль
//                 </label>
//               </div>

//               <Button
//                 size="small"
//                 variant="primary"
//                 type="submit"
//                 disabled={!(formik.dirty && formik.isValid)}
//                 className="p10">
//                 Войти
//               </Button>
//             </form>
//           </div>
//         </div>
//       </div>
//       <div className="form-block">
//         <div className="form__bottom">
//           <p>
//             У вас ещё нет аккаунта?
//             <Link to="/signup">
//               <span>Зарегистрироваться</span>
//             </Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };
