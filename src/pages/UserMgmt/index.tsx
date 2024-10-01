import { ReactNode, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import firebase from '../../config/FirebaseConfig';
import {
  applyActionCode,
  checkActionCode,
  confirmPasswordReset,
  verifyPasswordResetCode,
} from 'firebase/auth';
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './index.css';

const auth = firebase.auth;

enum AuthMode {
  resetPassword = 'resetPassword',
  recoverEmail = 'recoverEmail',
  verifyEmail = 'verifyEmail',
  error = 'error',
  none = 'none',
}

const UserMgmt = () => {
  const [searchParams] = useSearchParams();
  const [showPasswordText, setShowPasswordText] = useState<boolean>(false);
  const [validPassword, setValidPassword] = useState<string>('has-success');
  const [password, setPassword] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const oobCode = useRef<string>('');
  const error = useRef<ReactNode>(
    <div>
      <h3>Page Not Found</h3>
      <p>The page you were looking for was not found.</p>
    </div>,
  );
  const email = useRef<string>('');

  const passwordRex =
    /^(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/;

  const firebaseError = (authMode: AuthMode, error: Error) => {
    const message = error.message;
    let returnString: string = '';

    if (!!message && message.includes('expired')) {
      returnString = 'Your session expired. ';
    }
    switch (authMode) {
      case AuthMode.recoverEmail:
        returnString = 'Please try again or contact us for assistance.';
        break;
      case AuthMode.resetPassword:
        returnString =
          'Please request resetting your password again. Contact us if you need assistance.';
        break;
      case AuthMode.verifyEmail:
        returnString = 'Please contact us for assistance.';
        break;
      default:
    }
    return returnString;
  };

  const validatePassword = async () => {
    if (passwordRex.test(password)) {
      setValidPassword('has-success');
    } else {
      setValidPassword('has-danger');
      try {
        await confirmPasswordReset(auth, oobCode.current, password);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    // Get the one-time code from the query parameter.
    oobCode.current = searchParams.get('oobCode') || AuthMode.none;

    // (Optional) Get the continue URL from the query parameter if available.
    // const continueUrl = searchParams.get('continueUrl') || '';

    // (Optional) Get the language code if available.
    // const lang = searchParams.get('lang') || 'en';

    // Get the mode - reset password, recover email, or verify email
    const mode: string = searchParams.get('mode') || AuthMode.none;

    // Handle the user management action.
    switch (mode) {
      case AuthMode.resetPassword: // Display reset password handler and UI.
        handleResetPassword();
        break;
      case AuthMode.recoverEmail: // Display email recovery handler and UI.
        handleRecoverEmail();
        break;
      case AuthMode.verifyEmail: // Display email verification handler and UI.
        handleVerifyEmail();
        break;
      default: // Error: invalid mode.
        setOutput(AuthMode.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleResetPassword = async (): Promise<void> => {
    try {
      email.current = await verifyPasswordResetCode(auth, oobCode.current);
      setOutput(AuthMode.resetPassword);
    } catch (err) {
      console.error(`Error resetting password: ${(err as Error).message}`);
      error.current = (
        <div>
          <h3>Error resetting Password</h3>
          <p>{firebaseError(AuthMode.resetPassword, err as Error)}</p>
        </div>
      );
      setOutput(AuthMode.error);
    }
  };

  const handleRecoverEmail = async (): Promise<void> => {
    // Confirm the action code is valid.
    try {
      const info = await checkActionCode(auth, oobCode.current);
      email.current = info['data']['email'] || '';

      if (email.current) {
        await applyActionCode(auth, oobCode.current);
        // Account email reverted to restoredEmail

        // You might also want to give the user the option to reset their password
        // in case the account was compromised:
        // sendPasswordResetEmail(auth, restoredEmail)
        //   .then(() => {
        //     // Password reset confirmation sent. Ask user to check their email.
        //   })
        //   .catch(error => {
        //     // Error encountered while sending password reset code.
        //   });

        setOutput(AuthMode.recoverEmail);
      } else {
        throw new Error('Restored email is empty');
      }
    } catch (err) {
      console.error(`Error recovering email: ${(err as Error).message}`);
      error.current = (
        <div>
          <h3>Error recovering Email</h3>
          <p>{firebaseError(AuthMode.recoverEmail, err as Error)}</p>
        </div>
      );
      setOutput(AuthMode.error);
    }
  };

  const handleVerifyEmail = async (): Promise<void> => {
    // Apply the email verification code.
    try {
      console.info(`handleVerifyEmail oob code: ${oobCode.current}`);
      await applyActionCode(auth, oobCode.current);
      setOutput(AuthMode.verifyEmail);
    } catch (err) {
      // Code is invalid or expired. Ask the user to verify their email address
      // again.
      console.error(`Error verifying email: ${(err as Error).message}`);
      error.current = (
        <div>
          <h3>Error verifying Email</h3>
          <p>{firebaseError(AuthMode.verifyEmail, err as Error)}</p>
        </div>
      );
      setOutput(AuthMode.error);
    }
  };

  return (
    <section id='usermgmt'>
      <div className='container'>
        {output === AuthMode.resetPassword && (
          <Form
            onSubmit={() => validatePassword()}
            name='login'
            method='POST'
            className='formStyle'
          >
            <div className='formTitleStyle'>Update Password</div>
            <Label className='labelStyle'>{email.current}</Label>
            <FormGroup>
              <div className='wrapInputStyle marginBottomStyle marginTopStyle'>
                <div className='inputStyle'>
                  <Input
                    className='input100Style'
                    type={showPasswordText ? 'text' : 'password'}
                    name='password'
                    placeholder='Password'
                    valid={validPassword === 'has-success'}
                    invalid={validPassword === 'has-danger'}
                    id='password'
                    required
                    autoComplete='new-password'
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value);
                    }}
                  />
                  <button
                    className='passwordButtonStyle'
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
                <span className='focusInput100Style'></span>
                {validPassword === 'has-danger' && (
                  <span className='textDangerStyle textLeftStyle'>
                    Password must have at least 8 characters and at least 1
                    uppercase letter, 1 lowercase letter, 1 number, and 1
                    special character.
                  </span>
                )}
              </div>
            </FormGroup>
            <Input
              name='username'
              type='hidden'
              autoComplete='username'
              value={email.current}
            />
            <input
              name='_csrf'
              type='hidden'
              value='10887b51-b4c5-420f-b535-62d762014f9d'
            />
            <div className='containerLogin100ButtonStyle'>
              <Button className='login100FormButtonStyle' type='submit'>
                Update Password
              </Button>
            </div>
            <div className='txt2Style'>
              This site is protected by reCAPTCHA and the Google service {''}
              <Link
                className='linkButtonStyle'
                to='https://policies.google.com/privacy'
              >
                Privacy Policy
              </Link>
              {' and '}
              <Link
                className='linkButtonStyle'
                to='https://policies.google.com/terms'
              >
                Terms of Service
              </Link>
              {' apply.'}
            </div>
          </Form>
        )}
        {output === AuthMode.verifyEmail && (
          <div>
            <h3>Your email {email.current} has been verified.</h3>
            <p>You can now sign in with your new account.</p>
          </div>
        )}
        {output === AuthMode.recoverEmail && (
          <div>
            <h3>Your email {email.current} has been restored.</h3>
            <p>You can now sign in with your restored account.</p>
          </div>
        )}
        {output === AuthMode.error && error.current}
      </div>
    </section>
  );
};

export default UserMgmt;
