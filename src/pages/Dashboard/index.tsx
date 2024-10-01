import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './index.css';

const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <div id='content'>
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
