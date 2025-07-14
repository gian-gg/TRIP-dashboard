import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

const API_URL = import.meta.env.VITE_API_URL as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;

const HEADERS: Record<string, string> = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: API_KEY,
};

const Fetch: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: HEADERS,
});

async function POST<T = unknown, D = Record<string, unknown>>(
  url: string,
  data: D
): Promise<T> {
  const response: AxiosResponse<T> = await Fetch.post<T>(url, data);
  return response.data;
}

async function GET<T = unknown, P = Record<string, unknown>>(
  url: string,
  params?: P
): Promise<T> {
  const config: AxiosRequestConfig = { params };
  const response: AxiosResponse<T> = await Fetch.get<T>(url, config);
  return response.data;
}

async function PUT<T = unknown, D = Record<string, unknown>>(
  url: string,
  data: D
): Promise<T> {
  const response: AxiosResponse<T> = await Fetch.put<T>(url, data);
  return response.data;
}

export { Fetch, POST, GET, PUT };
