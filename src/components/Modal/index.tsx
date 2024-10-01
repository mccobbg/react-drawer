import { Fragment, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Card from '../Card';
// import { useModalContext } from '../../context/modal-context';
import './index.css';

interface ModalProps {
  className: string;
  showModal: boolean;
  closeModalHandler: () => void;
  children: ReactNode;
}

const Modal = ({
  className,
  showModal,
  closeModalHandler,
  children,
}: ModalProps) => {
  // const { showModal, closeModalHandler } = useModalContext();
  useEffect(() => {
    const closeOnEscapeKey = (e: { key: string }) =>
      e.key === 'Escape' ? closeModalHandler() : null;
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [closeModalHandler]);

  return (
    <Fragment>
      {showModal &&
        ReactDOM.createPortal(
          <Fragment>
            <section id='backdrop' onClick={closeModalHandler}></section>
            <Card className={className}>{children}</Card>
          </Fragment>,
          document.querySelector('#overlays') as Element,
        )}
    </Fragment>
  );
};

export default Modal;
