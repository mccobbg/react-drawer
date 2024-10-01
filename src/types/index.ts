import {
  FieldPath,
  OrderByDirection,
  WhereFilterOp,
} from '@firebase/firestore-types';

export interface ThemeState {
  primary: string;
  background: string;
}

export interface LoginProps {
  showModal: boolean;
  closeModalHandler: () => void;
  handleChangeScreen: (screen: string) => void;
}

export interface BoxdrawerProps {
  className: string;
  height: string;
  width: string;
}

export enum MediaType {
  Collage = 'Collage',
  Photograph = 'Photograph',
  Acrylic = 'Acrylic',
  Oil = 'Oil',
  MixedMedia = 'Mixed Media',
  Watercolor = 'Watercolor',
  Pencil = 'Pencil',
  PenAndInk = 'Pen and Ink',
  Video = 'Video',
}

export interface StoreType {
  UID?: string;
  artist: string;
  date: string;
  dimensions: string;
  imageUri: string;
  media: MediaType;
  price: string;
  title: string;
  description?: string;
}

export interface ImageModalProps {
  showModal: boolean;
  closeModalHandler: () => void;
  imageInfo: StoreType;
}

export interface AddressType {
  city: string;
  country: string;
  postalCode: string;
  state: string;
  street: string;
}

export interface ContactInfoType {
  contactId?: string;
  contactName: string;
  contactEmail: string;
  subject: string;
  message: string;
}

export interface ProfileType {
  UID?: string;
  firstName: string;
  lastName: string;
  CV: string;
  address: AddressType;
  artistStatement: string;
  icon?: string;
  email: string;
  phoneNumber: string;
}

export interface DocumentQueryType {
  collection: string;
  queries: QueryType[];
  orderByField?: string | FieldPath;
  orderByDirection?: OrderByDirection;
  perPage?: number;
  cursorId?: string;
}

export interface QueryType {
  field: string;
  condition: WhereFilterOp;
  value: boolean | string;
}

export interface UpdateDocType {
  collection: string;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: any;
}

export interface DeleteDocType {
  collection: string;
  id: string;
}

export interface ReadDocsType {
  collection: string;
  queries: QueryType[];
  orderByField?: string | FieldPath;
  orderByDirection?: OrderByDirection;
  perPage?: number;
  pageNumber?: number;
}

export interface UserType {
  // id: number;
  // name: string;
  // mobileNumber: string;
  uid: string;
  id?: string;
  email: string;
  password?: string;
  emailVerified: boolean;
  // role: string;
  // statusCd: string;
  // statusMsg: string;
  authStatus?: string;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface Notice {
  noticeSummary: string;
  noticeDetails: string;
}

export interface Validate {
  emailState: string;
  passwordState: string;
}

export interface FlickrPhoto {
  id: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  isprimary: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
  category?: string;
}

export interface PreviewData {
  file: File;
  dataURL: string;
}

export interface SelectedPreviewData extends PreviewData {
  index: number;
}

export interface ArtWork {
  title: string;
  artist: string;
  categories: string[];
  description: string;
  price: number;
  image: string;
  dimensions: string;
  media: string;
  index?: number;
}

/*
        "id": "49504251076",
        "secret": "3f304925cc",
        "server": "65535",
        "farm": 66,
        "title": "Sitting in the park",
        "isprimary": "0",
        "ispublic": 1,
        "isfriend": 0,
        "isfamily": 0
*/
