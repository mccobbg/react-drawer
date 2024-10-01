import { FormEvent, MouseEvent, useEffect, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';
import Login from '../../components/Login';
import Register from '../../components/Login/Register';
import ForgotPassword from '../../components/Login/ForgotPassword';
import Logo from '../../assets/images/box-drawer-2.png';
import Logo_inverse from '../../assets/images/box-drawer-inverse-2.png';
import data from './data';
import data2 from './data2';
import { useStateContext } from '../../context/user-context';
import { useLogout } from '../../context/useLogout';
import { useThemeContext } from '../../context/theme-context';
import { FcLandscape, FcNightLandscape } from 'react-icons/fc';
import SearchBar from '../../components/SearchBar';
import { useModalContext } from '../../context/modal-context';
import './index.css';

const NavBar = () => {
  const { themeState, themeHandler } = useThemeContext();
  const stateContext = useStateContext();
  const navigate = useNavigate();
  const logout = useLogout();
  const [query, setQuery] = useState<string>('');
  const [activeItem, setActiveItem] = useState<string>('');
  const [themeIcon, setThemeIcon] = useState(<FcLandscape />);
  const [logo, setLogo] = useState<string>(Logo);

  const {
    loginModalOpen,
    setLoginModalOpen,
    registerModalOpen,
    setRegisterModalOpen,
    forgotPasswordModalOpen,
    setForgotPasswordModalOpen,
    handleChangeScreen,
  } = useModalContext();
  const user = stateContext.state.authUser;
  const active__item = {
    color: 'hsl(230, 69%, 55%)',
    fontWeight: 700,
    outline: 'none',
  };

  const handleThemeIconClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setActiveItem('');
    if (themeState.background === 'bg-1') {
      setThemeIcon(<FcNightLandscape />);
      setLogo(Logo_inverse);
    } else {
      setThemeIcon(<FcLandscape />);
      setLogo(Logo);
    }
    themeHandler();
    setTimeout(() => {
      document.getElementById(`${activeItem}_link`)?.click();
    }, 100);
  };

  const handleItemClick = (isHash: boolean, menuItem: string) => {
    if (isHash) {
      setTimeout(() => {
        const section = document.getElementById(menuItem);
        section?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setActiveItem(menuItem);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const activeItem =
        location.pathname === '' ? '' : location.pathname.substring(1);
      if (activeItem === '') {
        const scrollPosition = window.scrollY;
        const sections = document.querySelectorAll('section');
        let minHeight = 10000;

        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (sectionTop < minHeight) {
            minHeight = sectionTop;
          }

          if (
            scrollPosition >= sectionTop - 50 && // Adjust the offset as needed
            scrollPosition < sectionTop + sectionHeight - 50 // Adjust the offset as needed
          ) {
            setActiveItem(section.id);
          }
        });

        if (scrollPosition < minHeight - 50) {
          setActiveItem('');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    const activeItem =
      location.pathname === '' ? '' : location.pathname.substring(1);
    if (activeItem !== '') {
      setActiveItem(activeItem);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goHome = () => {
    setActiveItem('home');
    navigate('/');
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  // Prevent page reload, clear input, set URL and push history on submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>, searchInput: string) => {
    e.preventDefault();
    e.currentTarget.reset();
    const url = `/search/${searchInput}`;
    setQuery(url);
  };

  const exitAndChangeScreen = (
    e: MouseEvent<HTMLAnchorElement>,
    setModalOpen: (open: boolean) => void,
  ) => {
    e.preventDefault();
    if (loginModalOpen) {
      setLoginModalOpen(false);
    } else if (registerModalOpen) {
      setRegisterModalOpen(false);
    } else if (forgotPasswordModalOpen) {
      setForgotPasswordModalOpen(false);
    }

    setModalOpen(true);
  };

  useEffect(() => {
    if (themeState.background === 'bg-1') {
      setThemeIcon(<FcLandscape />);
      setLogo(Logo);
    } else {
      setThemeIcon(<FcNightLandscape />);
      setLogo(Logo_inverse);
    }
  }, [themeState.background]);

  useEffect(() => {
    function doSomething(searchEntry: string) {
      alert(searchEntry);
    }

    if (query && query.length > 0) {
      doSomething(query);
    }
  }, [query]);

  return (
    <nav>
      <div className='container nav__container'>
        <div>
          <button className='nav__logo' onClick={goHome}>
            <img src={logo} alt='Logo' />
          </button>
          <button className='nav__logo_text' onClick={goHome}>
            Box drawer
          </button>
        </div>
        <ul className='nav__menu'>
          {data.map(item =>
            !item.link.startsWith('/#') ||
            !user ||
            user.authStatus !== 'AUTH' ? (
              <li key={item.id}>
                <Link
                  id={`${item.title}_link`}
                  //to={item.link}
                  to={!item.link.startsWith('/#') ? item.link : ''}
                  style={activeItem === item.title ? active__item : {}}
                  onClick={() =>
                    handleItemClick(item.link.startsWith('/#'), item.title)
                  }
                >
                  {item.title}
                </Link>
              </li>
            ) : (
              ''
            ),
          )}
        </ul>
        <SearchBar handleSubmit={handleSubmit} />
        <ul className='nav__menu'>
          {data2.map(item =>
            !item.link.startsWith('/#') ||
            !user ||
            user.authStatus !== 'AUTH' ? (
              <li key={item.id}>
                <Link
                  id={`${item.title}_link`}
                  //to={item.link}
                  to={!item.link.startsWith('/#') ? item.link : ''}
                  style={activeItem === item.title ? active__item : {}}
                  onClick={() =>
                    handleItemClick(item.link.startsWith('/#'), item.title)
                  }
                >
                  {item.title}
                </Link>
              </li>
            ) : (
              ''
            ),
          )}
          {user && user.authStatus === 'AUTH' ? (
            <li>
              <Link to='' onClick={logout}>
                Log Out
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to=''
                onClick={e => exitAndChangeScreen(e, setLoginModalOpen)}
              >
                Log In
              </Link>
              {' | '}
              <Link
                to=''
                onClick={e => exitAndChangeScreen(e, setRegisterModalOpen)}
              >
                Sign Up
              </Link>
            </li>
          )}
        </ul>
        <button id='theme__icon' onClick={e => handleThemeIconClick(e)}>
          {themeIcon}
        </button>
      </div>
      <Login
        showModal={loginModalOpen}
        closeModalHandler={() => setLoginModalOpen(false)}
        handleChangeScreen={handleChangeScreen}
      />
      <Register
        showModal={registerModalOpen}
        closeModalHandler={() => setRegisterModalOpen(false)}
        handleChangeScreen={handleChangeScreen}
      />
      <ForgotPassword
        showModal={forgotPasswordModalOpen}
        closeModalHandler={() => setForgotPasswordModalOpen(false)}
        handleChangeScreen={handleChangeScreen}
      />
    </nav>
  );
};

export default NavBar;
