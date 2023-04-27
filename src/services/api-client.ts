import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  count: number;
  next?: string | null;
  results: T[];
}

const axiosIntance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "***REMOVED***",
  },
});

class APICLient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getAll(config: AxiosRequestConfig) {
    const res = await axiosIntance.get<FetchResponse<T>>(this.endpoint, config);
    return res.data;
  }
}

export default APICLient;
