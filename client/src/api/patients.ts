import axios from "axios";
import {baseurl} from "./baseurl";

export const PatientsApi = {
  getAll: async () => {
    return await axios.get(baseurl + '/');
  },

  getByName: async (name: string) => {
    const { data } = await axios.get(baseurl + `?name=${name}`);
    return data;
  },

  getByPhone: async (phone: string) => {
    const { data } = await axios.get(baseurl + `?phone=${phone}`);
    return data;
  },

  getById: async (id: string) => {
    const { data } = await axios.get(baseurl + `?patient-id=${id}`);
    return data;
  },
};
