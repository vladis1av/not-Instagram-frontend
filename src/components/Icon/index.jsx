import IconsSVG from '../../assets/images/svg-sprite.svg';

import './Icon.scss';

const Icon = ({ name, color, size, className }) => {
  return (
    <svg
      className={`${className}`}
      fill={color}
      stroke={color}
      width={size}
      height={size}>
      <use xlinkHref={`${IconsSVG}#${name}`} />
    </svg>
  );
};

export default Icon;
