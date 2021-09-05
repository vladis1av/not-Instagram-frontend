import appLoaderLogo from '../../assets/images/logo-loader.png';
import './AppLoader.scss';

const AppLoader = () => {
  return (
    <div className="app-loader w100p d-flex justify-center flex-row align-center ">
      <div className="app-loader__container">
        <img
          src={appLoaderLogo}
          alt="instagram logo loader"
          width="50px"
          height="50px"
        />
      </div>
    </div>
  );
};

export default AppLoader;
