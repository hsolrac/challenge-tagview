import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Toast } from '../util/Toast';
import { ReadableStreamDefaultReader } from 'stream/web';

const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'X-API-KEY': "tagview-desafio-2024"
  }
};

export const api: AxiosInstance = axios.create(axiosConfig);

//TODO: Remanejar requisições para um dominio proprio
//

const redirect = (route: string, params: string) => {
  const newRoute = window.location.origin + route + `?idProduto=${params}`;
  window.location.href = newRoute;
};

export const getProducts = async (page: number, perPage: number | null) => {
  try {
    const response = await api.get('/produtos', { params: { page, limit: perPage } });
    return { data: response.data, headers: response.headers } ;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (params: FormData) => {
  try {
    const response = await api.post('/produtos', params , {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    Toast('ok', 'Produto criado com sucesso!'); 

    redirect('/produtos/exibir', response.data.id);
    return response.data;
  } catch(error) {
    Toast('error', 'Erro ao criar produto!');
    throw new Error(error.response.data.error);
  }
};
