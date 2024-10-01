/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

interface ModelContextProps {
  loginModalOpen: boolean;
  registerModalOpen: boolean;
  forgotPasswordModalOpen: boolean;
  imageModalOpen: boolean;
  setLoginModalOpen: (modalOpen: boolean) => void;
  setRegisterModalOpen: (modalOpen: boolean) => void;
  setForgotPasswordModalOpen: (modalOpen: boolean) => void;
  setImageModalOpen: (modalOpen: boolean) => void;
  handleChangeScreen: (screen: string) => void;
}

const ModalContext = createContext<ModelContextProps>({
  loginModalOpen: false,
  registerModalOpen: false,
  forgotPasswordModalOpen: false,
  imageModalOpen: false,
  setLoginModalOpen: function (_modalOpen: boolean): void {
    throw new Error('Function not implemented.');
  },
  setRegisterModalOpen: function (_modalOpen: boolean): void {
    throw new Error('Function not implemented.');
  },
  setImageModalOpen: function (_modalOpen: boolean): void {
    throw new Error('Function not implemented.');
  },
  setForgotPasswordModalOpen: function (_modalOpen: boolean): void {
    throw new Error('Function not implemented.');
  },
  handleChangeScreen: function (_newValue: string): void {
    throw new Error('Function not implemented.');
  },
});

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [registerModalOpen, setRegisterModalOpen] = useState<boolean>(false);
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] =
    useState<boolean>(false);
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);

  const handleChangeScreen = async (screen: string) => {
    if (screen === 'register') {
      setRegisterModalOpen(true);
    } else if (screen === 'login') {
      setLoginModalOpen(true);
    } else if (screen === 'forgot-password') {
      setForgotPasswordModalOpen(true);
    } else if (screen === 'image-modal') {
      setImageModalOpen(true);
    }
  };

  return (
    <ModalContext.Provider
      value={
        useMemo(() => ({
          loginModalOpen,
          setLoginModalOpen,
          registerModalOpen,
          setRegisterModalOpen,
          forgotPasswordModalOpen,
          setForgotPasswordModalOpen,
          imageModalOpen,
          setImageModalOpen,
          handleChangeScreen,
        }), [forgotPasswordModalOpen, imageModalOpen, loginModalOpen, registerModalOpen])
      }
    >
      {children}
    </ModalContext.Provider>
  );
};

// custom hook to consume the modal context anywhere in our app
// eslint-disable-next-line react-refresh/only-export-components
export const useModalContext = () => {
  return useContext(ModalContext);
};
