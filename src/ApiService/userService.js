import * as baseService from "./baseService";

const url = "/user"

export function register(payload){
  return baseService.post(url + "/register", payload);
}

export function getUsers(){
  return baseService.get(url);
}

export function getUserById(id){
  return baseService.get(`${url}/${id}`);
}