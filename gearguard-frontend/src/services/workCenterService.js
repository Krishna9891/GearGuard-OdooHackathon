import api from './api';

export const getWorkCenters = async () => {
    return await api.get('/work-centers');
};

export const createWorkCenter = async (data) => {
    return await api.post('/work-centers', data);
};

export const getWorkCenterById = async (id) => {
    return await api.get(`/work-centers/${id}`);
};

export const updateWorkCenter = async (id, data) => {
    return await api.put(`/work-centers/${id}`, data);
};

export const deleteWorkCenter = async (id) => {
    return await api.delete(`/work-centers/${id}`);
};
