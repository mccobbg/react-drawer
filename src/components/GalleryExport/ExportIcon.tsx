const ExportIcon = ({
  fill = 'none',
  width = '64px',
  className = '',
  viewBox = '0 0 64 64',
  // stroke = '#4D4D4D',
  onClick = () => {},
}) => (
  <svg
    id='gallery-export'
    version='1.1'
    width={width}
    height={width}
    viewBox={viewBox}
    className={`svg-icon ${className || ''}`}
    enableBackground='new 0 0 64 64'
    xmlSpace='preserve'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    onClick={onClick}
  >
    <g
      transform-origin='127.857px 127.855px'
      transform='matrix(-1, 0, 0, -1, -0.000003, -0.000001)'
    >
      <g
        stroke='none'
        strokeWidth='0'
        strokeDasharray='none'
        strokeLinecap='butt'
        strokeLinejoin='miter'
        strokeMiterlimit='10'
        fill='none'
        fillRule='nonzero'
        opacity='1'
        transform='matrix(2.81, 0, 0, 2.81, 1.406593, 1.406593)'
      >
        <path
          d='M 89.922 15.055 C 89.973 14.934 90 14.804 90 14.67 s -0.027 -0.264 -0.078 -0.385 c -0.051 -0.122 -0.124 -0.231 -0.216 -0.323 l -13.67 -13.67 c -0.391 -0.391 -1.023 -0.391 -1.414 0 s -0.391 1.023 0 1.414 L 86.586 13.67 H 63.183 C 52.605 13.67 44 22.276 44 32.854 v 27.185 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 V 32.854 c 0 -9.475 7.708 -17.183 17.183 -17.183 h 23.403 L 74.622 27.634 c -0.391 0.391 -0.391 1.023 0 1.414 c 0.195 0.195 0.451 0.293 0.707 0.293 s 0.512 -0.098 0.707 -0.293 l 13.67 -13.67 C 89.798 15.286 89.872 15.177 89.922 15.055 z'
          stroke='none'
          strokeWidth='1'
          strokeDasharray='none'
          strokeLinecap='butt'
          strokeLinejoin='miter'
          strokeMiterlimit='10'
          fill={fill}
          fillRule='nonzero'
          opacity='1'
          transform='matrix(1 0 0 1 0 0) '
          stroke-linecap='round'
        />
        <path
          d='M 79.753 90 H 10.247 C 4.597 90 0 85.403 0 79.753 V 10.247 C 0 4.597 4.597 0 10.247 0 h 39.73 c 0.553 0 1 0.448 1 1 s -0.447 1 -1 1 h -39.73 C 5.7 2 2 5.7 2 10.247 v 69.506 C 2 84.301 5.7 88 10.247 88 h 69.506 C 84.301 88 88 84.301 88 79.753 V 42.975 c 0 -0.552 0.447 -1 1 -1 s 1 0.448 1 1 v 36.778 C 90 85.403 85.403 90 79.753 90 z'
          stroke='none'
          strokeWidth='1'
          strokeDasharray='none'
          strokeLinecap='butt'
          strokeLinejoin='miter'
          strokeMiterlimit='10'
          fill={fill}
          fillRule='nonzero'
          opacity='1'
          transform='matrix(1 0 0 1 0 0) '
          stroke-linecap='round'
        />
        <path
          d='M 69.302 75.35 H 20.698 c -0.552 0 -1 -0.447 -1 -1 s 0.448 -1 1 -1 h 48.604 c 0.553 0 1 0.447 1 1 S 69.854 75.35 69.302 75.35 z'
          stroke='none'
          strokeWidth='1'
          strokeDasharray='none'
          strokeLinecap='butt'
          strokeLinejoin='miter'
          strokeMiterlimit='10'
          fill={fill}
          fillRule='nonzero'
          opacity='1'
          transform='matrix(1 0 0 1 0 0) '
          stroke-linecap='round'
        />
      </g>
    </g>
  </svg>
);

export default ExportIcon;
