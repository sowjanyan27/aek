import React, { Component } from 'react'
import { fs_folder } from "../config/config"
import LoginScreen from './LoginScreen'
import { Employee } from '../api/Employee'
import { Strings } from '../strings/Strings'
import { Button } from 'react-bootstrap';

export default class FIleUpload extends Component {
    constructor(props) {
        super(props)

        this.state = {
            patien_data: this.props.fileScreenpatientid,
            Mainpaitentdetails:[],
            dummyMainpaitentdetails:[],
            file_name: "",
            db_img_path: "",
            menu_ing_name: "",
        }
        this.handlemenuImgchange = this.handlemenuImgchange.bind(this);

    }
    componentDidMount() {
        this.getpatientdetailsbyid()
    }

    async getpatientdetailsbyid() {
        const obj={
            "patient_id":this.state.patien_data,
            "actionid":2
          }
        try {
            const response = await Employee.get_patientdatabyid(obj);
            if (response.length > 0) {
                this.setState({
                    Mainpaitentdetails: response, dummyMainpaitentdetails: response, isLoading: false
                },()=>{
                console.log(this.state.Mainpaitentdetails, 'Mainpaitentdetails-----')
                })
            }
        } catch (e) {
            console.log(e);
        } finally {
            this.setState({
                isLoading: false,
            });
        }
    }
    

    backToScreen = () => {
        this.props.closescreen()
    }

    handlemenuImgchange = (event) => {
        event.preventDefault();
        this.setState({
            db_img_path: ""
        });

        const file = event.target.files[0];

        this.setState(
            {
                menu_ing_name: file.name,
            },
            () => {
                let formData = new FormData();
                formData.append("uploads", file, file.name);
                this.insert_image(formData);
            }
        );
    };

    async insert_image(file_path) {
        try {
            const response = await Employee.ins_img_service(file_path);

            if (response !== "") {
                this.setState({
                    db_img_path: response,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { Mainpaitentdetails } = this.state
        // console.log(Mainpaitentdetails, 'renderpatientdata')
        const pdfUrl = `${fs_folder}${Mainpaitentdetails.attachment_name}`;;
        // console.log(pdfUrl, 'pdfurl')
        return (
            <div className="row">
                <div style={{ display: 'flex', justifyContent: "flex-end", alignItems: 'flex-end' }}>
                    {/* <i onClick={() => { this.backToScreen() }} class=" fa-arrow-left"
                        style={{ color: "red", fontSize: 20, paddingLeft: 10, backgroundColor: "white", paddingRight: 10, fontWeight: 700, borderStyle: "solid", borderWidth: 1, borderColor: "lightgray", borderRadius: 5 }}></i> */}
                    <button className="mb-3" onClick={() => { this.backToScreen() }}
                        style={{ color: "black", paddingLeft: 10, paddingRight: 10, fontWeight: 900, borderStyle: "solid", borderWidth: 1, borderColor: "lightgray", borderRadius: 5, fontSize: 16, backgroundColor: 'darkgrey' }}> ←</button>
                </div>
                <div className="col-md-4">
                    <div class="card" style={{ borderRadius: 15 }}>
                        <div class="card-body" >
                            <h5 class="card-title">Patient Details</h5>
                            <div className="row" >
                                <div className="col-6">
                                    <div>Patient ID</div>
                                </div>
                                <div className="col-6">
                                    <div style={{ fontWeight: 600 }}>: { Mainpaitentdetails.patient_details_id}</div>
                                </div>

                                <div className="col-6">
                                    <div>Patient Name</div>
                                </div>
                                <div className="col-6">
                                    <div style={{ fontWeight: 600 }}>: { Mainpaitentdetails.patient_first_name} { Mainpaitentdetails.patient_last_name}</div>
                                </div>

                                <div className="col-6">
                                    <div>Patient Age</div>
                                </div>
                                <div className="col-6">
                                    <div style={{ fontWeight: 600 }}>: { Mainpaitentdetails.patient_age}</div>
                                </div>

                                <div className="col-6">
                                    <div>Patient Email</div>
                                </div>
                                <div className="col-6">
                                    <div style={{ fontWeight: 600 }}>: { Mainpaitentdetails.patient_first_name}</div>
                                </div>

                                <div className="col-6">
                                    <div>Patient Contact</div>
                                </div>
                                <div className="col-6">
                                    <div style={{ fontWeight: 600 }}>: { Mainpaitentdetails.patient_mobile_no}</div>
                                </div>

                                <div className="col-6">
                                    <div>Patient Address</div>
                                </div>
                                <div className="col-6">
                                    <div style={{ fontWeight: 600 }}>: { Mainpaitentdetails.patient_address}</div>
                                </div>

                                <div className="col-6">
                                    <div>Patient attachment</div>
                                </div>
                                <div className="col-6">
                                    <div style={{ fontWeight: 600 }}>: { Mainpaitentdetails.attachment_name}</div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    { Mainpaitentdetails.attachment_name &&
                        (
                            <div className="card" style={{ borderRadius: 15 }}>
                                <div className="card-body">
                                    <div>
                                        <h5 className="card-title">Patient Case Sheet</h5>
                                        <embed
                                            src={pdfUrl}
                                            className="w-100 pdf-height"
                                            type="application/pdf"
                                            name='X-Frame-Options'
                                            value='sameorigin'
                                        // style={{ height: '500px' }} // Set an appropriate height for the PDF viewer
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    {! Mainpaitentdetails.attachment_name &&
                        (
                            <div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 margin_bottom_20">
                                    <div className="form-group text_align_left">
                                        <input
                                            type="file"
                                            className="form-control font_family_serif input_hight_38"
                                            id="fileInput"
                                            style={{ width: "250px"}}
                                            name="objection_letter"
                                            // onChange={this.handlemenuImgchange}
                                            onClick={(event) => {
                                                event.target.value = null;
                                            }}
                                            ref={this.myRef2}
                                        />
                                    </div>
                                </div>
                                <Button onClick={() => this.loginclick()} className="btn btn-success padding_horizental_35 font_family_serif">{Strings.save}</Button>
                            </div>
                        )}
                </div>
            </div>
        )
    }
}
