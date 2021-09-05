const SuggestionsLoader = () => {
  return (
    <svg
      role="img"
      style={{
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
          <rect x="103" y="12" rx="3" ry="3" width="123" height="16" />
          <rect x="102" y="152" rx="3" ry="3" width="171" height="16" />
          <circle cx="44" cy="42" r="38" />
          <circle cx="44" cy="147" r="38" />
          <circle cx="44" cy="251" r="38" />
          <rect x="105" y="117" rx="3" ry="3" width="123" height="16" />
          <rect x="104" y="222" rx="3" ry="3" width="123" height="16" />
          <rect x="105" y="48" rx="3" ry="3" width="171" height="16" />
          <rect x="104" y="257" rx="3" ry="3" width="171" height="16" />
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
