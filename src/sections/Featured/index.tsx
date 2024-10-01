import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import photos from './photos.json';
import { FlickrPhoto, MediaType, StoreType } from '../../types';
import ImageModal from '../../components/ImageModal';
import { useModalContext } from '../../context/modal-context';
import './index.css';

const Featured = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const { imageModalOpen, setImageModalOpen } = useModalContext();
  const [clickedPhotoInfo, setClickedPhotoInfo] = useState<StoreType>({
    artist: '',
    title: '',
    date: '',
    dimensions: '',
    imageUri: '',
    media: MediaType.Photograph,
    price: '',
  });
  const getImg = (photo: FlickrPhoto) => {
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
        loading='lazy'
        onLoad={() => setLoaded(true)}
        style={{ visibility: loaded ? 'visible' : 'hidden' }}
      />
    );
  };

  const handleClickedImage = (photo: FlickrPhoto) => {
    setClickedPhotoInfo({
      artist: 'George Salzmann',
      title: photo.title,
      date: 'June 2017',
      dimensions: '42 x 32 in.',
      imageUri: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`,
      media: MediaType.Photograph,
      price: '5,000.00 USD',
    });
    setImageModalOpen(true);
  };
  return (
    <section id='Featured'>
      <h2>Featured</h2>
      <div className='container featured__container'>
        {photos.map((photo: FlickrPhoto) => (
          <Card key={photo.id} className='featured' data-aos='fade-up'>
            <div className='featured__category'>
              <p>{photo.category}</p>
            </div>
            <div
              className={
                loaded
                  ? 'loaded-img featured__image'
                  : 'color-img featured__image'
              }
            >
              <figure data-aos='fade-up'>
                <Link to='' onClick={() => handleClickedImage(photo)}>
                  {getImg(photo)}
                </Link>
                <figcaption>{photo.title}</figcaption>
              </figure>
            </div>
          </Card>
        ))}
      </div>
      <ImageModal
        showModal={imageModalOpen}
        closeModalHandler={() => setImageModalOpen(false)}
        imageInfo={clickedPhotoInfo}
      />
    </section>
  );
};

export default Featured;
