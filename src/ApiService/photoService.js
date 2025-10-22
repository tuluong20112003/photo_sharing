import * as baseService from "./baseService";

const url = "/photo";

export function getPhotosByUserId(id) {
  return baseService.get(url + `/user/${id}`);
}

export function uploadPhoto(payload) {
  return baseService.postFile(url + "/upload", payload);
}
