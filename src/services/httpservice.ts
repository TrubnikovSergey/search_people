import axios from "axios";

const instance = axios.create();

export const httpService = {
  get: instance.get,
};
