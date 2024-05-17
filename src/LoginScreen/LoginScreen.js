import React, { Component } from "react";
import { Strings } from "../strings.js/Strings";
import { Button, Badge, Container } from 'react-bootstrap';
import withRouter from "../helpers/Routers";
import { ValidationMessage } from "../helpers/ValidationMessage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"




 class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patientid: "",
            patientnum: "",
            firstName: "",
            lastName: "",
            age: "",
            gender: "",
            dateofBirth: "",
            birthofPlace: "",
            timeofBirth: "",
            address: "",
            nearestBirthPlace: "",
            mobile: "",
            state: "",
            district: "",
            dropDownVal: "",
            gender: "",
            dropDown_menu: [
                { itemName: "Options 1", value: 1 },
                { itemName: "Options 2", value: 2 },
                { itemName: "Options 3", value: 3 },
                { itemName: "Options 4", value: 4 },
            ]
        }
    }
    handleSelectedData = (text, field) => {
        var value = text.target.value
        if (field === Strings.patient_id) {
            this.setState({ patientid: value })
        }
        if (field === Strings.patient_num) {
            this.setState({ patientnum: value })
        }
        if (field === Strings.first_name) {
            this.setState({ firstName: value })
        }
        if (field === Strings.last_name) {
            this.setState({ lastName: value })
        }
        if (field === Strings.address) {
            this.setState({ address: value })
        }
        if (field === Strings.nearest_birth_place) {
            this.setState({ nearestBirthPlace: value })
        }
        if (field === Strings.enter_age) {
            this.setState({ age: value })
        }
        if (field === Strings.birth_Date) {
            this.setState({ dateofBirth: value })
        }
        if (field === Strings.birth_time) {
            this.setState({ timeofBirth: value })
        }
        if (field === Strings.birth_place) {
            this.setState({ birthofPlace: value })
        }
        if (field === Strings.state) {
            this.setState({ state: value })
        }
        if (field === Strings.district) {
            this.setState({ district: value })
        }
        if (field === Strings.select_option) {
            this.setState({ dropDownVal: value })
        }
        if (field === Strings.radioButtonVal) {
            this.setState({ gender: value })
        }
    }

    loginclick(){
        if (!this.state.patientid) {
            toast.warn(ValidationMessage.p_id, {
              toastId: "pid",
            });
            return;
          }
          if (!this.state.patientnum) {
            toast.warn(ValidationMessage.p_num, {
              toastId: "p_num",
            });
            return;
          }
          if (!this.state.firstName) {
            toast.warn(ValidationMessage.p_firstname, {
              toastId: "p_firstname",
            });
            return;
          }
          if (!this.state.lastName) {
            toast.warn(ValidationMessage.p_lastname, {
              toastId: "p_lastname",
            });
            return;
          }
          if (!this.state.patientid) {
            toast.warn(ValidationMessage.p_id, {
              toastId: "pid",
            });
            return;
          }
          else{
            this.setState()
          }
        console.log("test")
        this.props.router.navigate(`/Login`);
    }
    render() {
        return (
            <div className="container">
                <div className="w-100 padding_vertical_50" >
                    <form className="background_color_light_grey rounded shadow_box">
                        <h2 className="text_align_center pb-4 pt-2">{Strings.registration}</h2>
                        <div className="w-75 me-auto ms-auto">
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12  ">
                                    <div className="form-group text_align_left ">
                                        <label htmlFor="PatientId"> {Strings.patient_id} <span className="logo_color_red"> *</span></label>
                                        <input type="text" onChange={(text) => this.handleSelectedData(text, Strings.patient_id)} className="form-control  input_hight_45" id="near_area" value={this.state.patientid} placeholder={Strings.patient_id} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                                    <div className="form-group text_align_left" >
                                        <label htmlFor="PatientNumber">{Strings.patient_num} <span className="logo_color_red"> *</span></label>
                                        <input type="number" onChange={(text) => this.handleSelectedData(text, Strings.patient_num)} className="form-control  input_hight_45" id="patientId" value={this.state.patientnum} placeholder={Strings.patient_num} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                    <div className="form-group text_align_left" >
                                        <label htmlFor="firstName">  {Strings.first_name} <span className="logo_color_red"> *</span>
                                        </label>
                                        <input
                                            type="text"
                                            onChange={(text) => { this.handleSelectedData(text, Strings.first_name) }}
                                            className="form-control  input_hight_45"
                                            id="firstName"
                                            value={this.state.firstName}
                                            placeholder={Strings.first_name}
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20  ">
                                    <div className="form-group text_align_left" >
                                        <label htmlFor="lastName"> {Strings.last_name} <span className="logo_color_red"> *</span></label>
                                        <input type="text" onChange={(text) => { this.handleSelectedData(text, Strings.last_name) }} className="form-control  input_hight_45" id="lastName" value={this.state.lastName} placeholder={Strings.last_name} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                    <div className="form-group text_align_left" >
                                        <label htmlFor="BirthPlace">{Strings.birth_place}</label>
                                        <input type="text" onChange={(text) => { this.handleSelectedData(text, Strings.birth_place) }} className="form-control  input_hight_45" id="birth_place" value={this.state.birthofPlace} placeholder={Strings.birth_place} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                    <div className="form-group text_align_left" >
                                        <label htmlFor="NearBirthPlace">{Strings.nearest_birth_place}</label>
                                        <input type="text" onChange={(text) => this.handleSelectedData(text, Strings.nearest_birth_place)} className="form-control  input_hight_45" id="near_area" value={this.state.nearestBirthPlace} placeholder={Strings.nearest_birth_place} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                            <div className="form-group text_align_left" >
                                                <label htmlFor="EnterAge"> {Strings.enter_age} <span className="logo_color_red"> *</span></label>
                                                <input type="number" onChange={(text) => { this.handleSelectedData(text, Strings.enter_age) }} className="form-control  input_hight_45" id="age" value={this.state.enter_age} placeholder={Strings.enter_age} />
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                            <div className="form-group text_align_left" >
                                                <label htmlFor="BirthDate"> {Strings.birth_Date} <span className="logo_color_red"> *</span></label>
                                                <input type="date" onChange={(text) => { this.handleSelectedData(text, Strings.birth_Date) }} className="form-control input_hight_45" id="firstName" value={this.state.dateofBirth} placeholder=" 00/00/00" />
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                            <div className="form-group text_align_left" >
                                                <label htmlFor="BirthTime">{Strings.birth_time} <span className="logo_color_red"> *</span></label>
                                                <input type="time" onChange={(text) => this.handleSelectedData(text, Strings.birth_time)} className="form-control input_hight_45 " value={this.state.timeofBirth} id="birthTime" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                    <div className="form-group text_align_left" >
                                        <label htmlFor="Address">{Strings.address}</label>
                                        <textarea rows={4} cols={40} className="form-control  input_hight_45" onChange={(text) => { this.handleSelectedData(text, Strings.address) }} value={this.state.address} placeholder={Strings.address} />
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                    <div className="form-group t{ext_align_left" >
                                        <label htmlFor="State">{Strings.state}</label>
                                        <input type="text" onChange={(text) => { this.handleSelectedData(text, Strings.state) }} className="form-control  input_hight_45" id="state" value={this.state.state} placeholder={Strings.state} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20 ">
                                    <div className="form-group text_align_left" >
                                        <label htmlFor="District">{Strings.district}</label>
                                        <input type="text" onChange={(text) => this.handleSelectedData(text, Strings.district)} className="form-control  input_hight_45" id="district" value={this.state.district} placeholder={Strings.district} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                    <div className="form-group text_align_left" >
                                        <label htmlFor="selectOption"> {Strings.select_option} </label>
                                        <select className="form-select input_hight_45" id="selectOption" onChange={(text) => this.handleSelectedData(text, Strings.select_option)}>
                                            {this.state.dropDown_menu.map(item => {
                                                return (
                                                    <option value={item.value}>{item.itemName}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_Radio_btn_50
                                  ">
                                    <div className="form-group text_align_left" >
                                        <label className="me-2">Gender: <span className="logo_color_red"> *</span></label>
                                        <div class="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={Strings.male} checked={this.state.gender === Strings.male} onChange={(text) => { this.handleSelectedData(text, Strings.radioButtonVal) }} />
                                            <label className="form-check-label" for="inlineRadio1">{Strings.male}</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={Strings.female} checked={this.state.gender === Strings.female} onChange={(text) => { this.handleSelectedData(text, Strings.radioButtonVal) }} />
                                            <label className="form-check-label" for="inlineRadio2">{Strings.female}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="width_100 text-end save_btn_margin_bottom_15 ">
                                <Button onClick={() => this.loginclick()} className="btn btn-success padding_horizental_35">{Strings.save}</Button>
                            </div>
                        </div>
                    </form >
                </div >
            </div>
        );
    }
}
export default withRouter(LoginScreen)
