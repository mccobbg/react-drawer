//import { ReactNode } from 'react';
import './index.css';

// interface ProfileData {
//   children: ReactNode;
//   className?: string;
//   onClick?: () => void;
// }

// const Profile = ({ children, className, onClick }: ProfileData) => {
const Collections = () => {
  return (
    <div id='collections'>
      <h2>Collections</h2>
      <div className='container collection__container'>
        <p>Image collections</p>
      </div>
    </div>
  );
};

export default Collections;
