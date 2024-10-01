import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { BsEasel } from 'react-icons/bs';
import { useStateContext } from '../../context/user-context';
import FirebaseFirestoreService from '../../services/FirebaseFirestoreService';
import FirebaseStorageService from '../../services/FirebaseStorageService';
import { ArtWork, PreviewData, SelectedPreviewData } from '../../types';
import Spinner from '../../components/Spinner';
import PreviewUpload, {
  removeSavedPreview,
} from '../../components/PreviewUpload';
import './index.css';

const Index = () => {
  const stateContext = useStateContext();
  const user = stateContext.state.authUser;
  const [numPreviews, setNumPreviews] = useState<number>(0);
  const [uploadProgress, setUploadProgress] = useState(-1);
  const [selectedPreview, setSelectedPreview] =
    useState<SelectedPreviewData | null>(null);
  const [selectedArtWork, setSelectedArtWork] = useState<ArtWork | null>(null);
  const [artworkInfo, setArtworkInfo] = useState<ArtWork>({
    title: '',
    artist: '',
    categories: [],
    description: '',
    dimensions: '',
    image: '',
    media: '',
    price: 0,
    index: -1,
  });

  const [fetchedArtWork, setFetchedArtWork] = useState<ArtWork[]>([]);
  const previews = useRef<PreviewData[]>([]);
  const selectedArtWorkIndex = useRef<number>(-1);

  const fetchArtWork = useCallback(async () => {
    const response = await FirebaseFirestoreService.readDocuments({
      collection: `users/${user!.uid}/artwork`,
      queries: [],
    });

    if (response && response.docs) {
      const images = response.docs.map(imageData => {
        const id = imageData.id;
        const data = imageData.data();
        return { ...data, id };
      });
      return [...images] as unknown as ArtWork[];
    }
    return null;
  }, [user]);

  const handleFetchedArtWork = useCallback(() => {
    fetchArtWork()
      .then(fetchedArtWork => {
        if (fetchedArtWork) {
          setFetchedArtWork(fetchedArtWork);
        }
      })
      .catch(error => {
        throw error;
      });
  }, [fetchArtWork]);

  useEffect(() => {
    if (user && user.uid) {
      handleFetchedArtWork();
    }
  }, [handleFetchedArtWork, user]);

  useEffect(() => {
    if (selectedArtWork || numPreviews > 0) {
      (document.getElementById('title') as HTMLInputElement).value =
        selectedArtWork?.title || '';
      (document.getElementById('artist') as HTMLInputElement).value =
        selectedArtWork?.artist || '';
      const categories = document.getElementById(
        'categories',
      ) as HTMLSelectElement;
      if (categories) {
        Array.from(categories.options).forEach(option => {
          option.selected = selectedArtWork
            ? selectedArtWork.categories.includes(option.value)
            : false;
        });
      }
      (document.getElementById('description') as HTMLInputElement).value =
        selectedArtWork?.description || '';
      (document.getElementById('dimensions') as HTMLInputElement).value =
        selectedArtWork?.dimensions || '';
      (document.getElementById('media') as HTMLInputElement).value =
        selectedArtWork?.media || '';
      (document.getElementById('price') as HTMLInputElement).value =
        selectedArtWork?.price.toString() || '';
    }
  }, [selectedArtWork, numPreviews]);

  const handleChangeCategories = (e: ChangeEvent<HTMLSelectElement>) => {
    const elem = e.target as HTMLSelectElement;
    if (elem) {
      const selected = Array.from(elem.options)
        .filter(option => {
          return option.selected;
        })
        .map(option => {
          return option.value;
        });
      setArtworkInfo({ ...artworkInfo, categories: selected });
    }
  };

  const handleChangeValue = (name: string, value: string) => {
    setArtworkInfo({ ...artworkInfo, [name]: value });
  };

  const resetForm = () => {
    setArtworkInfo({
      title: '',
      artist: '',
      categories: [],
      description: '',
      dimensions: '',
      image: '',
      media: '',
      price: 0,
      index: -1,
    });
  };

  const onDeletePreview = (picture: PreviewData) => {
    resetForm();
    if (selectedPreview && selectedPreview.file.name === picture.file.name) {
      setSelectedPreview(null);
    }
  };

  const onClickedPreview = (index: number, picture: PreviewData) => {
    if (selectedArtWork) {
      selectedArtWorkIndex.current = -1;
      setSelectedArtWork(null);
    }
    const selected: SelectedPreviewData = {
      file: picture.file,
      dataURL: picture.dataURL,
      index,
    };
    setSelectedPreview(selected);
  };

  const onClickedArtWork = (index: number, artWork: ArtWork) => {
    if (numPreviews === 0 && selectedArtWorkIndex.current !== index) {
      selectedArtWorkIndex.current = index;

      const selected: ArtWork = {
        title: artWork.title,
        artist: artWork.artist,
        categories: artWork.categories,
        description: artWork.description,
        price: artWork.price,
        image: artWork.image,
        dimensions: artWork.dimensions,
        media: artWork.media,
        index,
      };

      setSelectedArtWork(selected);
    }
  };

  const removeArtWork = (index: number, picture: ArtWork) => {
    if (index > 0 && picture) {
      console.log('removeArtWork');
    }
  };

  const SaveImagesInfo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setUploadProgress(0);

    try {
      const generatedFileId = uuidv4();
      let downloadUrl: string = '';
      if (selectedPreview) {
        downloadUrl = await FirebaseStorageService.uploadFile(
          selectedPreview.file,
          `artwork/${generatedFileId}`,
          setUploadProgress,
        );
      }

      const artWork: ArtWork = {
        title: artworkInfo.title,
        artist: artworkInfo.artist,
        categories: artworkInfo.categories,
        description: artworkInfo.description,
        dimensions: artworkInfo.dimensions,
        image: downloadUrl || artworkInfo.image,
        media: artworkInfo.media,
        price: artworkInfo.price,
      };

      // /users/${user.uid}/artwork/${uuidv4()}
      await FirebaseFirestoreService.createDocument(
        `users/${user!.uid}/artwork`,
        generatedFileId,
        artWork,
      );

      //alert(`succesfully saved ${artworkInfo.title}`); // TBD use toast
      console.log(`succesfully saved ${artworkInfo.title}`);

      if (selectedPreview) {
        removeSavedPreview(selectedPreview.index);
      }

      handleFetchedArtWork();
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setUploadProgress(-1);
    }
  };

  const closeToolbarInfo = () => {
    selectedArtWorkIndex.current = -1;
    setSelectedArtWork(null);
  };

  const imagesSelected = (pictureData: PreviewData[]) => {
    console.log(`Selected #previews: ${pictureData.length}`);
    previews.current = pictureData;
    const numberOfImages = pictureData.length;
    setNumPreviews(numberOfImages);
    if (numberOfImages == 0 && selectedPreview) {
      setSelectedPreview(null);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <div id='dashboard'>
      <div>
        <span className='icon'>
          <BsEasel className='icon' /> / Art Work
        </span>
        <div className='dashboard__content'>
          <div className='dashboard__toolbar'>
            <PreviewUpload
              style={{
                maxWidth: '100%',
                margin: '0.5rem auto',
                paddingLeft: '1rem',
              }}
              fileContainerClassName='preview__upload'
              imgExtension={[
                'jpg',
                'jpeg',
                'gif',
                'png',
                'heic',
                'webp',
                'svg',
              ]}
              maxFileSize={20000000}
              onChange={imagesSelected}
              onClicked={onClickedPreview}
              onDelete={onDeletePreview}
              withLabel={true}
              label='Upload'
            />
            {uploadProgress > -1 && <Spinner />}
          </div>
          <section id='index'>
            <div className='picture__container'>
              {fetchedArtWork.map((picture: ArtWork, index: number) => (
                <div
                  key={index}
                  className='card index'
                  style={{
                    borderColor:
                      selectedArtWork?.index === index ? 'darkgray' : '',
                    maxWidth: selectedArtWork?.index === index ? '50%' : '',
                  }}
                >
                  <div
                    className={
                      uploadProgress > -1
                        ? 'color-img picture__img'
                        : 'loaded-img picture__img'
                    }
                    data-aos='fade-up'
                    onClick={() => onClickedArtWork(index, picture)}
                  >
                    <figure>
                      <button
                        className={
                          selectedArtWork?.index === index
                            ? 'delete__picture'
                            : ''
                        }
                        onClick={() => removeArtWork(index, picture)}
                      ></button>
                      <img
                        src={picture.image}
                        alt={picture.title}
                        loading='lazy'
                        style={{
                          visibility:
                            uploadProgress > -1 ? 'hidden' : 'visible',
                        }}
                      />
                      <figcaption>{picture.title}</figcaption>
                    </figure>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div
        className='toolbar__file__background'
        style={{
          display: selectedArtWork || numPreviews > 0 ? 'flex' : 'none',
        }}
      >
        <Input className='input__15' value='XXX' />
      </div>
      <div
        className='toolbar__file__info'
        style={{
          zIndex: selectedArtWork || numPreviews > 0 ? '5' : '-5',
        }}
      >
        {selectedArtWork && (
          <button className='close__toolbar__info' onClick={closeToolbarInfo}>
            X
          </button>
        )}
        <Form
          onSubmit={e => SaveImagesInfo(e)}
          name='save_info'
          method='POST'
          className='login100-form p-l-55 p-r-55 p-t-10'
        >
          <FormGroup className='wrap__input m-b-16'>
            <Label for='title'>Title</Label>
            <span />
            <span style={{ float: 'right', color: 'red' }}> Required</span>
            <Input
              type='text'
              name='title'
              id='title'
              className='input100 file__info__input'
              required
              onChange={e => handleChangeValue(e.target.name, e.target.value)}
            />
          </FormGroup>
          <FormGroup className='wrap__input m-b-16'>
            <Label for='artist'>Artist</Label>
            <span />
            <Input
              type='text'
              name='artist'
              id='artist'
              className='input100 file__info__input'
              required
              onChange={e => handleChangeValue(e.target.name, e.target.value)}
            />
          </FormGroup>
          <FormGroup className='wrap__input m-b-16'>
            <Label for='categories'>Categories</Label>
            <select
              name='categories'
              className='input100 file__info__input'
              onChange={e => handleChangeCategories(e)}
              id='categories'
              defaultValue={'DEFAULT'}
              multiple
            >
              <option value='DEFAULT' disabled>
                Select a category ...
              </option>
              <option value='Landscape'>Landscape</option>
              <option value='Portrait'>Portrait</option>
              <option value='Abstract'>Abstract</option>
              <option value='Photography'>Photography</option>
              <option value='Painting'>Painting</option>
              <option value='Sculpture'>Sculpture</option>
              <option value='Drawing'>Drawing</option>
              <option value='Digital'>Digital</option>
              <option value='Printmaking'>Printmaking</option>
              <option value='Mixed Media'>Mixed Media</option>
            </select>
          </FormGroup>
          <FormGroup className='wrap__input m-b-16'>
            <Label for='description'>Description</Label>
            <textarea
              name='description'
              id='description'
              className='input100 file__info__input'
              onChange={e => handleChangeValue(e.target.name, e.target.value)}
            />
          </FormGroup>
          <FormGroup className='wrap__input m-b-16'>
            <Label for='dimensions'>Dimensions</Label>
            <span />
            <Input
              type='text'
              name='dimensions'
              className='input100 file__info__input'
              id='dimensions'
              required
              onChange={e => handleChangeValue(e.target.name, e.target.value)}
            />
          </FormGroup>
          <FormGroup className='wrap__input m-b-16'>
            <Label for='media'>Media</Label>
            <span />
            <Input
              type='text'
              name='media'
              className='input100 file__info__input'
              id='media'
              required
              onChange={e => handleChangeValue(e.target.name, e.target.value)}
            />
          </FormGroup>
          <FormGroup className='wrap__input m-b-16'>
            <Label for='price'>Price</Label>
            <Input
              type='number'
              name='price'
              className='input100 file__info__input'
              id='price'
              onChange={e => handleChangeValue(e.target.name, e.target.value)}
            />
          </FormGroup>
          <div className='container-login100-form-btn'>
            <Button className='login100-form-btn file__info__btn' type='submit'>
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Index;
