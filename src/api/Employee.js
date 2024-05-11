import { API_URLS } from "../constants/constants";
import { fetchWrapper } from "../helpers/fetch-wrapper";

export const City = {
  getData,

};
const get_data = API_URLS.getdata_api;


function getData() {
    return fetchWrapper.get(get_data);
  }