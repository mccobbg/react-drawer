import { FaCheck } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

const data = [
  {
    id: 1,
    items: [
      <li key={1} className='header'>
        Features<div></div>
        <p></p>
      </li>,
      <li key={2}>
        <p>Number of Images</p>
      </li>,
      <li key={3}>
        <p>Document storage</p>
      </li>,
      <li key={4}>
        <p>Digital signing</p>
      </li>,
      <li key={5}>
        <p>Licensing</p>
      </li>,
      <li key={6}>
        {' '}
        <p>Research and cryptography tools</p>
      </li>,
      <li key={7}>
        <p>Metrics</p>
      </li>,
    ],
  },
  {
    id: 1,
    items: [
      <li key={1} className='header'>
        Starter<div className='dollar'>0</div>
        <p>per user per month</p>
      </li>,
      <li key={2}>
        <p>20</p>
      </li>,
      <li key={3}>
        <span>
          <FaCheck color='green' />
        </span>
      </li>,
      <li key={4}>
        <span>
          <FaCheck color='green' />
        </span>
      </li>,
      <li key={5}>
        <span>
          <FaCheck color='green' />
        </span>
      </li>,
      <li key={6}>
        <span>
          <AiOutlineClose color='red' />
        </span>
      </li>,
      <li key={7}>
        <span>
          <AiOutlineClose color='red' />
        </span>
      </li>,
      <li key={8}>
        <div className='button_cont'>
          <button className='col_btn btn primary' rel='nofollow noopener'>
            Get Starter
          </button>
        </div>
      </li>,
    ],
  },
  {
    id: 2,
    items: [
      <li key={1} className='header'>
        Professional<div className='dollar'>40</div>
        <p>per user per month</p>
      </li>,
      <li key={2}>
        <p>200</p>
      </li>,
      <li key={3}>
        <span>
          <FaCheck color='green' />
        </span>
      </li>,
      <li key={4}>
        <span>
          <FaCheck color='green' />
        </span>
      </li>,
      <li key={5}>
        <span>
          <FaCheck color='green' />
        </span>
      </li>,
      <li key={6}>
        <span>
          <AiOutlineClose color='red' />
        </span>
      </li>,
      <li key={7}>
        <span>
          <AiOutlineClose color='red' />
        </span>
      </li>,
      <li key={8}>
        <div className='button_cont'>
          <button className='col_btn btn primary' rel='nofollow noopener'>
            Get Professional
          </button>
        </div>
      </li>,
    ],
  },
  {
    id: 3,
    items: [
      <li key={1} className='header'>
        Organization<div className='dollar'>80</div>
        <p>per user per month</p>
      </li>,
      <li key={2}>
        <p>Unlimited</p>
      </li>,
      <li key={3}>
        <p>Unlimited</p>
      </li>,
      <li key={4}>
        <span>
          <FaCheck color='green' />
        </span>
      </li>,
      <li key={5}>
        <span>
          <FaCheck color='green' />
        </span>
      </li>,
      <li key={6}>
        <span>
          <FaCheck color='green' />
        </span>
      </li>,
      <li key={7}>
        <span>
          <FaCheck color='green' />
        </span>
      </li>,
      <li key={8}>
        <div className='button_cont'>
          <button className='col_btn btn primary' rel='nofollow noopener'>
            Get Organization
          </button>
        </div>
      </li>,
    ],
  },
];

export default data;
