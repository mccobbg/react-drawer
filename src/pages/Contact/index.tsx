import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { ContactInfoType } from '../../types';
// import { useMutation } from '@tanstack/react-query';
// import { postMessageFn } from '../../api';
// import Spinner from '../../components/Spinner';
//import './index.css';

const Contact = () => {
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [contactId, setContactId] = useState<string>('');
  const [validate, setValidate] = useState<ContactInfoType>({
    contactName: 'has-success',
    contactEmail: 'has-success',
    subject: 'has-success',
    message: 'has-success',
  });

  useEffect(() => {
    setContactId('34q4089auve');
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const validateContactInfo = () => {
    const emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (contactName.length > 0) {
      if (validate.contactName === 'has-danger') {
        validate.contactName = 'has-success';
        setValidate(validate);
      }
    } else if (validate.contactName === 'has-success') {
      validate.contactName = 'has-danger';
      setValidate(validate);
    }
    if (contactEmail.length > 0) {
      if (emailRex.test(contactEmail)) {
        if (validate.contactEmail === 'has-danger') {
          validate.contactEmail = 'has-success';
          setValidate(validate);
        }
      } else if (validate.contactEmail === 'has-success') {
        validate.contactEmail = 'has-danger';
        setValidate(validate);
      }
    } else if (validate.contactEmail === 'has-success') {
      validate.contactEmail = 'has-danger';
      setValidate(validate);
    }

    if (subject.length > 0) {
      if (validate.subject === 'has-danger') {
        validate.subject = 'has-success';
        setValidate(validate);
      }
    } else if (validate.subject === 'has-success') {
      validate.subject = 'has-danger';
      setValidate(validate);
    }

    if (message.length > 0) {
      if (validate.message === 'has-danger') {
        validate.message = 'has-success';
        setValidate(validate);
      }
    } else if (validate.message === 'has-success') {
      validate.message = 'has-danger';
      setValidate(validate);
    }
  };

  const saveMessage = (event: React.SyntheticEvent) => {
    event.preventDefault();

    validateContactInfo();
    if (
      validate.contactEmail === 'has-success' &&
      validate.contactName === 'has-success' &&
      validate.message === 'has-success' &&
      validate.subject === 'has-success'
    ) {
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);

      const formJson = Object.fromEntries(formData.entries());
      postMessage(formJson);
    }
  };

  return (
    <section className='w3l-contact-1'>
      <div className='contacts-9 section-gap'>
        <div className='wrapper'>
          <h3 className='global-title text-center'>Contact us</h3>
          <div className='d-grid contact-view'>
            <div className='cont-details'>
              <div className='cont-top'>
                <div className='cont-left text-center'>
                  <span className='fa fa-phone'></span>
                </div>
                <div className='cont-right'>
                  <h6>Call Us</h6>
                  <p>
                    <a href='tel:+456 68 925 89'>+456 68 925 89</a>
                  </p>
                </div>
              </div>
              <div className='cont-top margin-up'>
                <div className='cont-left text-center'>
                  <span className='fa fa-envelope-o'></span>
                </div>
                <div className='cont-right'>
                  <h6>Email Us</h6>
                  <p>
                    <a href='mailto:support@eazybank.com' className='mail'>
                      support@eazybank.com
                    </a>
                  </p>
                </div>
              </div>
              <div className='cont-top margin-up'>
                <div className='cont-left text-center'>
                  <span className='fa fa-map-marker'></span>
                </div>
                <div className='cont-right'>
                  <h6>Address</h6>
                  <p>123 Main Street, New York, NY 10030</p>
                </div>
              </div>
            </div>
            <div className='map-content-9'>
              {contactId.length > 0 && (
                <span className='text-success'>
                  Your message was submitted. Reference ID is ${contactId}
                </span>
              )}
              <form method='post' onSubmit={saveMessage}>
                <div className='twice'>
                  <input
                    type='text'
                    className='form-control'
                    name='contactName'
                    id='contactName'
                    placeholder='Name'
                    required
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                    autoComplete='name'
                  />
                  {validate.contactName === 'has-danger' && (
                    <span className='text-danger'>{'A name is required.'}</span>
                  )}
                </div>
                <div className='twice'>
                  <input
                    type='email'
                    className='form-control'
                    name='contactEmail'
                    id='contactEmail'
                    placeholder='Email'
                    required
                    pattern='^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                    value={contactEmail}
                    onChange={e => setContactEmail(e.target.value)}
                    autoComplete='email'
                  />
                  {validate.contactEmail === 'has-danger' && (
                    <span className='text-danger'>
                      Please provide a valid email address.
                    </span>
                  )}
                </div>
                <div className='twice'>
                  <input
                    type='text'
                    className='form-control'
                    name='subject'
                    id='subject'
                    placeholder='Subject'
                    required
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                  />
                  {validate.subject === 'has-danger' && (
                    <span className='text-danger'>A subject is required.</span>
                  )}
                </div>
                <div className='twice'>
                  <textarea
                    name='message'
                    className='form-control'
                    id='message'
                    placeholder='Message'
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  ></textarea>
                  {validate.message === 'has-danger' && (
                    <span className='text-danger'>A message is required.</span>
                  )}
                </div>
                <button
                  type='submit'
                  className='btn btn-contact'
                  onSubmit={saveMessage}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
