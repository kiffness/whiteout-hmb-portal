import axios, { AxiosError, AxiosResponse } from "axios";
import { PlayerStats, PlayerStatsDto } from "../models/PlayerStatsModel";
import { AuthenticationModel } from "../models/AuthenticationModel";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));
const apiKey = localStorage.getItem("hmb-api-key");

const apiUrl = import.meta.env.VITE_API_URL;
axios.defaults.baseURL = apiUrl;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(
  (config) => {
    console.log(config.url);
    console.log(apiKey);
    if (!config.url?.includes("/authentication")) {
      config.headers["hmb-api-key"] = apiKey;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async (response) => {
    await sleep();
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;

    console.error(data, status);
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string, params?: URLSearchParams) => {
    axios.get(url, { params }).then(responseBody);
  },
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const PlayerStatsApi = {
  list: () => requests.get("/playerstats"),
  get: (id: string) => requests.get(`/playerstats?id=${id}`),
  create: (values: PlayerStatsDto) => requests.post(`/playerStats`, values),
  updateStat: (id: string, values: PlayerStats) =>
    requests.put(`/playerstats?id=${id}`, values),
  delete: (id: string) => requests.delete(`/playerstats?id=${id}`),
};

const AuthenticationApi = {
  login: (values: AuthenticationModel) =>
    requests.post(`/authentication/login`, values),
  register: (values: AuthenticationModel) =>
    requests.post(`/authentication/register`, values),
};

const agent = {
  PlayerStatsApi,
  AuthenticationApi,
};

export default agent;
