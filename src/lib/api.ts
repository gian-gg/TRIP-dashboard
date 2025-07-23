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
  data?: D
): Promise<T> {
  const response: AxiosResponse<T> = await Fetch.put<T>(url, data);
  return response.data;
}

async function DELETE<T = unknown, D = Record<string, unknown>>(
  url: string,
  data?: D
): Promise<T> {
  const response: AxiosResponse<T> = await Fetch.delete<T>(url, { data });
  return response.data;
}

type APIResponse<T> = {
  status: 'success' | 'error';
  data: T;
  message?: string;
};

type APICallOptions<T> = {
  type: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  body?: object;
  success: (data: T) => void;
  error: (error: Error) => void;
  consoleLabel?: string;
};

const APICall = async <T>(options: APICallOptions<T>) => {
  try {
    let res: APIResponse<T>;
    switch (options.type) {
      case 'GET':
        res = (await GET(options.url)) as APIResponse<T>;
        break;
      case 'POST':
        if (!options.body) {
          throw new Error('Body is required for POST requests');
        }
        res = (await POST(options.url, options.body)) as APIResponse<T>;
        break;
      case 'PUT':
        if (options.body) {
          res = (await PUT(options.url, options.body)) as APIResponse<T>;
        } else {
          res = (await PUT(options.url)) as APIResponse<T>;
        }
        break;
      case 'DELETE':
        if (options.body) {
          res = (await DELETE(options.url, options.body)) as APIResponse<T>;
        } else {
          res = (await DELETE(options.url)) as APIResponse<T>;
        }
        break;
      default:
        throw new Error(`Unsupported method: ${options.type}`);
    }

    if (options.consoleLabel) {
      console.log(options.consoleLabel, JSON.stringify(res, null, 2));
    }

    if (res.status === 'error') {
      throw new Error(res.message);
    }

    options.success(res.data);
  } catch (error) {
    options.error(error instanceof Error ? error : new Error('Unknown error'));
  }
};

export default APICall;
