import { AppBar } from "@mui/material";
import { API_URLS } from "../constants/constants";
import { fetchWrapper } from "../helpers/fetch-wrapper";

export const Employee = {
  getData,
  getallstates,
  insert_patientdetails

};
const get_data = API_URLS.getdata_api;
const getall_states=API_URLS.getallstates
const  postpatientdeials=API_URLS.insertpatientdetails


function getData() {
    return fetchWrapper.get(get_data);
  }
  function getallstates(){
    return fetchWrapper.get(getall_states)
  
  }
  function insert_patientdetails(item){
    return fetchWrapper.post(postpatientdeials, item)
  }