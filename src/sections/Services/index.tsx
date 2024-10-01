import Card from '../../components/Card';
import data from './data';
import './index.css';

const Services = () => {
  /*
   data-aos='fade-up'
  */
  return (
    <section id='Services'>
      <h2>Services</h2>
      <div className='container services__container'>
        {data.map(item => (
          <Card key={item.id} className='service' data-aos='fade-up'>
            <div className='service__icon'>{item.icon}</div>
            <div className='service__details'>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Services;
