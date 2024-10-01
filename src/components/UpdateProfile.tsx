import { useState } from 'react';
import { User } from 'firebase/auth';
import { FormEvent } from 'react';
import FirebaseAuthService from '../services/firebaseAuthService';

interface ProfileData {
  existingUser: User | null;
}

const UpdateProfile = ({ existingUser }: ProfileData) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await FirebaseAuthService.loginUser(username, password);

      setUsername('');
      setPassword('');
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleLogout = () => {
    FirebaseAuthService.logoutUser();
  };

  const handleSendResetPasswordEmail = async () => {
    if (!username) {
      alert('Missing user name!');
    } else {
      try {
        await FirebaseAuthService.sendResetPasswordEmail(username);
        alert(`Sent the reset password request to ${username}`);
      } catch (error) {
        alert((error as Error).message);
      }
    }
  };

  /*   const handleLoginWithGoogle = async () => {
    try {
      await FirebaseAuthService.loginWithGoogle();
    } catch (error) {
      alert((error as Error).message);
    }
  }; */

  return (
    <div className='login-form-container'>
      {existingUser ? (
        <div className='row'>
          <h3>Welcome, {existingUser.email}</h3>
          <button
            type='button'
            className='primary-button'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='login-form'>
          <label className='input-label login-label'>
            Username (email):
            <input
              type='email'
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              className='input-text'
            />
          </label>
          <label className='input-label login-label'>
            Password:
            <input
              type='password'
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='input-text'
            />
          </label>
          <div className='button-box'>
            <button className='primary-button'>Login</button>
            <button
              type='button'
              className='primary-button'
              onClick={handleSendResetPasswordEmail}
            >
              Reset Password
            </button>
            {/*             <button
              type="button"
              className="primary-button"
              onClick={handleLoginWithGoogle}
            >
              Login with Google
            </button> */}
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateProfile;
