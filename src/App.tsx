import { useRef } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useStateContext } from './context/user-context';
import NavBar from './sections/NavBar';
import Home from './pages/Home';
import Index from './pages/Index';
import Account from './pages/Account';
import Profile from './pages/Profile';
import Licenses from './pages/Licenses';
import Settings from './pages/Settings';
import ErrorPage from './pages/ErrorPage';
import Footer from './sections/Footer';
import Dashboard from './pages/Dashboard';
import Gallery from './pages/Gallery';
// import Blog from './pages/Blog';
import UserMgmt from './pages/UserMgmt';
import NotFound from './components/NotFound';
import { useThemeContext } from './/context/theme-context';
import 'react-toastify/dist/ReactToastify.css';
import Portfolio from './pages/Portfolio';

function App() {
  const { themeState } = useThemeContext();
  const mainRef = useRef<HTMLDivElement>(null);
  const stateContext = useStateContext();
  const user = stateContext.state.authUser;

  const Layout = () => {
    return (
      <>
        <NavBar />
        <Outlet />
        {(!user || user.authStatus !== 'AUTH') && <Footer />}
      </>
    );
  };

  return (
    <main
      className={`${themeState.primary} ${themeState.background}`}
      ref={mainRef}
    >
      <Routes>
        <Route path='/' element={<Layout />} errorElement={<ErrorPage />}>
          {user && user.authStatus === 'AUTH' ? (
            <Route path='' element={<Dashboard />}>
              <Route index element={<Index />} />
              <Route path='account' element={<Account />} />
              <Route path='profile' element={<Profile />} />
              <Route path='portfolio' element={<Portfolio />} />
              <Route path='licenses' element={<Licenses />} />
              <Route path='settings' element={<Settings />} />
            </Route>
          ) : (
            <>
              <Route index element={<Home />} />
              <Route path='usermgmt' element={<UserMgmt />} />
            </>
          )}
          <Route path='gallery' element={<Gallery />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer
        position='top-center'
        limit={1}
        closeOnClick
        autoClose={3000}
        theme='dark'
        hideProgressBar={true}
      />
    </main>
  );
}

export default App;
