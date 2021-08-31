import { flow, Instance, types } from 'mobx-state-tree';
import { PatientsApi } from '../api/patients';
import { LoadingStatus } from './types';

export const Patient = types.model('Patient', {
  fullName: types.string,
  phones: types.string,
  patientID: types.number,
  birthDate: types.string,
});

export interface IPatient extends Instance<typeof Patient> {}

const PatientsStore = types
  .model('PatientsStore', {
    patients: types.array(Patient),
    loadingStatus: types.enumeration<LoadingStatus>(
      Object.values(LoadingStatus)
    ),
    errorMessage: types.optional(types.string, ''),
  })
  .actions((self) => {
    const getByName = flow(function* (name: string) {
      try {
        self.loadingStatus = LoadingStatus.LOADING;
        self.patients = yield PatientsApi.getByName(name);
        self.loadingStatus = LoadingStatus.SUCCESS;
      } catch (e) {
        self.errorMessage = e.response.data;
        self.loadingStatus = LoadingStatus.ERROR;
      }
    });

    const getByPhone = flow(function* (phone: string) {
      try {
        self.loadingStatus = LoadingStatus.LOADING;
        self.patients = yield PatientsApi.getByPhone(phone);
        self.loadingStatus = LoadingStatus.SUCCESS;
      } catch (e) {
        self.errorMessage = e.response.data;
        self.loadingStatus = LoadingStatus.ERROR;
      }
    });

    const getById = flow(function* (id: string) {
      try {
        self.loadingStatus = LoadingStatus.LOADING;
        self.patients = yield PatientsApi.getById(id);
        self.loadingStatus = LoadingStatus.SUCCESS;
      } catch (e) {
        self.errorMessage = e.response.data;
        self.loadingStatus = LoadingStatus.ERROR;
      }
    });

    return {
      getByName,
      getByPhone,
      getById,
    };
  });

export default PatientsStore;
