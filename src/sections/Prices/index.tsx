import { ReactNode } from 'react';
import data from './data';
import './index.css';

const getItems = (num: number) => {
  return data[num].items;
};

const Prices = () => {
  return (
    <section id='Pricing'>
      <h2>Pricing</h2>
      <div className='table'>
        <div className='row'>
          <div className='column'>
            <ul className='price'>
              {getItems(0).map(item => item as ReactNode)}
            </ul>
          </div>
          <div className='column'>
            <ul className='price'>
              {getItems(1).map(item => item as ReactNode)}
            </ul>
          </div>
          <div className='column'>
            <ul className='price'>
              {getItems(2).map(item => item as ReactNode)}
            </ul>
          </div>
          <div className='column'>
            <ul className='price'>
              {getItems(3).map(item => item as ReactNode)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prices;
