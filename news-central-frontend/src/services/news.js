// src/services/news.js
import api from './api';

export const fetchNews = async (params) => {
  try {
    const response = await api.get('/news', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHistory = async () => {
  try {
    const response = await api.get('/history');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const clearHistory = async () => {
  try {
    const response = await api.delete('/history');
    return response.data;
  } catch (error) {
    throw error;
  }
};