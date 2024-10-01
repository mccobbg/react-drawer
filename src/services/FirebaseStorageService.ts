import firebase from '../config/FirebaseConfig';
import {
  ref,
  // uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  // listAll,
  // list
} from 'firebase/storage';

const storage = firebase.storage;

const uploadFile = async (
  file: Blob | Uint8Array | ArrayBuffer,
  fullFilePath: string,
  progressCallback: (p: number) => void,
): Promise<string> => {
  const uploadRef = ref(storage, fullFilePath);
  const uploadTask = uploadBytesResumable(uploadRef, file);

  uploadTask.on(
    'state_changed',
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
      );

      progressCallback(progress);
    },
    error => {
      throw error;
    },
  );

  await uploadTask;
  return getDownloadURL(uploadTask.snapshot.ref);
};

const deleteFile = (fileDownloadUrl: string) => {
  const decodedUrl = decodeURIComponent(fileDownloadUrl);
  const startIndex = decodedUrl.indexOf('/o/') + 3;
  const endIndex = decodedUrl.indexOf('?');
  const filePath = decodedUrl.substring(startIndex, endIndex);
  const fileRef = ref(storage, filePath);

  return deleteObject(fileRef);
};

const FirebaseFirestoreService = {
  uploadFile,
  deleteFile,
};

export default FirebaseFirestoreService;
