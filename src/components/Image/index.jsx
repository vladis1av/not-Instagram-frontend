import classNames from 'classnames';

import './Image.scss';

const Image = ({ src, alt, className, width, height, circle, ...attrs }) => {
  const classes = classNames('image', { circle }, className);
  return (
    <img
      src={src}
      alt={alt}
      className={classes}
      width={width}
      height={height}
      {...attrs}
    />
  );
};

export default Image;
