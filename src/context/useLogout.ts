import FirebaseAuthService from '../services/firebaseAuthService';
import { useStateContext } from './user-context';

export const useLogout = () => {
  const stateContext = useStateContext();

  const logout = () => {
    FirebaseAuthService.logoutUser();
    stateContext.dispatch({ type: 'SET_USER', payload: null });
  };

  return logout;
};
