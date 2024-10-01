import { ReactNode, createContext, useContext, useReducer } from 'react';
import { useLogout } from './useLogout';
import { UserType } from '../types';

type State = {
  authUser: UserType | null;
};

type Action = {
  type: string | null;
  payload: UserType | null;
};

interface StateContextData {
  state: State;
  logout: () => void;
  dispatch: (action: Action) => void;
}

const initialState: State = {
  authUser: null,
};

type StateContextProviderProps = { children: ReactNode };

const StateContext = createContext<StateContextData>({
  state: initialState,
  logout: () => {},
  dispatch: () => {},
});

const stateReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        authUser: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

const StateContextProvider = ({ children }: StateContextProviderProps) => {
  const logout = useLogout();
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const value = { state, logout, dispatch };
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

const useStateContext = () => {
  const context = useContext(StateContext);

  if (context) {
    return context;
  }

  throw new Error(`useStateContext must be used within a StateContextProvider`);
};

// eslint-disable-next-line react-refresh/only-export-components
export { StateContextProvider, useStateContext };
