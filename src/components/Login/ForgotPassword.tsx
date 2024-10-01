import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../Modal';
import { LoginProps } from '../../types';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import Spinner from '../Spinner';
import { useThemeContext } from '../../context/theme-context';
import FirebaseAuthService from '../../services/firebaseAuthService';
import { AiOutlineMail } from 'react-icons/ai';
import { BiError } from 'react-icons/bi';
import './index.css';
import { Link } from 'react-router-dom';

const ForgotPassword = ({
  showModal,
  closeModalHandler,
  handleChangeScreen,
}: LoginProps) => {
  const [email, setEmail] = useState<string>('');
  const [validEmail, setValidEmail] = useState<string>('has-success');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { themeState } = useThemeContext();

  const handleSendResetPasswordEmail = async () => {
    try {
      setIsLoading(true);
      const result: boolean = await FirebaseAuthService.sendResetPasswordEmail(
        email,
      );
      if (result) {
        toast.success(`Reset password request sent to ${email}`, {
          theme: themeState.background === 'bg-1' ? 'light' : 'dark',
          position: 'top-center',
          icon: <AiOutlineMail />,
        });
      } else {
        toast.error(`User ${email} not found`, {
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
      console.error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const exitAndChangeScreen = (screenName: string) => {
    closeModalHandler();
    handleChangeScreen(screenName);
  };

  const validateEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validatedEmail: string = validEmail;

    if (email.length > 0) {
      if (emailRex.test(email)) {
        if (validEmail === 'has-danger') {
          validatedEmail = 'has-success';
        }
      } else if (validEmail === 'has-success') {
        validatedEmail = 'has-danger';
      }
    } else if (validEmail === 'has-success') {
      validatedEmail = 'has-danger';
    }
    if (validatedEmail === 'has-success') {
      handleSendResetPasswordEmail();
    } else {
      setValidEmail(validatedEmail);
    }
  };

  useEffect(() => {
    setEmail('');
    setValidEmail('has-success');
  }, [closeModalHandler]);

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
          onSubmit={validateEmail}
          name='login'
          method='POST'
          className='login100-form p-l-55 p-r-55 p-t-10'
        >
          <span className='login100-form-title'>Forgot Password</span>
          <FormGroup>
            <div className='wrap-input100 m-b-16'>
              <Input
                className='input100'
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                required
                value={email}
                valid={validEmail === 'has-success'}
                invalid={validEmail === 'has-danger'}
                onChange={e => setEmail(e.target.value)}
              />
              <span className='focus-input100'></span>
              {validEmail === 'has-danger' && (
                <span className='text-danger'>
                  Please enter a valid email address.
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
            <Button
              className='login100-form-btn form-btn-forgot-pwd'
              type='submit'
            >
              Send reset password instructions
            </Button>
          </div>
          <div className='text-right txt2 p-t-13 p-b-23'>
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

export default ForgotPassword;
