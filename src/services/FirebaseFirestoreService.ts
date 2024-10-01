import firebase from '../config/FirebaseConfig';
import {
  doc,
  getDoc,
  collection as firestoreCollection,
  query,
  // where,
  // orderBy,
  // limit,
  // startAfter,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  WithFieldValue,
  DocumentData,
} from 'firebase/firestore/lite';
import { DeleteDocType, DocumentQueryType, UpdateDocType } from '../types';

const firestore = firebase.firestore;

const createDocument = (
  collection: string,
  uid: string,
  document: WithFieldValue<DocumentData>,
) => {
  return setDoc(doc(firestoreCollection(firestore, collection), uid), document);
};

const readDocument = (collection: string, id: string) => {
  return getDoc(doc(firestoreCollection(firestore, collection), id));
};

const readDocuments = async ({
  collection, // queries = [],
  // orderByField,
} // orderByDirection,
// perPage,
// cursorId,
: DocumentQueryType) => {
  const collectionRef = firestoreCollection(firestore, collection);
  //const queryConstraints = [];

  // if (queries && queries.length > 0) {
  //   for (const query of queries) {
  //     queryConstraints.push(where(query.field, query.condition, query.value));
  //   }
  // }

  // // order by's go next
  // if (!!orderByField && !!orderByDirection) {
  //   queryConstraints.push(orderBy(orderByField, orderByDirection));
  // }

  // if (perPage) {
  //   queryConstraints.push(limit(perPage));
  // }

  // if (cursorId) {
  //   try {
  //     const document = await readDocument(collection, cursorId);
  //     queryConstraints.push(startAfter(document));
  //   } catch (error) {
  //     console.error((error as Error).message);
  //     throw error;
  //   }
  // }

  const firestoreQuery = query(collectionRef); // , ...queryConstraints);
  return getDocs(firestoreQuery);
};

const updateDocument = ({ collection, id, document }: UpdateDocType) => {
  return updateDoc(
    doc(firestoreCollection(firestore, collection), id),
    document,
  );
};

const deleteDocument = ({ collection, id }: DeleteDocType) => {
  return deleteDoc(doc(firestoreCollection(firestore, collection), id));
};

const FirebaseFirestoreService = {
  createDocument,
  readDocument,
  updateDocument,
  deleteDocument,
  readDocuments,
};

export default FirebaseFirestoreService;
