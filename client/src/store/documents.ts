import { flow, Instance, types } from 'mobx-state-tree';

import { Patient } from './patients';
import { LoadingStatus } from './types';
import { PatientsApi } from '../api/patients';
import { DocumentsApi } from '../api/documents';

const Document = types.model('Document', {
  uuid: types.string,
  date: types.string,
  description: types.string,
  url: types.string,
});

export interface IDocument extends Instance<typeof Document> {}

const DocumentsStore = types
  .model('DocumentsStore', {
    patient: types.maybeNull(Patient),
    documents: types.array(Document),
    chosen: types.maybeNull(Document),
    loadingStatus: types.enumeration<LoadingStatus>(
      Object.values(LoadingStatus)
    ),
    editDocumentLoadingStatus: types.enumeration<LoadingStatus>(
      Object.values(LoadingStatus)
    ),
    createDocumentLoadingStatus: types.enumeration<LoadingStatus>(
      Object.values(LoadingStatus)
    ),
    deleteDocumentLoadingStatus: types.enumeration<LoadingStatus>(
      Object.values(LoadingStatus)
    ),
  })
  .actions((self) => {
    const setCreateDocumentLoadingStatus = (loadingStatus: LoadingStatus) => {
      self.createDocumentLoadingStatus = loadingStatus;
    };

    const setEditDocumentLoadingStatus = (loadingStatus: LoadingStatus) => {
      self.editDocumentLoadingStatus = loadingStatus;
    };

    const setDeleteDocumentLoadingStatus = (loadingStatus: LoadingStatus) => {
      self.deleteDocumentLoadingStatus = loadingStatus;
    };

    const getPatient = flow(function* (patientID: string) {
      try {
        self.loadingStatus = LoadingStatus.LOADING;
        const data = yield Promise.all([
          PatientsApi.getById(patientID),
          DocumentsApi.getDocuments(patientID),
        ]);
        self.patient = data[0][0];
        self.documents = data[1];
        self.loadingStatus = LoadingStatus.SUCCESS;
      } catch (e) {
        self.loadingStatus = LoadingStatus.ERROR;
      }
    });

    const getDocumentById = flow(function* (patientID: string, documentID) {
      try {
        self.loadingStatus = LoadingStatus.LOADING;
        const data = yield Promise.all([
          PatientsApi.getById(patientID),
          DocumentsApi.getById(patientID, documentID),
        ]);
        self.patient = data[0][0];
        self.chosen = data[1];
        self.loadingStatus = LoadingStatus.SUCCESS;
      } catch (e) {
        self.loadingStatus = LoadingStatus.ERROR;
      }
    });

    const setChosenDocument = (document: IDocument) => {
      self.chosen = { ...document };
    };

    const createDocument = flow(function* (
      patientID: string,
      file: File,
      date: string = '',
      desc: string = ''
    ) {
      try {
        self.createDocumentLoadingStatus = LoadingStatus.LOADING;
        const data = yield DocumentsApi.create(patientID, file, date, desc);
        self.documents.push(data);
        self.createDocumentLoadingStatus = LoadingStatus.SUCCESS;
      } catch (e) {
        self.createDocumentLoadingStatus = LoadingStatus.ERROR;
      }
    });

    const editDocument = flow(function* (
      patientID: string,
      documentID: string,
      date: string,
      desc: string
    ) {
      try {
        self.editDocumentLoadingStatus = LoadingStatus.LOADING;
        yield DocumentsApi.edit(patientID, documentID, date, desc);

        const docIndex = self.documents.findIndex(
          (doc) => {
           return doc.uuid === documentID;
          }
        );
        self.documents[docIndex] = {
          url: self.documents[docIndex].url,
          uuid: self.documents[docIndex].uuid,
          date: date,
          description: desc,
        };
        self.editDocumentLoadingStatus = LoadingStatus.SUCCESS;
      } catch (e) {
        self.editDocumentLoadingStatus = LoadingStatus.ERROR;
      }
    });

    const deleteDocument = flow(function* (
      patientID: string,
      documentID: string
    ) {
      try {
        self.deleteDocumentLoadingStatus = LoadingStatus.LOADING;
        yield DocumentsApi.delete(patientID, documentID);

        const docIndex = self.documents.findIndex(
          (doc) => doc.uuid === documentID
        );

        self.documents.splice(docIndex, 1);

        self.deleteDocumentLoadingStatus = LoadingStatus.SUCCESS;
      } catch (e) {
        self.deleteDocumentLoadingStatus = LoadingStatus.ERROR;
      }
    });

    return {
      getPatient,
      getDocumentById,
      setChosenDocument,
      createDocument,
      editDocument,
      deleteDocument,
      setCreateDocumentLoadingStatus,
      setEditDocumentLoadingStatus,
      setDeleteDocumentLoadingStatus,
    };
  });

export default DocumentsStore;
