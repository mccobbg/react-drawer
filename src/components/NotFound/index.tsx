// import 'aos/dist/aos.css';
import './index.css';

const NotFound = () => {
  return (
    <div id='not_found'>
      <div className='not_found__container'>
        <h3>Page Not Found</h3>
        <p>
          The page you were looking for was not found.
          <br />
          {/* <br />
          Please try again with a different request. */}
        </p>
        {/* <div className='not_found__btn'>
          <a href='/' className='btn primary'>
            Reload
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default NotFound;
