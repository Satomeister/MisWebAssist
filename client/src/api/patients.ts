import axios from "axios";

const baseUrl = '/patients';

export const PatientsApi = {
  getAll: async () => {
    return await axios.get(baseUrl + '/');
  },

  getByName: async (name: string) => {
    const { data } = await axios.get(baseUrl + `?name=${name}`);
    return data;
  },

  getByPhone: async (phone: string) => {
    const { data } = await axios.get(baseUrl + `?phone=${phone}`);
    return data;
  },

  getById: async (id: string) => {
    const { data } = await axios.get(baseUrl + `?patient-id=${id}`);
    return data;
  },
};
