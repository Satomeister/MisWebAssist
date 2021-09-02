import axios from "axios";

const baseurl = '/patients'

export const DocumentsApi = {
  getDocuments: async (patientID: string) => {
    const { data } = await axios.get(
      baseurl + `/${patientID}/documents`
    );

    return data;
  },

  getById: async (patientID: string, documentID: string) => {
    const { data } = await axios.get(
      baseurl + `/${patientID}/documents/${documentID}`
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

    const {data} = await axios.post(baseurl + `/${patientID}/documents/`, formData, {
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
      baseurl + `/${patientID}/documents/${documentID}`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
  },

  delete: async (patientID: string, documentID: string) => {
    await axios.delete(baseurl + `/${patientID}/documents/${documentID}`);
  },
};
