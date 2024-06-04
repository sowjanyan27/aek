import { AppBar } from "@mui/material";
import { API_URLS } from "../constants/constants";
import { fetchWrapper } from "../helpers/fetch-wrapper";

export const Employee = {
  getData,
  getallpatientdetails,
  insert_patientdetails,
  ins_img_service
};
const get_data = API_URLS.getdata_api;
const getall_patients=API_URLS.getallpatients
const  postpatientdeials=API_URLS.insertpatientdetails
const insimg_service = API_URLS.uploadfile


function getData() {
    return fetchWrapper.get(get_data);
  }
  function getallpatientdetails(){
    return fetchWrapper.get(getall_patients)
  
  }
  function insert_patientdetails(item){
    return fetchWrapper.post(postpatientdeials,item)
  }
  function ins_img_service(item) {
    return fetchWrapper.postformData(insimg_service, item);
  }