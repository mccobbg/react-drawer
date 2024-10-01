import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useEffect,
} from 'react';
import { ThemeState } from '../types';
import themeReducer from './themeReducer';

interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextProps {
  themeState: ThemeState;
  themeHandler: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  themeState: {
    primary: 'color-1',
    background: 'bg-1',
  },
  themeHandler: () => {
    console.log('themeHandler');
  },
});

// get theme settings from local storage, or use default theme
const parseSavedThemeSettings = () => {
  const savedThemeSettings = localStorage.getItem('themeSettings');
  if (savedThemeSettings) {
    return JSON.parse(savedThemeSettings);
  } else {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return {
        primary: 'color-1',
        background: 'bg-2',
      };
    } else {
      return {
        primary: 'color-1',
        background: 'bg-1',
      };
    }
  }
};

const initialThemeState = parseSavedThemeSettings();

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeState, dispatchTheme] = useReducer(
    themeReducer,
    initialThemeState,
  );

  const themeHandler = () => {
    if (themeState.background === 'bg-1') {
      dispatchTheme({ type: 'bg-2' });
    } else {
      dispatchTheme({ type: 'bg-1' });
    }
  };

  // save theme settings to local storage
  useEffect(() => {
    localStorage.setItem(
      'themeSettings',
      JSON.stringify({
        primary: themeState.primary,
        background: themeState.background,
      }),
    );
  }, [themeState.primary, themeState.background]);

  return (
    <ThemeContext.Provider value={{ themeState, themeHandler }}>
      {children}
    </ThemeContext.Provider>
  );
};

// custom hook to use our theme context wherever we want in our project
// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = () => {
  return useContext(ThemeContext);
};
