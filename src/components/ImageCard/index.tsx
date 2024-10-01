import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FlickrPhoto } from '../../types';
import './index.css';

interface PhotoProps {
  photo: FlickrPhoto;
  handleClickedImage: (photo: FlickrPhoto) => void;
}

const ImageCard = ({ photo, handleClickedImage }: PhotoProps) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const imageElement = useRef<HTMLImageElement>(null);

  const getImg = () => {
    const farm = photo.farm;
    const server = photo.server;
    const id = photo.id;
    const secret = photo.secret;
    const title = photo.title;
    const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_z.jpg`;
    return (
      <img
        src={url}
        alt={title}
        // className={loaded ? 'loaded-img' : 'color-img'}
        loading='lazy'
        onLoad={() => setLoaded(true)}
        ref={imageElement}
        style={{ visibility: loaded ? 'visible' : 'hidden' }}
      />
    );
  };
  return (
    <li
      id='gallery__card'
      className='gallery__img'
      data-aos='fade-up'
    >
      <figure data-aos='fade-up'>
        <Link to='' onClick={() => handleClickedImage(photo)}>
          {getImg()}
        </Link>
        <figcaption>{photo.title}</figcaption>
      </figure>
    </li>
  );
};

export default ImageCard;
