import { useRef, useEffect, useState } from 'react';
import Modal from '../Modal';
import { ImageModalProps } from '../../types';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import './index.css';

const ImageModal = ({
  showModal,
  closeModalHandler,
  imageInfo,
}: ImageModalProps) => {
  // const navigate = useNavigate();
  const imageElement = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (isLoaded) {
      const divElement = document.getElementById('image__info');
      const height = imageElement.current?.naturalHeight;
      const width = imageElement.current?.naturalWidth;
      if (divElement && height && width) {
        divElement.className =
          height > width ? 'image__portrait' : 'image__landscape';
      }
    }
  }, [isLoaded]);

  const localCloseModalHandler = () => {
    closeModalHandler();
    setIsLoaded(false);
  };

  return (
    <>
      <Modal
        showModal={showModal}
        closeModalHandler={localCloseModalHandler}
        className='image__modal'
      >
        <div id='image__info'>
          <div className='image__img'>
            <img
              src={imageInfo.imageUri}
              alt={imageInfo.title}
              ref={imageElement}
              loading='lazy'
              onLoad={() => setIsLoaded(true)}
            />
            <div className='image__caption'>
              <p>June 2017</p>
            </div>
          </div>
          <div className='image__artist'>
            <table className='table__artist'>
              <tbody>
                <tr>
                  <td>Title</td>
                  <td>{imageInfo.title}</td>
                </tr>
                <tr>
                  <td>Artist</td>
                  <td>{imageInfo.artist}</td>
                </tr>
                <tr>
                  <td>Media</td>
                  <td>{imageInfo.media}</td>
                </tr>
                <tr>
                  <td>Dimensions</td>
                  <td>{imageInfo.dimensions}</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>{imageInfo.price}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='image__footer'>
          <p>Copyright 2023 Box drawer</p>
        </div>
      </Modal>
    </>
  );
};

export default ImageModal;
