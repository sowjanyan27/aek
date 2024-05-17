import React, { Component } from "react";
import { Strings } from "../strings/Strings";
import { Button, Badge, Container } from 'react-bootstrap';
import withRouter from "../helpers/Routers";
import { ValidationMessage } from "../helpers/ValidationMessage";
import { toast } from "react-toastify";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
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
            timeofBirth: "",
            birthofPlace: "",
            address: "",
            nearestBirthPlace: "",
            mobile: "",
            state: "",
            district: "",
            dropDownVal: "",
            gender: "",
            username: "venkat",
            searchId: "",
            searchValue: "",
            filterData: [],
            nodataFound: false,
            isFormView: false,
            showpatientIdview: false,
            showpatientNumview: false,
            showpatientFirstnameview: false,
            showpatientLastnameview: false,
            showgenderSelectionview: false,
            showBirthTimeview: false,
            showBirtDateview: false,
            showageview: false,
            dropDown_menu: [
                { itemName: "Options 1", value: 1 },
                { itemName: "Options 2", value: 2 },
                { itemName: "Options 3", value: 3 },
                { itemName: "Options 4", value: 4 },
            ],
            data: [
                {
                    id: 1,
                    FName: 'Ghost',
                    LName: 'busters',
                    year: '1984/05/23',
                    gender: "Male",
                    PhNum: "87654321"
                },
                {
                    id: 2,
                    FName: 'John',
                    LName: 'Sena',
                    year: '1984/05/23',
                    gender: "Male",
                    PhNum: "76543821"
                },
                {
                    id: 3,
                    FName: 'Mia',
                    LName: 'Maya',
                    year: '1984/05/23',
                    gender: "Female",
                    PhNum: "65487321"
                },
                // Add more data as needed
            ]
        }
        // console.warn("++which one first")
    }







    handleSelectedData = (text, field) => {
        var value = text.target.value
        if (field === Strings.patient_id) {
            if (value !== "") {
                this.setState({ showpatientIdview: false })
            }
            this.setState({ patientid: value })
            return
        }
        if (field === Strings.patient_num) {
            if (value !== "") {
                this.setState({ showpatientNumview: false })
            }
            this.setState({ patientnum: value })
        }
        if (field === Strings.first_name) {
            if (value !== "") {
                this.setState({ showpatientFirstnameview: false })
            }
            this.setState({ firstName: value })
        }
        if (field === Strings.last_name) {
            if (value !== "") {
                this.setState({ showpatientLastnameview: false })
            }
            this.setState({ lastName: value })
        }
        if (field === Strings.address) {
            this.setState({ address: value })
        }
        if (field === Strings.nearest_birth_place) {
            this.setState({ nearestBirthPlace: value })
        }
        if (field === Strings.enter_age) {
            if (value !== "") {
                this.setState({ showageview: false })
            }
            this.setState({ age: value })
        }
        if (field === Strings.birth_Date) {
            if (value !== "") {
                this.setState({ showBirtDateview: false })
            }
            this.setState({ dateofBirth: value })
        }
        if (field === Strings.birth_time) {
            if (value !== "") {
                this.setState({ showBirthTimeview: false })
            }
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
            if (value !== "") {
                this.setState({ showgenderSelectionview: false })
            }
            this.setState({ gender: value })
        }
    }


    loginclick() {

        //   // extra text view // // 

        // if (!this.state.patientid) {
        //     this.setState({ showpatientIdview: true })
        //     return
        // }
        // if (!this.state.patientnum) {
        //     this.setState({ showpatientNumview: true })
        //     return
        // }
        // if (!this.state.firstName) {
        //     this.setState({ showpatientFirstnameview: true })
        //     return
        // }
        // if (!this.state.lastName) {
        //     this.setState({ showpatientLastnameview: true })
        //     return
        // }
        // if (!this.state.age) {
        //     this.setState({ showageview: true })
        //     return
        // }
        // if (!this.state.dateofBirth) {
        //     this.setState({ showBirtDateview: true })
        //     return
        // }
        // if (!this.state.timeofBirth) {
        //     this.setState({ showBirthTimeview: true })
        //     return
        // }
        // if (!this.state.gender) {
        //     this.setState({ showgenderSelectionview: true })
        //     return
        // }
        // toast.success(ValidationMessage.V_Added, {
        //     toastId: "success"
        // });
        // setTimeout(() => {

        //     this.setState({ isFormView: false })
        // }, 1000)

        // return

        // // Showing pop up // //

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
        if (!this.state.age) {
            toast.warn(ValidationMessage.p_age, {
                toastId: "p_age",
            });
            return;
        }
        if (!this.state.dateofBirth) {
            toast.warn(ValidationMessage.p_birth_date, {
                toastId: "p_birthDate",
            });
            return;
        }
        if (!this.state.timeofBirth) {
            toast.warn(ValidationMessage.p_birth_time, {
                toastId: "p_birthTime",
            });
            return;
        }
        if (!this.state.gender) {
            toast.warn(ValidationMessage.p_gender, {
                toastId: "p_gender",
            });
            return;
        }
        // else {
        //     this.setState()
        // }
        // console.log("test")
        // this.props.router.navigate(`/Login`);
        toast.success(ValidationMessage.V_Added, {
            toastId: "success"
        });
        setTimeout(() => {

            this.setState({ isFormView: false })
        }, 1000)
    }






    handleFilterId = (text) => {
        var value = text.target.value.toLowerCase();
        this.setState({ searchId: value })
        var filteredArray = this.state.data.filter(item => {
            return (
                item.id.toString().toLowerCase().includes(value)
            );
        });
        this.setState({ filterData: filteredArray, nodataFound: filteredArray.length === 0 })

    }


    handleFilter = (text) => {
        var value = text.target.value.toLowerCase();
        this.setState({ searchValue: value })

        const filteredArray = this.state.data.filter(item => {
            return (
                item.id.toString().toLowerCase().includes(value) ||
                item.FName.toLowerCase().includes(value) ||
                item.LName.toLowerCase().includes(value) ||
                item.year.toLowerCase().includes(value) ||
                item.gender.toLowerCase().includes(value) ||
                item.PhNum.toLowerCase().includes(value)
            );
        });
        this.setState({ filterData: filteredArray, nodataFound: filteredArray.length === 0 })
    };
    handleFormView = (item) => {
        this.setState({ isFormView: item })
    }
    render() {
        return (
            <div className="container">
                <div className="w-100 padding_vertical_50" >
                    <div className="background_color_light_grey rounded shadow_box">
                        {!this.state.isFormView ?
                            <div>
                                <div className="margin_bottom_15 right-align ">
                                    <Button className="btn-secondary" onClick={() => { this.handleFormView(true) }}><i class="fa fa-plus color_white font_size_16_normal" aria-hidden="true"></i>
                                    </Button>
                                    <div className="show_add_new">
                                        <div >add new</div>
                                    </div>
                                </div>

                                <div className="show_add_new">
                                    <div >add new</div>
                                </div>
                                <TableContainer className="mt-4 mb-4" component={Paper}>
                                    <div className="mt-4 mb-4 width_100 space-between display_flex" >
                                        <input
                                            className="ms-4"
                                            type="number"
                                            value={this.state.searchId}
                                            onChange={(text) => { this.handleFilterId(text) }} // Changed parameter to e.target.value
                                            placeholder="Search Id"
                                        />
                                        <input
                                            className="me-4"
                                            value={this.state.searchValue}
                                            onChange={(text) => { this.handleFilter(text) }} // Changed parameter to e.target.value
                                            placeholder="Search..."
                                        />
                                    </div>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ID</TableCell>
                                                <TableCell>First Name</TableCell>
                                                <TableCell>Last Name</TableCell>
                                                <TableCell>D.O.J</TableCell>
                                                <TableCell>Gender</TableCell>
                                                <TableCell>Phone Number</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.nodataFound ? (
                                                <TableRow>
                                                    <TableCell colSpan={7}>No data found</TableCell>
                                                </TableRow>
                                            ) : (
                                                this.state.filterData.length === 0 ? (
                                                    this.state.data.map((row) => (
                                                        <TableRow key={row.id}>
                                                            <TableCell>{row.id}</TableCell>
                                                            <TableCell>{row.FName}</TableCell>
                                                            <TableCell>{row.LName}</TableCell>
                                                            <TableCell>{row.year}</TableCell>
                                                            <TableCell>{row.gender}</TableCell>
                                                            <TableCell>{row.PhNum}</TableCell>
                                                            <TableCell>
                                                                <Button variant="outlined">View</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    this.state.filterData.map((row) => (
                                                        <TableRow key={row.id}>
                                                            <TableCell>{row.id}</TableCell>
                                                            <TableCell>{row.FName}</TableCell>
                                                            <TableCell>{row.LName}</TableCell>
                                                            <TableCell>{row.year}</TableCell>
                                                            <TableCell>{row.gender}</TableCell>
                                                            <TableCell>{row.PhNum}</TableCell>
                                                            <TableCell>
                                                                <Button variant="outlined">View</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                )
                                            )}
                                        </TableBody>

                                    </Table>
                                </TableContainer>
                            </div>
                            :
                            <form>
                                <h2 className="text_align_center pb-4 pt-2">{Strings.registration}</h2>
                                <div className="w-75 me-auto ms-auto">
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12  ">
                                            <div className="form-group text_align_left ">
                                                <label htmlFor="PatientId"> {Strings.patient_id} <span className="logo_color_red"> *</span></label>
                                                <input type="text" onChange={(text) => this.handleSelectedData(text, Strings.patient_id)} className="form-control  input_hight_45" id="near_area" value={this.state.patientid} placeholder={Strings.patient_id} />
                                                {this.state.showpatientIdview && <span style={{ color: "red", fontSize: 12 }}>{Strings.please_enter_value}</span>}
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                                            <div className="form-group text_align_left" >
                                                <label htmlFor="PatientNumber">{Strings.patient_num} <span className="logo_color_red"> *</span></label>
                                                <input type="text" onChange={(text) => this.handleSelectedData(text, Strings.patient_num)} className="form-control  input_hight_45" id="patientId" value={this.state.patientnum} placeholder={Strings.patient_num} />
                                                {this.state.showpatientNumview && <span style={{ color: "red", fontSize: 12 }}>{Strings.please_enter_value}</span>}

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
                                                {this.state.showpatientFirstnameview && <span style={{ color: "red", fontSize: 12 }}>{Strings.please_enter_value}</span>}

                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20  ">
                                            <div className="form-group text_align_left" >
                                                <label htmlFor="lastName"> {Strings.last_name} <span className="logo_color_red"> *</span></label>
                                                <input type="text" onChange={(text) => { this.handleSelectedData(text, Strings.last_name) }} className="form-control  input_hight_45" id="lastName" value={this.state.lastName} placeholder={Strings.last_name} />
                                                {this.state.showpatientLastnameview && <span style={{ color: "red", fontSize: 12 }}>{Strings.please_enter_value}</span>}
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
                                                        {this.state.showageview && <span style={{ color: "red", fontSize: 12 }}>{Strings.please_enter_value}</span>}
                                                    </div>
                                                </div>
                                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                                    <div className="form-group text_align_left" >
                                                        <label htmlFor="BirthDate"> {Strings.birth_Date} <span className="logo_color_red"> *</span></label>
                                                        <input type="date" onChange={(text) => { this.handleSelectedData(text, Strings.birth_Date) }} className="form-control input_hight_45" id="firstName" value={this.state.dateofBirth} placeholder=" 00/00/00" />
                                                        {this.state.showBirtDateview && <span style={{ color: "red", fontSize: 12 }}>{Strings.please_enter_value}</span>}

                                                    </div>
                                                </div>
                                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                                    <div className="form-group text_align_left" >
                                                        <label htmlFor="BirthTime">{Strings.birth_time} <span className="logo_color_red"> *</span></label>
                                                        <input type="time" onChange={(text) => this.handleSelectedData(text, Strings.birth_time)} className="form-control input_hight_45 " value={this.state.timeofBirth} id="birthTime" />
                                                        {this.state.showBirthTimeview && <span style={{ color: "red", fontSize: 12 }}>{Strings.please_enter_value}</span>}
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
                                                {this.state.showgenderSelectionview && <span style={{ color: "red", fontSize: 12 }}>{Strings.please_select_one}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="width_100 text-end save_btn_margin_bottom_15 ">
                                        <Button onClick={() => this.handleFormView(false)} className="btn btn-secondary padding_horizental_35 margin_right_10">{Strings.cancel}</Button>
                                        <Button onClick={() => this.loginclick()} className="btn btn-success padding_horizental_35">{Strings.save}</Button>
                                    </div>
                                </div>
                            </form >
                        }
                    </div>
                </div >
            </div>
        );
    }
}
export default withRouter(LoginScreen)
