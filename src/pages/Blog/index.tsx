import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <section className='ftco-section' id='cards'>
      <div className='container'>
        {/* {blogList} */}
        <h3>Blog goes here</h3>
        <Link className='btn btn-success' to='/contact'>
          Contact Us
        </Link>
      </div>
    </section>
  );
};

export default Blog;
