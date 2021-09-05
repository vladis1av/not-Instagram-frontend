import cls from 'classnames';
import { Link } from 'react-router-dom';

import './Button.scss';

const Button = (props) => {
  const { onClick, className, children, variant, size, to, ...rest } = props;
  const Tag = to ? Link : 'button';

  const buttonStyles = cls(
    'btn',
    {
      'btn--transparent': variant === 'transparent',
    },
    { 'btn--primary': variant === 'primary' },
    { 'btn--primary-outline': variant === 'primary--outline' },
    { 'btn--edit': variant === 'edit' },
    { 'btn--small': size === 'small' },
    className,
  );

  return (
    <Tag onClick={onClick} className={buttonStyles} to={to} {...rest}>
      {children}
    </Tag>
  );
};

export default Button;
