import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { PreviewData } from '../../types';
import Spinner from '../Spinner';
import UploadIcon from './UploadIcon';
import './index.css';

const ERROR = {
  NOT_SUPPORTED_EXTENSION: 'NOT_SUPPORTED_EXTENSION',
  FILESIZE_TOO_LARGE: 'FILESIZE_TOO_LARGE',
  UPLOAD_PREVIEW_FAILED: 'UPLOAD_PREVIEW_FAILED',
};

interface FileError {
  name: string;
  type: string;
}

export interface Props {
  className?: string;
  fileContainerClassName?: string;
  onChange?: (previews: PreviewData[]) => void;
  onDelete?: (preview: PreviewData) => void;
  onClicked?: (index: number, preview: PreviewData) => void;
  buttonClassName?: string;
  buttonStyles?: object;
  buttonType?: 'button' | 'submit' | 'reset' | undefined;
  withPreview?: boolean;
  accept?: string;
  name?: string;
  withIcon?: boolean;
  buttonText?: string;
  withLabel?: boolean;
  label?: string;
  labelStyles?: object;
  labelClass?: string;
  imgExtension: string[];
  maxFileSize: number;
  fileSizeError?: string;
  fileTypeError?: string;
  errorClass?: string;
  errorStyle?: object;
  singleImage?: boolean;
  style?: object;
}

// eslint-disable-next-line react-refresh/only-export-components
export const removeSavedPreview = (index: number) => {
  const button: HTMLElement = document.getElementById(
    `PBU${index}`,
  ) as HTMLElement;
  button?.click();
};

const PreviewUpload = ({
  className = '',
  fileContainerClassName = '',
  onChange = () => {},
  onDelete = () => {},
  onClicked = () => {},
  buttonClassName = '',
  buttonStyles = {},
  buttonType = 'button',
  withPreview = true,
  accept = 'image/*',
  name = '',
  withIcon = true,
  buttonText = 'Choose images',
  withLabel = false,
  label = '', // Max file size: 5mb, accepted: jpg|gif|png
  labelStyles = {},
  labelClass = '',
  imgExtension = ['jpg', 'jpeg', 'png', 'gif'],
  maxFileSize = 5242880,
  fileSizeError = ' file size is too big',
  fileTypeError = ' is not a supported file extension',
  errorClass = '',
  errorStyle = {},
  singleImage = false,
  style = {},
}: Props) => {
  const [loaded, setLoaded] = useState<boolean>(true);
  const [previews, setPreviews] = useState<PreviewData[]>([]);
  const [fileErrors, setFileErrors] = useState<FileError[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const inputElement = useRef<HTMLInputElement>(null);

  const selectPicture = (index: number) => {
    if (!previews || !previews[index]) {
      return;
    }

    const picture = previews[index];
    if (picture) {
      setSelectedIndex(index);
      onClicked(index, picture);
    }
  };

  useEffect(() => {
    onChange(previews);
    if (previews && previews.length > 0) {
      let index = 0;
      if (selectedIndex > -1) {
        const div = document.getElementById(
          `DI${selectedIndex}`,
        ) as HTMLDivElement;
        if (div) {
          index = selectedIndex;
        }
      }
      selectPicture(index);
    } else {
      setSelectedIndex(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previews]);

  const handleClickedPicture = (index: number, picture: PreviewData) => {
    if (selectedIndex === index) {
      return;
    }

    setSelectedIndex(index);
    onClicked(index, picture);
  };

  /*
	 Check file extension (onDropFile)
	 */
  const hasExtension = (fileName: string) => {
    const ext: string = fileName.split('.').pop() || '';
    return imgExtension.includes(ext) ? true : false;
  };

  /*
    Handle file validation
    */
  const onDropFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      !e.target.files ||
      e.target.files.length === 0 ||
      e.target.value.length == 0
    ) {
      setLoaded(true);
      return;
    }
    const files_ = e.target.files;

    const allFilePromises = [];
    const fileErrors = [];

    // Iterate over all uploaded files
    for (let i = 0; i < files_.length; i++) {
      const file = files_[i];
      const fileError = {
        name: file.name,
        type: '',
      };
      // Check for file extension
      if (!hasExtension(file.name)) {
        fileError.type = ERROR.NOT_SUPPORTED_EXTENSION;
        fileErrors.push(fileError);
        continue;
      }
      // Check for file size
      if (file.size > maxFileSize) {
        fileError.type = ERROR.FILESIZE_TOO_LARGE;
        fileErrors.push(fileError);
        continue;
      }

      allFilePromises.push(readFile(file));
    }

    if (fileErrors.length > 0) {
      setFileErrors(fileErrors);
    }

    Promise.all(allFilePromises).then(newFilesData => {
      const previewData = singleImage ? [] : previews.slice();

      newFilesData.forEach((newFileData: PreviewData) => {
        previewData.push({
          file: newFileData.file,
          dataURL: newFileData.dataURL,
        });
      });

      setPreviews(previewData);
      setTimeout(() => {
        setLoaded(true);
      }, 200);
    });
  };

  const onMouseMove = () => {
    if (
      !inputElement.current ||
      !inputElement.current.files ||
      !inputElement.current.files.length
    ) {
      setLoaded(true);
    }
    document.body.onmousemove = null;
  };

  const pageRefocused = () => {
    document.body.onfocus = null;
    document.body.onmousemove = onMouseMove;
  };

  const onUploadClick = (e: MouseEvent) => {
    const target = e.target as HTMLInputElement;
    // Fixes https://github.com/JakeHartnell/react-images-upload/issues/55
    if (target) {
      target.value = '';
    }
    setFileErrors([]);
    document.body.onfocus = pageRefocused;
  };

  /*
    Read a file and return a promise when resolved provides the file and the data URL
    */
  const readFile = (file: File): Promise<PreviewData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Read the image via FileReader API and save image result in state.
      reader.onload = function (e: ProgressEvent<FileReader>) {
        // Add the file name to the data URL
        let dataURL = e.target?.result as string;
        if (dataURL) {
          dataURL = dataURL.replace(';base64', `;name=${file.name};base64`);
          resolve({ file, dataURL });
        } else {
          reject('File upload failed');
        }
      };

      reader.readAsDataURL(file);
    });
  };

  /*
    Remove the image from state
    */
  const removePicture = (i: number, picture: PreviewData) => {
    const filteredPictures = previews.filter(
      (_e: PreviewData, index: number) => index !== i,
    );

    onDelete(picture);
    setPreviews(filteredPictures);
  };

  /*
    Check if any errors && render
    */
  const renderErrors = () => {
    return fileErrors.map((fileError: FileError, index: number) => {
      return (
        <div
          className={'errorMessage ' + errorClass}
          key={index}
          style={errorStyle}
        >
          * {fileError.name}{' '}
          {fileError.type === ERROR.FILESIZE_TOO_LARGE
            ? fileSizeError
            : fileTypeError}
        </div>
      );
    });
  };

  /*
    Render label
    */
  const renderLabel = () => {
    return (
      <p className={labelClass} style={labelStyles}>
        {label}
      </p>
    );
  };

  const renderPreviewPictures = () => {
    return previews.map((preview, index) => {
      return (
        <div
          key={index}
          className='card uploadPictureContainer'
          style={{
            borderColor: selectedIndex === index ? 'darkgray' : '',
            maxWidth: selectedIndex === index ? '50%' : '',
          }}
        >
          <div
            id={`DI${index}`}
            data-aos='fade-up'
            data-filename={preview.file.name}
            data-index={index}
            data-selected='0'
            className={
              loaded ? 'loaded-img picture__img' : 'color-img picture__img'
            }
            onClick={() => handleClickedPicture(index, preview)}
          >
            <button
              id={`PBU${index}`}
              onClick={() => removePicture(index, preview)}
              className={selectedIndex === index ? 'delete__picture mv_x' : ''}
            ></button>
            <img
              src={preview.dataURL}
              loading='lazy'
              className='uploadPicture'
              alt={preview.file.name}
              style={{ visibility: loaded ? 'visible' : 'hidden' }}
            />
          </div>
        </div>
      );
    });
  };

  /*
    On button click, trigger input file to open
    */
  const triggerFileUpload = () => {
    inputElement.current?.click();
    setLoaded(false);
  };

  return (
    <div className={'fileUploader ' + className} style={style}>
      {withIcon ? (
        <UploadIcon
          className='uploadIcon'
          width='2.8rem'
          onClick={triggerFileUpload}
        />
      ) : (
        <button
          type={buttonType}
          className={'chooseFileButton ' + buttonClassName}
          style={buttonStyles}
          onClick={triggerFileUpload}
        >
          {buttonText}
        </button>
      )}
      <div className={'fileContainer ' + fileContainerClassName}>
        {!loaded && <Spinner />}
        {withLabel && renderLabel()}
        <div className='errorsContainer'>{renderErrors()}</div>
        <input
          type='file'
          ref={inputElement}
          name={name}
          multiple={!singleImage}
          onChange={e => onDropFile(e)}
          onClick={e => onUploadClick(e)}
          accept={accept}
        />
        {withPreview && previews.length > 0 && (
          <div className='container uploadPicturesWrapper'>
            {renderPreviewPictures()}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewUpload;
