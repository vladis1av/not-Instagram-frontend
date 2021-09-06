const SuggestionsLoader = () => {
  return (
    <svg
      role="img"
      style={{
        marginTop: '10px',
        width: '293px',
        height: '335px',
      }}
      aria-labelledby="loading-aria"
      viewBox="0 0 400 460"
      preserveAspectRatio="none">
      <title id="loading-aria">Loading...</title>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        clipPath="url(#clip-path)"
        style={{ fill: 'url("#fill")' }}></rect>
      <defs>
        <clipPath id="clip-path">
          <circle cx="30" cy="42" r="27"></circle>
          <rect x="70 " y="25" rx="3" ry="3" width="123" height="16"></rect>
          <rect x="70" y="50" rx="3" ry="3" width="171" height="16"></rect>
          <circle cx="30" cy="115" r="27"></circle>
          <rect x="70" y="95" rx="3" ry="3" width="123" height="16"></rect>
          <rect x="70" y="120" rx="3" ry="3" width="171" height="16"></rect>
          <circle cx="30" cy="190" r="27"></circle>
          <rect x="70" y="170" rx="3" ry="3" width="123" height="16"></rect>
          <rect x="70" y="195" rx="3" ry="3" width="171" height="16"></rect>
          <circle cx="30" cy="265" r="27"></circle>
          <rect x="70" y="245" rx="3" ry="3" width="123" height="16"></rect>
          <rect x="70" y="270" rx="3" ry="3" width="171" height="16"></rect>
        </clipPath>
        <linearGradient id="fill">
          <stop offset="0.599964" stopColor="#f3f3f3" stopOpacity="1">
            <animate
              attributeName="offset"
              values="-2; -2; 1"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"></animate>
          </stop>
          <stop offset="1.59996" stopColor="#ecebeb" stopOpacity="1">
            <animate
              attributeName="offset"
              values="-1; -1; 2"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"></animate>
          </stop>
          <stop offset="2.59996" stopColor="#f3f3f3" stopOpacity="1">
            <animate
              attributeName="offset"
              values="0; 0; 3"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"></animate>
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SuggestionsLoader;
