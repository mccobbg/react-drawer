import { BsEasel } from 'react-icons/bs';
import { MdOutlineAccountBalance } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { GiHouseKeys } from 'react-icons/gi';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoImagesOutline } from 'react-icons/io5';
//import './index.css';

const data = [
  {
    id: 1,
    link: '',
    title: 'Art Work',
    icon: <BsEasel className='icon' />,
  },
  {
    id: 2,
    link: 'account',
    title: 'Account',
    icon: <MdOutlineAccountBalance className='icon' />,
  },
  {
    id: 3,
    link: 'profile',
    title: 'Profile',
    icon: <CgProfile className='icon' />,
  },
  {
    id: 4,
    link: 'portfolio',
    title: 'Portfolio',
    icon: <IoImagesOutline className='icon' />,
  },
  {
    id: 5,
    link: 'licenses',
    title: 'Licenses',
    icon: <GiHouseKeys className='icon' />,
  },
  {
    id: 6,
    link: 'settings',
    title: 'Settings',
    icon: <IoSettingsOutline className='icon' />,
  },
];

export default data;
