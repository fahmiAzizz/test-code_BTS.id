import axios from 'axios';
const token = localStorage.getItem("token");
const API = axios.create({
    baseURL: 'http://94.74.86.174:8080/api',
        headers: {
        Authorization: `Bearer ${token}`,
    },
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (data) => API.post('/login', data);
export const register = (data) => API.post('/register', data);

export const getChecklists = () => API.get('/checklist');
export const createChecklist = (data) => API.post('/checklist', data);
export const deleteChecklist = (id) => API.delete(`/checklist/${id}`);

export const getItems = (checklistId) => API.get(`/checklist/${checklistId}/item`);
export const getItem = (checklistId, itemId) =>
    API.get(`/checklist/${checklistId}/item/${itemId}`);
export const createItem = (checklistId, data) =>
    API.post(`/checklist/${checklistId}/item`, data);
export const updateItemStatus = (checklistId, itemId) =>
    API.put(`/checklist/${checklistId}/item/${itemId}`);
export const deleteItem = (checklistId, itemId) =>
    API.delete(`/checklist/${checklistId}/item/${itemId}`);
export const renameItem = (checklistId, itemId, data) =>
    API.put(`/checklist/${checklistId}/item/rename/${itemId}`, data);
