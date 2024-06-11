import { AppBar } from "@mui/material";
import { API_URLS } from "../constants/constants";
import { fetchWrapper } from "../helpers/fetch-wrapper";

export const Employee = {
  getData,
  getallpatientdetails,
  insert_patientdetails,
  ins_img_service,
  insert_patientdetails,
  getmedaticationdetails,
  get_patientdatabyid,
  insertmedicationdetails,
  update_patientcs,
  delete_patientdetailsbyid,
  getallstates

};
const get_data = API_URLS.getdata_api;
const getall_patients = API_URLS.getallpatients
const insimg_service = API_URLS.uploadfile
const postpatientdeials = API_URLS.insertpatientdetails
const get_madication = API_URLS.getmedicationdetails
const get_patient_databyid = API_URLS.getpatientdatabyid
const insert_medicationdetails = API_URLS.insertmedicationdetails
const delete_patient_details = API_URLS.deletePatientdetails
const getall_states = API_URLS.getAllStates



const update_patient_cs = API_URLS.updatepatientcs


function getData() {
  return fetchWrapper.get(get_data);
}
function getallpatientdetails() {
  return fetchWrapper.get(getall_patients)

}
function insert_patientdetails(item) {
  return fetchWrapper.post(postpatientdeials, item)
}
function ins_img_service(item) {
  return fetchWrapper.postformData(insimg_service, item);
}
function getmedaticationdetails() {
  return fetchWrapper.get(get_madication)
}

function update_patientcs(item) {
  return fetchWrapper.post(update_patient_cs, item)
}
function getallstates(item) {
  return fetchWrapper.post(getall_states, item)
}

function get_patientdatabyid(item) {
  return fetchWrapper.post(get_patient_databyid, item)
}
function insertmedicationdetails(item) {
  return fetchWrapper.post(insert_medicationdetails, item)
}
function delete_patientdetailsbyid(item) {
  // console.warn("++item", item)
  return fetchWrapper.post(delete_patient_details, item)
}
