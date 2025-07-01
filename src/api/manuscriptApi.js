import axios from 'axios';

const API = axios.create({
  baseURL: '/manuscripts'
});

export const registerManuscript = (data) => API.post('/', data);

export const getAllManuscripts = () => API.get('/');

export const updateManuscript = (id, data) => API.put(`/${id}`, data);

export const getManuscriptById = (id) => API.get(`/${id}`);

export const requestPublish = (id, data) =>
  API.post(`/${id}/request-publish`, data);

export const deleteManuscript = (id) => API.delete(`/${id}`);
