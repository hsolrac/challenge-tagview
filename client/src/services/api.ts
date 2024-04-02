import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Toast } from '../util/Toast';

const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
};

export const api: AxiosInstance = axios.create(axiosConfig);

//TODO: Remanejar requisições para um dominio proprio

export const getProducts = async () => {
  try {
    const response = await api.get('/produtos');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (params: any) => {
  try {
    const response = await api.post('/produtos', { produto: params });
    Toast('ok', 'Produto criado com sucesso!'); 
    return response.data;
  } catch(error) {
    Toast('error', 'Erro ao criar produto!');
    throw new Error(error.response.data.error);
  }
};
