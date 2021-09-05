import ContentLoader from 'react-content-loader';

const DialogsLoader = (props) => {
  return (
    <ContentLoader height={300} {...props}>
      <circle cx="50" cy="40" r="30" />
      <rect x="95" y="20" rx="4" ry="4" width="170" height="15" />
      <rect x="95" y="45" rx="4" ry="4" width="120" height="15" />

      <circle cx="50" cy="120" r="30" />
      <rect x="95" y="100" rx="4" ry="4" width="170" height="15" />
      <rect x="95" y="125" rx="4" ry="4" width="120" height="15" />

      <circle cx="50" cy="200" r="30" />
      <rect x="95" y="180" rx="4" ry="4" width="170" height="15" />
      <rect x="95" y="205" rx="4" ry="4" width="120" height="15" />
    </ContentLoader>
  );
};

export default DialogsLoader;
