import React, { Component } from "react";
import { Strings } from "../strings.js/Strings";
import { Button, Badge, Container } from 'react-bootstrap';



export default class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            age: "",
            gender: "",
            dateofBirth: "",
            dateofPlace: "",
            timeofBirth: "",
            address: "",
            nearbyAdress: "",
            mobile: "",
            state: "",
            district: ""
        }
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
                                        <label htmlFor="PatientId"> Patient id</label>
                                        <input type="text" className="form-control shadow_box_input input_hight_45" id="near_area" placeholder=" Enter near area" />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                                    <div className="form-group text_align_left" >
                                        <label htmlFor="PatientNumber">Patient number</label>
                                        <input type="number" className="form-control shadow_box_input input_hight_45" id="near_area" placeholder=" Enter near area" />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                    <div className="form-group text_align_left" >
                                        <label htmlFor="firstName"> First Name <span className="logo_color_red"> *</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control shadow_box_input input_hight_45"
                                            id="firstName"
                                            placeholder="First name"
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20  ">
                                    <div className="form-group text_align_left" >
                                        <label htmlFor="lastName"> Last Name <span className="logo_color_red"> *</span></label>
                                        <input type="text" className="form-control shadow_box_input input_hight_45" id="lastName" placeholder="Last name" />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                    <div className="form-group text_align_left" >
                                        <label htmlFor="BirthPlace">Birth of place</label>
                                        <input type="text" className="form-control shadow_box_input input_hight_45" id="birth_place" placeholder="Enter Birth Place" />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                    <div className="form-group text_align_left" >
                                        <label htmlFor="NearBirthPlace">Nearest birth place</label>
                                        <input type="text" className="form-control shadow_box_input input_hight_45" id="near_area" placeholder=" Enter birth nearest area" />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                            <div className="form-group text_align_left" >
                                                <label htmlFor="EnterAge"> Enter Age <span className="logo_color_red"> *</span></label>
                                                <input type="number" className="form-control shadow_box_input input_hight_45" id="age" placeholder="Enter Age" />
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                            <div className="form-group text_align_left" >
                                                <label htmlFor="BirthDate"> Birth Date <span className="logo_color_red"> *</span></label>
                                                <input type="date" className="form-control input_hight_45" id="firstName" placeholder=" 00/00/00" />
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                            <div className="form-group text_align_left" >
                                                <label htmlFor="BirthTime">Birth time <span className="logo_color_red"> *</span></label>
                                                <input type="time" className="form-control input_hight_45 " id="birthTime" placeholder="00-00" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                    <div className="form-group text_align_left" >
                                        <label htmlFor="Address">Address</label>
                                        <textarea rows={4} cols={40} className="form-control shadow_box_input input_hight_45" placeholder="Enter Address" />
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                    <div className="form-group text_align_left" >
                                        <label htmlFor="State">State</label>
                                        <input type="text" className="form-control shadow_box_input input_hight_45" id="state" placeholder="Entet State name" />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20 ">
                                    <div className="form-group text_align_left" >
                                        <label htmlFor="District">District</label>
                                        <input type="text" className="form-control shadow_box_input input_hight_45" id="district" placeholder="Enter District name" />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                    <div className="form-group text_align_left" >
                                        <label htmlFor="selectOption">Select Option</label>
                                        <select className="form-select input_hight_45" id="selectOption">
                                            <option value="option1">Option 1</option>
                                            <option value="option2">Option 2</option>
                                            <option value="option3">Option 3</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_Radio_btn_50
                                  ">
                                    <div className="form-group text_align_left" >
                                        <label className="me-2">Gender: <span className="logo_color_red"> *</span></label>
                                        <div class="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                            <label className="form-check-label" for="inlineRadio1">{Strings.male}</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                            <label className="form-check-label" for="inlineRadio2">{Strings.female}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="width_100 text-end save_btn_margin_bottom_15 ">
                                <Button className="btn btn-success padding_horizental_35">{Strings.save}</Button>
                            </div>
                        </div>
                    </form >
                </div >
            </div>
        );
    }
}
