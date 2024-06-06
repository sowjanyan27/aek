import React, { Component } from 'react'
import { fs_folder } from "../config/config"
import LoginScreen from './LoginScreen'
import { Employee } from '../api/Employee'
import { Strings } from '../strings/Strings'
import { Button } from 'react-bootstrap';
import { ValidationMessage } from "../helpers/ValidationMessage";
import { toast } from "react-toastify";

export default class FIleUpload extends Component {
    constructor(props) {
        super(props)

        this.state = {
            patien_data: this.props.fileScreenData,
            Mainpaitentdetails: [],
            dummyMainpaitentdetails: [],
            file_name: "",
            db_img_path: "",
            menu_ing_name: "",
            file_exist: false,
            image_name: "",
        }
        this.handlemenuImgchange = this.handlemenuImgchange.bind(this);

    }

    componentDidMount() {
        this.setState({}, () => {
            this.getpatientdetailsbyid()
        })
    }

    async getpatientdetailsbyid() {
        console.log(this.state.patien_data, 'patient id data--')
        const obj = {
            "patient_id": this.state.patien_data,
            "actionid": 2
        }
        try {
            const response = await Employee.get_patientdatabyid(obj);
            if (response.length > 0) {
                this.setState({
                    Mainpaitentdetails: response[0], dummyMainpaitentdetails: response, isLoading: false
                }, () => {
                    console.log(this.state.Mainpaitentdetails, 'Mainpaitentdetails-----')
                    this.setState({ file_exist: this.state.Mainpaitentdetails.attachment_name !== null ? true : false })
                    console.log(this.state.Mainpaitentdetails.attachment_name, 'file name -----')
                })
            }
        } catch (e) {
            console.log(e);
        } finally {
            this.setState({
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
        const sanitizedFileName = file.name.replace(/\s+/g, '_');


        this.setState(
            {
                menu_ing_name: sanitizedFileName,
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
            this.setState({ image_name: response })
            console.log(this.state.image_name, '----uploaded image name here----')

            if (response !== "") {
                this.setState({
                    db_img_path: response,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }


    handlesaveattachment() {
        const fileName = this.state.db_img_path.replace(/\s+/g, '_');
        const obj = {
            patient_id: this.state.patien_data,
            attachmentname: fileName
        }
        this.updatecashesheet(obj)
    }

    async updatecashesheet(item) {
        try {
            const response = await Employee.update_patientcs(item);
            console.log(response);
            toast.success(ValidationMessage.p_cs_update, {
                toastId: "add_success",
            });
            this.getpatientdetailsbyid();
            return;
        }
        catch (e) {
            console.log(e)
            toast.error(ValidationMessage.p_failed, {
                toastId: "addFail",
            });
        }
        finally {

        }
    }

    render() {
        const { Mainpaitentdetails } = this.state
        const pdfUrl = `${fs_folder}${Mainpaitentdetails.attachment_name}`;;
        return (
            <div className="row">
                <div style={{ display: 'flex', justifyContent: "flex-end", alignItems: 'flex-end' }}>
                    {/* <i onClick={() => { this.backToScreen() }} class=" fa-arrow-left"
                        style={{ color: "red", fontSize: 20, paddingLeft: 10, backgroundColor: "white", paddingRight: 10, fontWeight: 700, borderStyle: "solid", borderWidth: 1, borderColor: "lightgray", borderRadius: 5 }}></i> */}
                    {/* <button className="mb-3" onClick={() => { this.backToScreen() }}
                        style={{ color: "black", paddingLeft: 10, paddingRight: 10, fontWeight: 900, borderStyle: "solid", borderWidth: 1, borderColor: "lightgray", borderRadius: 5, fontSize: 16, backgroundColor: 'darkgrey' }}> ←</button> */}
                    <span onClick={() => { { this.backToScreen() } }}>
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </span>
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
                                    <div style={{ fontWeight: 600 }}>: {Mainpaitentdetails.patient_details_id}</div>
                                </div>

                                <div className="col-6">
                                    <div>Patient Name</div>
                                </div>
                                <div className="col-6">
                                    <div style={{ fontWeight: 600 }}>: {Mainpaitentdetails.patient_first_name} {Mainpaitentdetails.patient_last_name}</div>
                                </div>

                                <div className="col-6">
                                    <div>Patient Age</div>
                                </div>
                                <div className="col-6">
                                    <div style={{ fontWeight: 600 }}>: {Mainpaitentdetails.patient_age}</div>
                                </div>

                                <div className="col-6">
                                    <div>Patient Email</div>
                                </div>
                                <div className="col-6">
                                    <div style={{ fontWeight: 600 }}>: {Mainpaitentdetails.patient_first_name}</div>
                                </div>

                                <div className="col-6">
                                    <div>Patient Contact</div>
                                </div>
                                <div className="col-6">
                                    <div style={{ fontWeight: 600 }}>: {Mainpaitentdetails.patient_mobile_no}</div>
                                </div>

                                <div className="col-6">
                                    <div>Patient Address</div>
                                </div>
                                <div className="col-6">
                                    <div style={{ fontWeight: 600 }}>: {Mainpaitentdetails.patient_address}</div>
                                </div>

                                <div className="col-6">
                                    <div>Patient attachment</div>
                                </div>
                                <div className="col-6">
                                    <div style={{ fontWeight: 600 }}>: {Mainpaitentdetails.attachment_name}</div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    {this.state.file_exist &&
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

                    {!this.state.file_exist &&
                        (
                            <div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 marginTop_20 margin_bottom_25">
                                    <div className="form-group text_align_left">
                                        <label htmlFor="fileInput" className="font_family_serif">
                                            {Strings.upload_file}
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control font_family_serif input_hight_38"
                                            id="fileInput"
                                            name="objection_letter"
                                            onChange={this.handlemenuImgchange}
                                            onClick={(event) => {
                                                event.target.value = null;
                                            }}
                                            ref={this.myRef2}
                                        />
                                    </div>
                                    <div>
                                        <div className="uploadFileName">
                                            {this.state.menu_ing_name && (
                                                <a href={this.state.db_img_path} target="_blank" rel="noreferrer">
                                                    <span>{this.state.menu_ing_name}</span>
                                                </a>
                                            )}
                                        </div>
                                        {this.state.showImage && (
                                            <div className="imageContainer">
                                                <img src={this.state.db_img_path} alt="Uploaded" />
                                            </div>
                                        )}
                                    </div>

                                </div>
                                <Button onClick={() => this.handlesaveattachment()} className="btn btn-success padding_horizental_35 font_family_serif">{Strings.save}</Button>
                            </div>
                        )}
                </div>
            </div>
        )
    }
}
