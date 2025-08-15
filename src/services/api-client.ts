import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  count: number;
  next?: string | null;
  results: T[];
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.rawg.io/api";
const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
  // eslint-disable-next-line no-console
  console.error("VITE_API_KEY is not defined in environment variables");
  throw new Error("API key is required but not found in environment variables");
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  params: {
    key: API_KEY,
  },
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || "10000"),
  headers: {
    "Content-Type": "application/json",
  },
});

if (import.meta.env.VITE_DEBUG === "true") {
  axiosInstance.interceptors.request.use(
    (config) => {
      // eslint-disable-next-line no-console
      console.log("API Request:", {
        url: config.url,
        method: config.method,
        params: config.params,
      });
      return config;
    },
    (error) => {
      // eslint-disable-next-line no-console
      console.error("API Request Error:", error);
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      // eslint-disable-next-line no-console
      console.log("API Response:", {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
      return response;
    },
    (error) => {
      // eslint-disable-next-line no-console
      console.error("API Response Error:", error);
      return Promise.reject(error);
    },
  );
}

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = (id: number | string) => {
    return axiosInstance
      .get<T>(`${this.endpoint}/${id}`)
      .then((res) => res.data);
  };

  post = (data: Partial<T>, config?: AxiosRequestConfig) => {
    return axiosInstance
      .post<T>(this.endpoint, data, config)
      .then((res) => res.data);
  };

  put = (
    id: number | string,
    data: Partial<T>,
    config?: AxiosRequestConfig,
  ) => {
    return axiosInstance
      .put<T>(`${this.endpoint}/${id}`, data, config)
      .then((res) => res.data);
  };

  delete = (id: number | string) => {
    return axiosInstance
      .delete(`${this.endpoint}/${id}`)
      .then((res) => res.data);
  };
}

export default APIClient;
