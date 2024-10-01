import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import { FlickrPhoto, MediaType, StoreType } from '../../types';
import ImageModal from '../../components/ImageModal';
import ImageCard from '../../components/ImageCard';
import photos from '../../assets/json/photoset.json';
import { useModalContext } from '../../context/modal-context';

import './index.css';

const Gallery = () => {
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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

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
    <section id='gallery'>
      <h2>Gallery</h2>
      <div className='gallery__container'>
        <div className='photo-container'>
          <ul>
            {photos.photoset.photo.map((photo: FlickrPhoto) => (
              <Card key={photo.id} className='gallery' data-aos='fade-up'>
                <ImageCard
                  photo={photo}
                  handleClickedImage={handleClickedImage}
                />
              </Card>
            ))}
          </ul>
        </div>
        <ImageModal
          showModal={imageModalOpen}
          closeModalHandler={() => setImageModalOpen(false)}
          imageInfo={clickedPhotoInfo}
        />
      </div>
    </section>
  );
};

export default Gallery;
