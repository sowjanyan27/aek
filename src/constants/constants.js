import { dev_url } from "../config/config"
export const API_URLS = {
    getdata_api: `${dev_url}/getdata`,  //api end point  for aceesing data
    getallstates: `${dev_url}/eakapi/getallpatientdetails`,
    insertpatientdetails: `${dev_url}/eakapi/addpatientdetails/`,
    getmedicationdetails: `${dev_url}/eakapi/getmedicationdetails/`,
    getpatientdatabyid: `${dev_url}/eakapi/getpatientdatabyid/`,
    insertmedicationdetails: `${dev_url}/eakapi/inspatientmedicaldetails/`

}