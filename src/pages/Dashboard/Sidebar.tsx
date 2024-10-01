import { Link, NavLink } from 'react-router-dom';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { useLogout } from '../../context/useLogout';
import data from './data';
import './index.css';

const Sidebar = () => {
  const logout = useLogout();
  return (
    <div id='sidebar'>
      {/* <div className='top'>
        <div className='logo'>
          <i className='bx bx1-codepen'></i>
          <span>Dashboard</span>
        </div>
        <i className='bx bx-menu' id='btn'></i>
      </div> */}
      {/* <div className='user'>
        <img src='user-img.jpg' alt='me' className='user-img' />
        <div>
          <p className='bold'>{user?.email}</p>
          <p>Admin</p>
        </div>
    </div> */}
      {data.map(item =>
        item.id === 1 ? (
          <NavLink key={item.id} to={item.link} className='nav__link' end>
            {item.icon}
            {'  '}
            {item.title}
          </NavLink>
        ) : (
          <NavLink key={item.id} to={item.link} className='nav__link'>
            {item.icon}
            {'  '}
            {item.title}
          </NavLink>
        ),
      )}
      <Link to='' onClick={logout} className='nav__link'>
        <RiLogoutBoxRLine className='icon' />
        Logout
      </Link>
    </div>
  );
};

export default Sidebar;
