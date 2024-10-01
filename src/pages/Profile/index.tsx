//import { ReactNode } from 'react';
import './index.css';

// interface ProfileData {
//   children: ReactNode;
//   className?: string;
//   onClick?: () => void;
// }

// const Profile = ({ children, className, onClick }: ProfileData) => {
const Profile = () => {
  return (
    <div id='profile'>
      <h2>Profile</h2>
      <div className='container profile__container'>
        <p>This is your profile information.</p>
      </div>
    </div>
  );
};

export default Profile;
