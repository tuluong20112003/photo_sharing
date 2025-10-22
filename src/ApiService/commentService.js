import * as baseService from "./baseService";

const url = "/comment"

export function addComment(payload){
  return baseService.post(url + `/photo/${payload.photoId}`, payload);
}