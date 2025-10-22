import * as baseService from "./baseService";

const url = "/auth"

export function login(payload){
  return baseService.post(url + "/login", payload);
}

export function register(payload){
  return baseService.post(url + "/register", payload);
}