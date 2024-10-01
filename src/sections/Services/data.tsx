import { FaSuitcase } from 'react-icons/fa';
import { FaRegHandshake } from 'react-icons/fa';
import { IoIosColorPalette } from 'react-icons/io';
import { IoIosPeople } from 'react-icons/io';
import { AiOutlineDashboard } from 'react-icons/ai';
import { GiArchiveResearch } from 'react-icons/gi';

const data = [
  {
    id: 1,
    link: '',
    icon: <IoIosColorPalette />,
    title: 'Share a love of art',
    desc: "Discuss art's present, past and future, the validity of AI generated images, and how to make art a successful business.",
  },
  {
    id: 2,
    link: '',
    icon: <IoIosPeople />,
    title: 'Shows and meetups',
    desc: 'Promote and attend art shows and meetups. Meet fellow artists and collectors and discover and promote art in your community.',
  },
  {
    id: 3,
    link: '',
    icon: <FaRegHandshake />,
    title: 'Collect, sell, and license images',
    desc: 'Securely sell art you created or own. License your digital art and images of work in other mediums for mobile devices, Web sites, and print. Create your own collection of digital and nondigital art.',
  },
  {
    id: 4,
    link: '',
    icon: <FaSuitcase />,
    title: 'Ownership rights',
    desc: 'Control who has the right to use your images with proof of ownership. Maintain license agreements and discover unauthorized use.',
  },
  {
    id: 5,
    link: '',
    icon: <GiArchiveResearch />,
    title: 'Research',
    desc: "Research the provenance of art you own and would like to buy. Find experts who will help you determine an art work's real worth.",
  },
  {
    id: 6,
    link: '',
    icon: <AiOutlineDashboard />,
    title: 'Dashboard',
    desc: 'Maintain licensing and provenance in one place. Discover trends and get insights that will help you know what to buy and where to sell.',
  },
];

export default data;
