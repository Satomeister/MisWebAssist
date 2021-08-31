import { types } from 'mobx-state-tree';

import PatientsStore from './patients';
import DocumentsStore from './documents';
import { LoadingStatus } from './types';

const RootStore = types.model('RootStore', {
  patientsStore: types.optional(PatientsStore, {
    loadingStatus: LoadingStatus.NEVER,
  }),
  documentsStore: types.optional(DocumentsStore, {
    loadingStatus: LoadingStatus.NEVER,
    editDocumentLoadingStatus: LoadingStatus.NEVER,
    createDocumentLoadingStatus: LoadingStatus.NEVER,
    deleteDocumentLoadingStatus: LoadingStatus.NEVER,
  }),
});

export default RootStore;
