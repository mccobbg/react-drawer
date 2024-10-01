import { RotatingLines } from 'react-loader-spinner';
import './index.css';

const Spinner = () => {
  return (
    <div className='spinner-box'>
      <div className='loading-icon'>
        <RotatingLines
          strokeColor='var(--color-primary)'
          strokeWidth='5'
          animationDuration='0.75'
          width='96'
          visible={true}
        />
      </div>
    </div>
  );
};

export default Spinner;
