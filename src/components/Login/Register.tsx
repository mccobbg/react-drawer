/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useThemeContext } from '../../context/theme-context';
import { GiArchiveRegister } from 'react-icons/gi';
import { BiError } from 'react-icons/bi';
import Modal from '../Modal';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { LoginProps } from '../../types';
import Spinner from '../Spinner';
import FirebaseAuthService from '../../services/firebaseAuthService';
import './index.css';

const Register = ({
  showModal,
  closeModalHandler,
  handleChangeScreen,
}: LoginProps) => {
  const [credentials, setCredentials] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [validEmail, setValidEmail] = useState<string>('has-success');
  const [validPassword, setValidPassword] = useState<string>('has-success');
  const [validFirstName, setValidFirstName] = useState<string>('has-success');
  const [validLastName, setValidLastName] = useState<string>('has-success');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pressedRegister, setPressedRegister] = useState<boolean>(false);
  //const stateContext = useStateContext();
  const { themeState } = useThemeContext();
  const [showPasswordText, setShowPasswordText] = useState<boolean>(false);

  const emailRex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRex =
    /^(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/;

  const validateEmail = () => {
    return emailRex.test(credentials.email) ? 'has-success' : 'has-danger';
  };

  const validatePassword = () => {
    return passwordRex.test(credentials.password)
      ? 'has-success'
      : 'has-danger';
  };

  const validateFirstName = () => {
    return credentials.firstName.length > 0 ? 'has-success' : 'has-danger';
  };

  const validateLastName = () => {
    return credentials.lastName.length > 0 ? 'has-success' : 'has-danger';
  };

  useEffect(() => {
    if (pressedRegister) {
      const validatedEmail: string = validateEmail();
      if (validatedEmail !== validEmail) {
        setValidEmail(validatedEmail);
      }
    }
  }, [credentials.email, pressedRegister]);

  useEffect(() => {
    if (pressedRegister) {
      const validatedPassword: string = validatePassword();
      if (validatedPassword !== validPassword) {
        setValidPassword(validatedPassword);
      }
    }
  }, [credentials.password, pressedRegister]);

  useEffect(() => {
    if (pressedRegister) {
      const validatedFirstName = validateFirstName();
      if (validatedFirstName !== validFirstName) {
        setValidFirstName(validatedFirstName);
      }
    }
  }, [credentials.firstName, pressedRegister]);

  useEffect(() => {
    if (pressedRegister) {
      const validatedLastName = validateLastName();
      if (validatedLastName !== validLastName) {
        setValidLastName(validatedLastName);
      }
    }
  }, [credentials.lastName, pressedRegister]);

  useEffect(() => {
    setCredentials({ firstName: '', lastName: '', email: '', password: '' });
    setValidFirstName('has-success');
    setValidLastName('has-success');
    setValidEmail('has-success');
    setValidPassword('has-success');
  }, [closeModalHandler]);

  const exitAndChangeScreen = (screenName: string) => {
    closeModalHandler();
    handleChangeScreen(screenName);
  };

  const RegisterUser = async () => {
    try {
      setIsLoading(true);
      await FirebaseAuthService.registerUser(
        credentials.email,
        credentials.password,
      );
      toast.success(
        `Complete signing up by clicking on the link in the email sent to ${credentials.email}.`,
        {
          theme: themeState.background === 'bg-1' ? 'light' : 'dark',
          position: 'top-center',
          icon: <GiArchiveRegister />,
        },
      );
      exitAndChangeScreen('login');
    } catch (error) {
      toast.error((error as Error).message, {
        theme: themeState.background === 'bg-1' ? 'light' : 'dark',
        position: 'top-center',
        icon: <BiError />,
      });
      console.error((error as Error).message);
    } finally {
      setPressedRegister(false);
      setIsLoading(false);
      setCredentials({ firstName: '', lastName: '', email: '', password: '' });
    }
  };

  const handleChangeValue = (name: string, value: string) => {
    setCredentials({ ...credentials, [name]: value });
  };

  const validateUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!pressedRegister) {
      setPressedRegister(true);
    }

    if (
      validateFirstName() === 'has-success' &&
      validateLastName() === 'has-success' &&
      validateEmail() === 'has-success' &&
      validatePassword() === 'has-success'
    ) {
      RegisterUser();
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Modal
        showModal={showModal}
        closeModalHandler={closeModalHandler}
        className='login__modal'
      >
        <Form
          onSubmit={validateUser}
          name='login'
          method='POST'
          className='login100-form p-l-55 p-r-55 p-t-10'
        >
          <span className='login100-form-title'>Welcome to Box drawer</span>
          <FormGroup>
            <div className='wrap-input100 m-b-16'>
              <Input
                className='input100'
                type='text'
                name='firstName'
                id='firstName'
                placeholder='First Name'
                required
                value={credentials.firstName}
                valid={validFirstName === 'has-success'}
                invalid={validFirstName === 'has-danger'}
                onChange={e => handleChangeValue(e.target.name, e.target.value)}
              />
              <span className='focus-input100'></span>
              {validFirstName === 'has-danger' && (
                <span className='text-danger'>
                  Please enter your first name.
                </span>
              )}
            </div>
          </FormGroup>
          <FormGroup>
            <div className='wrap-input100 m-b-16'>
              <Input
                className='input100'
                type='text'
                name='lastName'
                id='lastName'
                placeholder='Last Name'
                required
                value={credentials.lastName}
                valid={validLastName === 'has-success'}
                invalid={validLastName === 'has-danger'}
                onChange={e => handleChangeValue(e.target.name, e.target.value)}
              />
              <span className='focus-input100'></span>
              {validLastName === 'has-danger' && (
                <span className='text-danger'>
                  Please enter your last name.
                </span>
              )}
            </div>
          </FormGroup>
          <FormGroup>
            <div className='wrap-input100 m-b-16'>
              <Input
                className='input100'
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                required
                autoComplete='username'
                value={credentials.email}
                valid={validEmail === 'has-success'}
                invalid={validEmail === 'has-danger'}
                onChange={e => handleChangeValue(e.target.name, e.target.value)}
              />
              <span className='focus-input100'></span>
              {validEmail === 'has-danger' && (
                <span className='text-danger'>
                  Please enter a valid email address.
                </span>
              )}
            </div>
          </FormGroup>
          <FormGroup>
            <div className='wrap-input100 m-b-16'>
              <div className='password__input'>
                <Input
                  className='input100 password__border'
                  type={showPasswordText ? 'text' : 'password'}
                  name='password'
                  placeholder='Password'
                  valid={validPassword === 'has-success'}
                  invalid={validPassword === 'has-danger'}
                  id='password'
                  required
                  autoComplete='new-password'
                  value={credentials.password}
                  onChange={e =>
                    handleChangeValue(e.target.name, e.target.value)
                  }
                />
                <button
                  className='password_text__button'
                  type='button'
                  onClick={() => setShowPasswordText(!showPasswordText)}
                >
                  {showPasswordText ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </button>
              </div>
              <span className='focus-input100'></span>
              {validPassword === 'has-danger' && (
                <span className='text-danger text-left'>
                  Password must have at least 8 characters and at least 1
                  uppercase letter, 1 lowercase letter, 1 number, and 1 special
                  character.
                </span>
              )}
            </div>
          </FormGroup>
          <input
            name='_csrf'
            type='hidden'
            value='10887b51-b4c5-420f-b535-62d762014f9d'
          />
          <div className='container-login100-form-btn'>
            <Button className='login100-form-btn' type='submit'>
              Sign Up
            </Button>
          </div>
          <div className='text-right txt2 p-t-13 p-b-9'>
            Already have an account?{' '}
            <button
              className='txt2-button'
              onClick={() => exitAndChangeScreen('login')}
            >
              LOG IN
            </button>
          </div>
          <div className='text-left txt2 p-t-13 p-b-9'>
            By signing up, you agree to our Terms of Service and Privacy Policy.
            <br />
            <br />
            This site is protected by reCAPTCHA and the Google service{' '}
            <Link
              className='link-button'
              to='https://policies.google.com/privacy'
            >
              Privacy Policy
            </Link>
            {' and '}
            <Link
              className='link-button'
              to='https://policies.google.com/terms'
            >
              Terms of Service
            </Link>
            {' apply.'}
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Register;
