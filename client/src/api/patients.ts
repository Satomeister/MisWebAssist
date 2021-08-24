import axios from '../core/axios';

import { IPatient } from '../store/patients';

const baseUrl = '/mis/patients';

export const PatientsApi = {
  getAll: async () => {
    return await axios.get<IPatient[]>(baseUrl + '/');
  },
  getByName: async (name: string) => {
    return axios.get<IPatient[]>(baseUrl + `?name=${name}`);
    // const pr = new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve([
    //       {
    //         key: '1',
    //         uuid: 'wef',
    //         fullName: 'types.string',
    //         phone: 23,
    //         patientID: 324,
    //       },
    //     ]);
    //   }, 3000);
    // });
    // return await pr;
  },
  getByPhone: async (phone: string) => {
    return await axios.get<IPatient[]>(baseUrl + `?phone=${phone}`);
  },
  getById: async (id: string) => {
    return await axios.get<IPatient[]>(baseUrl + `?patient-id=${id}`);
  },
};
