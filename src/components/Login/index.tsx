/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useState } from 'react';
import { UserCredential } from 'firebase/auth';
import { toast } from 'react-toastify';
import { BiError } from 'react-icons/bi';
import Modal from '../../components/Modal';
import { LoginProps } from '../../types';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useStateContext } from '../../context/user-context';
import { useThemeContext } from '../../context/theme-context';
import Spinner from '../Spinner';
import FirebaseAuthService from '../../services/firebaseAuthService';
import './index.css';

const Login = ({
  showModal,
  closeModalHandler,
  handleChangeScreen,
}: LoginProps) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [validEmail, setValidEmail] = useState<string>('has-success');
  const [validPassword, setValidPassword] = useState<string>('has-success');
  const { themeState } = useThemeContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pressedLogin, setPressedLogin] = useState<boolean>(false);
  const stateContext = useStateContext();

  const loginUser = async () => {
    try {
      setIsLoading(true);
      const userCred: UserCredential = await FirebaseAuthService.loginUser(
        credentials.email,
        credentials.password,
      );

      if (userCred.user.emailVerified) {
        stateContext.dispatch({
          type: 'SET_USER',
          payload: {
            email: credentials.email,
            emailVerified: userCred.user.emailVerified,
            authStatus: 'AUTH',
            uid: userCred.user.uid,
          },
        });
        closeModalHandler();
        navigate('/');
      } else {
        toast.error(`Your email ${credentials.email} has not been verified`, {
          theme: themeState.background === 'bg-1' ? 'light' : 'dark',
          position: 'top-center',
          icon: <BiError />,
        });
      }
    } catch (error) {
      toast.error((error as Error).message, {
        theme: themeState.background === 'bg-1' ? 'light' : 'dark',
        position: 'top-center',
        icon: <BiError />,
      });
      console.error((error as Error).message);
    } finally {
      setIsLoading(false);
      setPressedLogin(false);
      setCredentials({ email: '', password: '' });
    }
  };

  const exitAndChangeScreen = (screenName: string) => {
    closeModalHandler();
    handleChangeScreen(screenName);
  };

  const handleChangeValue = (name: string, value: string) => {
    setCredentials({ ...credentials, [name]: value });
  };

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

  useEffect(() => {
    setCredentials({ email: '', password: '' });
    setValidEmail('has-success');
    setValidPassword('has-success');
  }, [closeModalHandler]);

  useEffect(() => {
    if (pressedLogin) {
      const validatedEmail: string = validateEmail();
      if (validatedEmail !== validEmail) {
        setValidEmail(validatedEmail);
      }
    }
  }, [credentials.email, pressedLogin]);

  useEffect(() => {
    if (pressedLogin) {
      const validatedPassword: string = validatePassword();
      if (validatedPassword !== validPassword) {
        setValidPassword(validatedPassword);
      }
    }
  }, [credentials.password, pressedLogin]);

  const validateUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!pressedLogin) {
      setPressedLogin(true);
    }

    if (
      validateEmail() === 'has-success' &&
      validatePassword() === 'has-success'
    ) {
      loginUser();
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
          <span className='login100-form-title'>Log In</span>
          <FormGroup>
            <div className='wrap-input100 m-b-16'>
              <Input
                className='input100'
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                autoComplete='username'
                required
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
            <div className='wrap-input100'>
              <Input
                className='input100'
                type='password'
                name='password'
                placeholder='Password'
                valid={validPassword === 'has-success'}
                invalid={validPassword === 'has-danger'}
                id='password'
                required
                autoComplete='current-password'
                value={credentials.password}
                onChange={e => handleChangeValue(e.target.name, e.target.value)}
              />
              <span className='focus-input100'></span>
              {validPassword === 'has-danger' && (
                <span className='text-danger text-left'>
                  Password must have at least 8 characters and at least 1
                  uppercase letter, 1 lowercase letter, 1 number, and at least 1
                  special character.
                </span>
              )}
            </div>
          </FormGroup>
          <div className='text-right p-t-13 p-b-9'>
            <button
              className='txt2-button'
              onClick={() => exitAndChangeScreen('forgot-password')}
            >
              Forgot Password?
            </button>
          </div>
          <input
            name='_csrf'
            type='hidden'
            value='10887b51-b4c5-420f-b535-62d762014f9d'
          />
          <div className='container-login100-form-btn'>
            <Button className='login100-form-btn' type='submit'>
              Log In
            </Button>
          </div>
          <div className='text-right txt2 p-t-13 p-b-9'>
            Don't have an account?{' '}
            <button
              className='txt2-button'
              onClick={() => exitAndChangeScreen('register')}
            >
              Sign Up
            </button>
          </div>
          <div className='text-left txt2 p-t-13 p-b-9'>
            This site is protected by reCAPTCHA and the Google service {''}
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

export default Login;
