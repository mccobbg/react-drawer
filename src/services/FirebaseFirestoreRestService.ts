/* eslint-disable @typescript-eslint/no-explicit-any */
import firebase from '../config/FirebaseConfig';
import { ReadDocsType } from '../types';

const auth = firebase.auth;
const BASE_URL = import.meta.env.VITE_CLOUD_FIRESTORE_FUNCTION_API_URL;

const createDocument = async (collection: string, document: any) => {
  let token;

  try {
    token = await auth.currentUser?.getIdToken();
  } catch (error) {
    alert((error as Error).message);
    throw error;
  }

  try {
    const response = await fetch(`${BASE_URL}/${collection}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(document),
    });

    if (response.status !== 201) {
      const errorMessage = await response.text();
      const error = { message: errorMessage };
      throw error;
    }

    return response.json();
  } catch (error) {
    alert((error as Error).message);
    throw error;
  }
};

const readDocuments = async ({
  collection,
  queries,
  orderByField,
  orderByDirection,
  perPage,
  pageNumber,
}: ReadDocsType) => {
  try {
    const url = new URL(`${BASE_URL}/${collection}`);

    for (const query of queries) {
      url.searchParams.append(query.field, query.value.toString());
    }

    if (orderByField) {
      url.searchParams.append('orderByField', orderByField.toString());
    }

    if (orderByDirection) {
      url.searchParams.append('orderByDirection', orderByDirection);
    }

    if (perPage) {
      url.searchParams.append('perPage', perPage.toString());
    }

    if (pageNumber) {
      url.searchParams.append('pageNumber', pageNumber.toString());
    }

    let token;

    try {
      token = await auth.currentUser?.getIdToken();
    } catch (error) {
      // continue
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 201 && response.status !== 200) {
      const errorMessage = await response.text();
      const error = { message: errorMessage };
      throw error;
    }

    return response.json();
  } catch (error) {
    alert((error as Error).message);
    throw error;
  }
};

const uupdateDocument = async (
  collection: string,
  id: string,
  document: any,
) => {
  let token;

  try {
    token = await auth.currentUser?.getIdToken();
  } catch (error) {
    alert((error as Error).message);
    throw error;
  }

  try {
    const response = await fetch(`${BASE_URL}/${collection}/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(document),
    });

    if (response.status !== 200) {
      const errorMessage = await response.text();
      const error = { message: errorMessage };
      throw error;
    }

    return response.json();
  } catch (error) {
    alert((error as Error).message);
    throw error;
  }
};

const deleteDocument = async (collection: string, id: string) => {
  let token;

  try {
    token = await auth.currentUser?.getIdToken();
  } catch (error) {
    alert((error as Error).message);
    throw error;
  }

  try {
    const response = await fetch(`${BASE_URL}/${collection}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      const errorMessage = await response.text();
      const error = { message: errorMessage };
      throw error;
    }
  } catch (error) {
    alert((error as Error).message);
    throw error;
  }
};

const FirebaseFirestoreRestService = {
  createDocument,
  readDocuments,
  uupdateDocument,
  deleteDocument,
};

export default FirebaseFirestoreRestService;
