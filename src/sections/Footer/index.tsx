import { useNavigate } from 'react-router-dom';
import { links, socials } from './data';
import './index.css';

const Footer = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };
  return (
    <footer>
      <div className='container footer__container'>
        <ul className='nav__menu'>
          <li>
            <button className='footer__button' onClick={goHome}>
              Home
            </button>
          </li>
          {links.map(fLink => (
            <li key={fLink.id}>
              <a href={fLink.link}>{fLink.title}</a>
            </li>
          ))}
        </ul>
        <div className='footer__socials'>
          {socials.map(social => (
            <a
              key={social.id}
              href={social.link}
              target='_blank'
              rel='noopener noreferrer'
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
      <div className='footer__copyright'>
        <small>&copy; 2023 Light drawer LLC All Rights Reserved</small>
      </div>
    </footer>
  );
};

export default Footer;
