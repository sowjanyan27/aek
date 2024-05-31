import { AppBar } from "@mui/material";
import { API_URLS } from "../constants/constants";
import { fetchWrapper } from "../helpers/fetch-wrapper";

export const Employee = {
  getData,
  getallstates,
  insert_patientdetails,
  getmedaticationdetails,
  get_patientdatabyid,

};
const get_data = API_URLS.getdata_api;
const getall_states=API_URLS.getallstates
const  postpatientdeials=API_URLS.insertpatientdetails
const get_madication=API_URLS.getmedicationdetails
const get_patient_databyid=API_URLS.getpatientdatabyid


function getData() {
    return fetchWrapper.get(get_data);
  }
  function getallstates(){
    return fetchWrapper.get(getall_states)
  
  }
  function insert_patientdetails(){
    return fetchWrapper.post(postpatientdeials)
  }
  function getmedaticationdetails(){
    return fetchWrapper.get(get_madication)
  
  }
  function get_patientdatabyid(item){
    return fetchWrapper.post(get_patient_databyid,item)
  }