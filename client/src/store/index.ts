import { types } from 'mobx-state-tree';

import PatientsStore from './patients';
import { LoadingStatus } from './store';

const RootStore = types.model('RootStore', {
  patientsStore: types.optional(PatientsStore, {
    loadingStatus: LoadingStatus.NEVER,
  }),
});

export default RootStore;
