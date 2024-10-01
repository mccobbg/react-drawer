import { memo, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useModalContext } from '../../context/modal-context';
import './index.css';

interface ImageType {
  src: string;
}

const Header = () => {
  const { setRegisterModalOpen } = useModalContext();
  const [loaded, setLoaded] = useState<boolean>(false);
  const headerUrl = '/images/Fall_201_NJ_Park.jpg';

  const Image = memo(({ src }: ImageType) => {
    return <img
      src={src}
      alt='New Jersey park in the fall'
      className='header-img'
      style={{ visibility: loaded? 'visible' : 'hidden'}}
      onLoad={() => setLoaded(true)}
    />;
  });

  return (
    <header id='header' className={ loaded ? 'loaded-img' : 'color-img'}>
      <Image src={headerUrl} />

      <div className='container header__container'>
        <div className='header__left'>
          <h2 className='outlined'>Welcome to Box Drawer</h2>
          <p className="outlined">
            Socialize around art. Share, discuss, sell, collect, license, and
            research works of art. Securely maintain provenance and rights of
            ownership.
          </p>
          <div className='header__cta'>
            <Link
              to=''
              className='btn primary'
              onClick={() => setRegisterModalOpen(true)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
