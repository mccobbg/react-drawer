import { FaSuitcase } from 'react-icons/fa';
import { FaRegHandshake } from 'react-icons/fa';
import { IoIosColorPalette } from 'react-icons/io';
import { IoIosPeople } from 'react-icons/io';
import { AiOutlineDashboard } from 'react-icons/ai';
import { GiArchiveResearch } from 'react-icons/gi';

const card_data = [
  {
    id: 1,
    link: '',
    icon: <IoIosColorPalette />,
    text: 'Share a love of art',
    background: 'header__card_bg',
  },
  {
    id: 2,
    link: '',
    icon: <IoIosPeople />,
    text: 'Shows and meetups',
    background: 'header__card_bg',
  },
  {
    id: 3,
    link: '',
    icon: <FaRegHandshake />,
    text: 'Collect and sell and license images',
    background: 'header__card_bg',
  },
  {
    id: 4,
    link: '',
    icon: <FaSuitcase />,
    text: 'Ownership rights',
    background: 'header__card_bg',
  },
  {
    id: 5,
    link: '',
    icon: <GiArchiveResearch />,
    text: 'Research',
    background: 'header__card_bg',
  },
  {
    id: 6,
    link: '',
    icon: <AiOutlineDashboard />,
    text: 'Dashboard',
    background: 'header__card_bg',
  },
];

export default card_data;
