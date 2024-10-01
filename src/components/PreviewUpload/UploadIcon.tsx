const UploadIcon = ({
  style = {},
  fill = 'none',
  width = '64px',
  className = '',
  viewBox = '0 0 64 64',
  stroke = '#4D4D4D',
  onClick = () => {},
}) => (
  <svg
    width={width}
    style={style}
    height={width}
    viewBox={viewBox}
    className={`svg-icon ${className || ''}`}
    enableBackground='new 0 0 64 64'
    id='svg-icon'
    version='1.1'
    xmlSpace='preserve'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    onClick={onClick}
  >
    <g>
      <path
        d='   M10,41.3v12c0,1.1,0.9,2,2,2h40c1.1,0,2-0.9,2-2v-12H10z'
        fill={fill}
        stroke={stroke}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit='10'
        strokeWidth='2'
      />
      <path
        d='   M42.6,19.4c3.8,7.3,7.6,14.7,11.4,22c-14.7,0-29.3,0-44,0c3.8-7.3,7.6-14.7,11.4-22'
        fill={fill}
        stroke={stroke}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit='10'
        strokeWidth='2'
      />
      <g>
        <line
          fill={fill}
          stroke={stroke}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeMiterlimit='10'
          strokeWidth='2'
          x1='32'
          x2='32'
          y1='8.7'
          y2='28.2'
        />
        <line
          fill={fill}
          stroke={stroke}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeMiterlimit='10'
          strokeWidth='2'
          x1='32'
          x2='35.7'
          y1='8.7'
          y2='12.4'
        />
        <line
          fill={fill}
          stroke={stroke}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeMiterlimit='10'
          strokeWidth='2'
          x1='28'
          x2='31.7'
          y1='12.4'
          y2='8.7'
        />
      </g>
      <circle
        cx='47.3'
        cy='46.7'
        fill={fill}
        r='2.3'
        stroke={stroke}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit='10'
      />
      <line
        fill={fill}
        stroke={stroke}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit='10'
        strokeWidth='2'
        x1='21.4'
        x2='27.5'
        y1='19.4'
        y2='19.4'
      />
      <line
        fill={fill}
        stroke={stroke}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit='10'
        strokeWidth='2'
        x1='36.4'
        x2='42.5'
        y1='19.4'
        y2='19.4'
      />
      <line
        fill={fill}
        stroke={stroke}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit='10'
        strokeWidth='2'
        x1='21.9'
        x2='41.9'
        y1='36.4'
        y2='36.4'
      />
      <line
        fill={fill}
        stroke={stroke}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit='10'
        strokeWidth='2'
        x1='23.5'
        x2='40.2'
        y1='32.1'
        y2='32.1'
      />
    </g>
  </svg>
);

export default UploadIcon;
