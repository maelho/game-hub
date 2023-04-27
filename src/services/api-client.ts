import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  count: number;
  next?: string | null;
  results: T[];
}

const axiosIntance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "065a1653038042558b1708e972428a26",
  },
});

class APICLient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosIntance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = (id: number | string) => {
    return axiosIntance
      .get<T>(this.endpoint + '/' + id)
      .then((res) => res.data);
  };
}

export default APICLient;
