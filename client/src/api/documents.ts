// 192.168.88.12:80/mis_test2/hs/web_api/
// http://192.168.88.12/mis_test2/hs/web/
// "proxy": "http://192.168.88.12:80/mis_test2/hs/web",
import axios from "axios";

const baseUrl = '/patients';

export const DocumentsApi = {
  getDocuments: async (patientID: string) => {
    const { data } = await axios.get(
      baseUrl + `/${patientID}/documents`
    );

    return data;
  },

  getById: async (patientID: string, documentID: string) => {
    const { data } = await axios.get(
      baseUrl + `/${patientID}/documents/${documentID}`
    );
    return data;
  },

  create: async (
    patientID: string,
    image: File,
    date: string,
    desc: string
  ) => {
    const formData = new FormData();

    formData.append('file', image);
    formData.append('date', date);
    formData.append('description', desc);

    const {data} = await axios.post(baseUrl + `/${patientID}/documents/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data
  },

  edit: async (
    patientID: string,
    documentID: string,
    date: string,
    desc: string
  ) => {
    const formData = new FormData();
    formData.append('date', date);
    formData.append('description', desc);
    await axios.put(
      baseUrl + `/${patientID}/documents/${documentID}`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
  },

  delete: async (patientID: string, documentID: string) => {
    await axios.delete(baseUrl + `/${patientID}/documents/${documentID}`);
  },
};
