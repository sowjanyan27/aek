import React, { Component } from "react";
import { Strings } from "../strings/Strings";
import { Button } from 'react-bootstrap';
import withRouter from "../helpers/Routers";
import { ValidationMessage } from "../helpers/ValidationMessage";
import { toast } from "react-toastify";
import { Common } from "../helpers/common";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import "react-toastify/dist/ReactToastify.css"




class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patientid: "1",
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
            state: "",
            district: "",
            dropDownVal: "",
            searchId: "",
            searchValue: "",
            filterData: [],
            firstVisit: "",
            phoneNumber: "",
            disabledInput: false,
            disabledInput_part2: false,
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
            showUpDate_btn: false,
            showSave_btn: false,
            dropDown_menu: [
                { itemName: "Options 1", value: 1 },
                { itemName: "Options 2", value: 2 },
                { itemName: "Options 3", value: 3 },
                { itemName: "Options 4", value: 4 },
            ],
            data: [
                // {
                //     id: 1,
                //     FName: 'Ghost',
                //     LName: 'busters',
                //     year: '1997-05-29',
                //     gender: "Male",
                //     PhNum: "87654321"
                // },
                // {
                //     id: 2,
                //     FName: 'John',
                //     LName: 'Sena',
                //     year: '1967-05-26',
                //     gender: "Male",
                //     PhNum: "76543821"
                // },
                // {
                //     id: 3,
                //     FName: 'Mia',
                //     LName: 'Maya',
                //     year: '1967-01-29',
                //     gender: "Female",
                //     PhNum: "65487321"
                // },
                // Add more data as needed

                { id: 1, FName: 'John', LName: 'Doe', email: 'john@example.com', year: '1967-01-29', gender: "Female", PhNum: "65487321" },
                { id: 2, FName: 'Jane', LName: ' Dow', email: 'jane@example.com', year: '1988-11-23', gender: "Male", PhNum: "65487321" },
                { id: 3, FName: 'Alice', LName: ' Smith', email: 'alice@example.com', year: '1907-09-19', gender: "Female", PhNum: "65487321" },
                { id: 4, FName: 'Bob', LName: ' Johnson', email: 'bob@example.com', year: '1958-09-25', gender: "Male", PhNum: "65487321" },
                { id: 5, FName: 'Charlie', LName: 'Brown', email: 'charlie@example.com', year: '1957-01-19', gender: "Female", PhNum: "65487321" },
                { id: 6, FName: 'David', LName: 'Wilson', email: 'david@example.com', year: '1997-06-20', gender: "Female", PhNum: "65487321" },
                { id: 7, FName: 'Eve', LName: 'Adams', email: 'eve@example.com', year: '1967-01-29', gender: "Male", PhNum: "65487321" },
                { id: 8, FName: 'Frank', LName: 'Clark', email: 'frank@example.com', year: '1990-01-25', gender: "Female", PhNum: "3252566" },
                { id: 9, FName: 'Grace', LName: 'Lee', email: 'grace@example.com', year: '1967-02-11', gender: "Female", PhNum: "65487321" },
                { id: 10, FName: 'Hank', LName: 'Miller', email: 'hank@example.com', year: '1956-02-28', gender: "Male", PhNum: "4567321" },
                { id: 11, FName: 'Ivy', LName: 'Martin', email: 'ivy@example.com', year: '1987-05-20', gender: "Female", PhNum: "342634521" },
                { id: 12, FName: 'Jack', LName: 'Davis', email: 'jack@example.com', year: '1988-07-04', gender: "Female", PhNum: "134234135" }
            ]
        }
        this.inputRef = React.createRef()
        // console.warn("++which one first")
    }



    componentDidMount() {
        // this.inputRef.current.focus()
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
        if (field === Strings.ph_num) {
            const formattedNumber = Common.mobileNumberFormat(value);
            if (formattedNumber !== null) {
                this.setState({ phoneNumber: formattedNumber });
            }
        }
        if (field === Strings.first_visit) {
            this.setState({ firstVisit: value })
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
            toastId: 'success',
            onClose: () => {
                this.setState({ isFormView: false });
                // this.dataClear()
            }
        });
        this.setState({ isFormView: false });
    }

    dataClear() {
        this.setState({
            patientid: "1",
            patientnum: "",
            firstName: "",
            lastName: "",
            age: "",
            dateofBirth: "",
            timeofBirth: "",
            birthofPlace: "",
            address: "",
            nearestBirthPlace: "",

            state: "",
            district: "",
            dropDownVal: "",
            gender: "",
            searchId: "",
            searchValue: "",
            firstVisit: "",
            phoneNumber: ""
        })
    }

    handleFilterId = async (text) => {
        // var value = text.target.value.toLowerCase();
        var value = await Common.getNumericValue(text.target.value); // validate the numberic values
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
        this.setState({ isFormView: item, disabledInput: true, disabledInput_part2: true })
        if (!item) {
            this.setState({ showUpDate_btn: false })
            this.dataClear()
            return
        }
        if (item) {
            this.setState({ showUpDate_btn: false, showedit_btn: false, showSave_btn: true })
            return
        }
    }

    handleView = (item) => {
        this.setState({ isFormView: true, disabledInput: false, showSave_btn: false, showedit_btn: true, showUpDate_btn: false, disabledInput_part2: false }, () => {
            this.setState({
                patientid: (item.id != null && item.id != undefined) ? item.id : "",
                firstName: (item.FName != null && item.FName != undefined) ? item.FName : "",
                lastName: (item.LName != null && item.LName != undefined) ? item.LName : "",
                phoneNumber: (item.PhNum != null && item.PhNum != undefined) ? item.PhNum : "",
                gender: (item.gender != null && item.gender != undefined) ? item.gender : "",
                dateofBirth: (item.year != null && item.year != undefined) ? item.year : ""
            })
        })
        console.warn("++item", item)
    }
    handleDisable() {
        this.setState({ disabledInput: true, showUpDate_btn: true, showedit_btn: false })
    }

    handleEditedValues() {
        toast.success("Updated Successfully...", {
            toastId: 'updation',
            onClose: () => {
                this.setState({ isFormView: false });
                // this.dataClear()
            }
        });
    }
    handleDeletion() {
        // this.dataClear(),
        this.handleFormView(false)
    }
    onSubmit = () => {
        alert("hi")
    }

    render() {
        return (
            <div className="container">
                <div className="w-100 padding_vertical_50" >
                    <div className="background_color_light_grey rounded shadow_box">
                        {!this.state.isFormView ?
                            <div className="position_relatives">
                                <div className="margin_bottom_15 right-align ">
                                    <Button className="btn handle_content" onClick={() => { this.handleFormView(true) }}><i class="fa fa-plus color_white font_size_16_normal" aria-hidden="true"></i>
                                    </Button>
                                    <div className="show_content  p-2 rounded">Add New</div>
                                </div>

                                <TableContainer className="mt-4 mb-4" component={Paper}>
                                    <div className="mt-4 mb-4 width_100 space-between display_flex" >
                                        <input
                                            ref={this.inputRef}
                                            className="font_family_serif"
                                            type="text"
                                            value={this.state.searchId}
                                            onChange={(text) => { this.handleFilterId(text) }} // Changed parameter to e.target.value
                                            placeholder="Search Id"
                                        />
                                        <input
                                            className="font_family_serif"
                                            value={this.state.searchValue}
                                            onChange={(text) => { this.handleFilter(text) }} // Changed parameter to e.target.value
                                            placeholder="Search..."
                                        />
                                    </div>
                                    <Table className="table table-bordered">
                                        <TableHead className="table_header_light_grey">
                                            <TableRow>
                                                <TableCell className="font_family_serif table_header_text_maroon">ID</TableCell>
                                                <TableCell className="font_family_serif table_header_text_maroon">First Name</TableCell>
                                                <TableCell className="font_family_serif table_header_text_maroon">Last Name</TableCell>
                                                <TableCell className="font_family_serif table_header_text_maroon">D.O.J</TableCell>
                                                <TableCell className="font_family_serif table_header_text_maroon">Gender</TableCell>
                                                <TableCell className="font_family_serif table_header_text_maroon">Phone Number</TableCell>
                                                <TableCell className="font_family_serif table_header_text_maroon">Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.nodataFound ? (
                                                <TableRow>
                                                    <TableCell className="font_family_serif" colSpan={7}>No data found</TableCell>
                                                </TableRow>
                                            ) : (
                                                this.state.filterData.length === 0 ? (
                                                    this.state.data.map((row) => (
                                                        <TableRow key={row.id}>
                                                            <TableCell className="font_family_serif">{row.id}</TableCell>
                                                            <TableCell className="font_family_serif">{row.FName}</TableCell>
                                                            <TableCell className="font_family_serif">{row.LName}</TableCell>
                                                            <TableCell className="font_family_serif">{row.year}</TableCell>
                                                            <TableCell className="font_family_serif">{row.gender}</TableCell>
                                                            <TableCell className="font_family_serif">{row.PhNum}</TableCell>
                                                            <TableCell>
                                                                <Button variant="outlined" className="font_family_serif" onClick={() => { this.handleView(row) }}>View</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    this.state.filterData.map((row) => (
                                                        <TableRow key={row.id}>
                                                            <TableCell className="font_family_serif">{row.id}</TableCell>
                                                            <TableCell className="font_family_serif">{row.FName}</TableCell>
                                                            <TableCell className="font_family_serif">{row.LName}</TableCell>
                                                            <TableCell className="font_family_serif">{row.year}</TableCell>
                                                            <TableCell className="font_family_serif">{row.gender}</TableCell>
                                                            <TableCell className="font_family_serif">{row.PhNum}</TableCell>
                                                            <TableCell>
                                                                <Button variant="outlined" className="font_family_serif" onClick={() => { this.handleView(row) }}>View</Button>
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
                                <div style={{ position: "relative", display: "flex", justifyContent: "space-between" }} className="w-75 me-auto ms-auto">
                                    <div></div>
                                    <h2 className="text_align_center pb-4 pt-2 font_family_serif">{Strings.registration}</h2>
                                    <div className="mt-2">
                                        {this.state.showedit_btn ?
                                            <div>
                                                <Button onClick={() => this.handleDisable()} className="btn btn-secondary padding_horizental_35 margin_right_10 font_family_serif">{Strings.edit}</Button>
                                                <Button onClick={() => this.handleFormView(false)} className="btn btn-danger padding_horizental_35 font_family_serif">{Strings.delete}</Button>
                                            </div>
                                            :
                                            <div></div>
                                        }
                                    </div>
                                </div>
                                <div className="w-75 me-auto ms-auto">
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12  ">
                                            <div className="form-group text_align_left ">
                                                <label htmlFor="PatientId" className="font_family_serif"> {Strings.patient_id} <span className="logo_color_red"> *</span></label>
                                                <input type="text" disabled={true} onChange={(text) => this.handleSelectedData(text, Strings.patient_id)} className="form-control font_family_serif  input_hight_45" id="near_area" value={this.state.patientid} placeholder={Strings.patient_id} />
                                                {this.state.showpatientIdview && <span className="font_family_serif" style={{ color: "red", fontSize: 12 }}>{Strings.please_enter_value}</span>}
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                                            <div className="form-group text_align_left" >
                                                <label htmlFor="PatientNumber" className="font_family_serif">{Strings.patient_num} <span className="logo_color_red"> *</span></label>
                                                <input required type="text" disabled={!this.state.disabledInput_part2} onChange={(text) => this.handleSelectedData(text, Strings.patient_num)} className="form-control font_family_serif input_hight_45" id="patientId" value={this.state.patientnum} placeholder={Strings.patient_num} />
                                                {this.state.showpatientNumview && <span className="font_family_serif" style={{ color: "red", fontSize: 12 }}>{Strings.please_enter_value}</span>}

                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                            <div className="form-group text_align_left" >
                                                <label htmlFor="firstName" className="font_family_serif">  {Strings.first_name} <span className="logo_color_red"> *</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    disabled={!this.state.disabledInput_part2}
                                                    onChange={(text) => { this.handleSelectedData(text, Strings.first_name) }}
                                                    className="form-control font_family_serif input_hight_45"
                                                    id="firstName"
                                                    value={this.state.firstName}
                                                    placeholder={Strings.first_name}
                                                />
                                                {this.state.showpatientFirstnameview && <span className="font_family_serif" style={{ color: "red", fontSize: 12 }}>{Strings.please_enter_value}</span>}

                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20  ">
                                            <div className="form-group text_align_left" >
                                                <label htmlFor="lastName" className="font_family_serif"> {Strings.last_name} <span className="logo_color_red"> *</span></label>
                                                <input required type="text" disabled={!this.state.disabledInput_part2} onChange={(text) => { this.handleSelectedData(text, Strings.last_name) }} className="form-control font_family_serif input_hight_45" id="lastName" value={this.state.lastName} placeholder={Strings.last_name} />
                                                {this.state.showpatientLastnameview && <span className="font_family_serif" style={{ color: "red", fontSize: 12 }}>{Strings.please_enter_value}</span>}
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                            <div className="form-group text_align_left" >
                                                <label htmlFor="BirthPlace" className="font_family_serif">{Strings.birth_place}</label>
                                                <input type="text" disabled={!this.state.disabledInput} onChange={(text) => { this.handleSelectedData(text, Strings.birth_place) }} className="form-control font_family_serif input_hight_45" id="birth_place" value={this.state.birthofPlace} placeholder={Strings.birth_place} />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                            <div className="form-group text_align_left" >
                                                <label htmlFor="NearBirthPlace" className="font_family_serif">{Strings.nearest_birth_place}</label>
                                                <input type="text" disabled={!this.state.disabledInput} onChange={(text) => this.handleSelectedData(text, Strings.nearest_birth_place)} className="form-control font_family_serif input_hight_45" id="near_area" value={this.state.nearestBirthPlace} placeholder={Strings.nearest_birth_place} />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                            <div className="row">
                                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                                    <div className="form-group text_align_left" >
                                                        <label htmlFor="EnterAge" className="font_family_serif"> {Strings.enter_age} <span className="logo_color_red"> *</span></label>
                                                        <input required type="number" disabled={!this.state.disabledInput} onChange={(text) => { this.handleSelectedData(text, Strings.enter_age) }} className="form-control font_family_serif input_hight_45" id="age" value={this.state.enter_age} placeholder={Strings.enter_age} />
                                                        {this.state.showageview && <span className="font_family_serif" style={{ color: "red", fontSize: 12 }}>{Strings.please_enter_value}</span>}
                                                    </div>
                                                </div>
                                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                                    <div className="form-group text_align_left" >
                                                        <label htmlFor="BirthDate" className="font_family_serif"> {Strings.birth_Date} <span className="logo_color_red"> *</span></label>
                                                        <input required type="date" disabled={!this.state.disabledInput} onChange={(text) => { this.handleSelectedData(text, Strings.birth_Date) }} className="form-control font_family_serif input_hight_45" id="firstName" value={this.state.dateofBirth} />
                                                        {this.state.showBirtDateview && <span className="font_family_serif" style={{ color: "red", fontSize: 12 }}>{Strings.please_enter_value}</span>}

                                                    </div>
                                                </div>
                                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                                    <div className="form-group text_align_left" >
                                                        <label htmlFor="BirthTime">{Strings.birth_time} <span className="logo_color_red"> *</span></label>
                                                        <input required type="time" disabled={!this.state.disabledInput} onChange={(text) => this.handleSelectedData(text, Strings.birth_time)} className="form-control font_family_serif input_hight_45 " value={this.state.timeofBirth} id="birthTime" />
                                                        {this.state.showBirthTimeview && <span className="font_family_serif" style={{ color: "red", fontSize: 12 }}>{Strings.please_enter_value}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                            <div className="form-group text_align_left" >
                                                <label htmlFor="Address" className="font_family_serif">{Strings.address}</label>
                                                <textarea rows={4} cols={40} disabled={!this.state.disabledInput} style={{ resize: "none" }} className="form-control font_family_serif input_hight_45" onChange={(text) => { this.handleSelectedData(text, Strings.address) }} value={this.state.address} placeholder={Strings.address} />
                                            </div>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                            <div className="form-group t{ext_align_left" >
                                                <label htmlFor="State" className="font_family_serif">{Strings.state}</label>
                                                <input type="text" disabled={!this.state.disabledInput} onChange={(text) => { this.handleSelectedData(text, Strings.state) }} className="form-control font_family_serif input_hight_45" id="state" value={this.state.state} placeholder={Strings.state} />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20 ">
                                            <div className="form-group text_align_left" >
                                                <label htmlFor="District" className="font_family_serif">{Strings.district}</label>
                                                <input type="text" disabled={!this.state.disabledInput} onChange={(text) => this.handleSelectedData(text, Strings.district)} className="form-control font_family_serif input_hight_45" id="district" value={this.state.district} placeholder={Strings.district} />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                            <div className="form-group text_align_left" >
                                                <label htmlFor="selectOption" className="font_family_serif"> {Strings.select_option} </label>
                                                <select disabled={!this.state.disabledInput} className="form-select font_family_serif input_hight_45" id="selectOption" onChange={(text) => this.handleSelectedData(text, Strings.select_option)}>
                                                    {this.state.dropDown_menu.map(item => {
                                                        return (
                                                            <option className="font_family_serif" value={item.value}>{item.itemName}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_Radio_btn_50
                                  ">
                                            <div className="form-group text_align_left" >
                                                <label className="me-2 font_family_serif">Gender: <span className="logo_color_red"> *</span></label>
                                                <div class="form-check form-check-inline">
                                                    <input required disabled={!this.state.disabledInput} className="form-check-input font_family_serif" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={Strings.male} checked={this.state.gender === Strings.male} onChange={(text) => { this.handleSelectedData(text, Strings.radioButtonVal) }} />
                                                    <label className="form-check-label font_family_serif" for="inlineRadio1">{Strings.male}</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input required disabled={!this.state.disabledInput} className="form-check-input font_family_serif" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={Strings.female} checked={this.state.gender === Strings.female} onChange={(text) => { this.handleSelectedData(text, Strings.radioButtonVal) }} />
                                                    <label className="form-check-label font_family_serif" for="inlineRadio2">{Strings.female}</label>
                                                </div>
                                                {this.state.showgenderSelectionview && <span className="font_family_serif" style={{ color: "red", fontSize: 12 }}>{Strings.please_select_one}</span>}
                                            </div>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20  margin_bottom_25">
                                            <div className="form-group t{ext_align_left" >
                                                <label htmlFor="firstVisit" className="font_family_serif">{Strings.first_visit}</label>
                                                <input type="date" disabled={!this.state.disabledInput} onChange={(text) => { this.handleSelectedData(text, Strings.first_visit) }} className="form-control font_family_serif input_hight_45" id="firstVisit" value={this.state.firstVisit} placeholder={Strings.first_visit} />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20 margin_bottom_25 ">
                                            <div className="form-group text_align_left" >
                                                <label htmlFor="phNum" className="font_family_serif">{Strings.ph_num}</label>
                                                <input type="text" maxLength={10} pattern="6[0-9]{9}" disabled={!this.state.disabledInput} onChange={(text) => this.handleSelectedData(text, Strings.ph_num)} className="form-control font_family_serif input_hight_45" id="phNum" value={this.state.phoneNumber} placeholder={Strings.ph_num} />
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.showUpDate_btn &&
                                        // <div className="width_100 text-end save_btn_margin_bottom_15 ">
                                        //     <Button onClick={() => this.handleFormView(false)} className="btn btn-secondary padding_horizental_35 margin_right_10 font_family_serif">{Strings.cancel}</Button>
                                        //     <Button onClick={() => this.loginclick()} className="btn btn-success padding_horizental_35 font_family_serif">{Strings.save}</Button>
                                        // </div>
                                        <div className="width_100 text-end save_btn_margin_bottom_15 ">
                                            <Button onClick={() => { this.handleDeletion() }} className="btn btn-secondary padding_horizental_35 margin_right_10 font_family_serif">{Strings.cancel}</Button>
                                            <Button onClick={() => this.handleEditedValues()} className="btn btn-success padding_horizental_35 font_family_serif">{Strings.update}</Button>
                                        </div>
                                    }
                                    {this.state.showSave_btn &&
                                        <div className="width_100 text-end save_btn_margin_bottom_15 ">
                                            <Button onClick={() => this.handleFormView(false)} className="btn btn-secondary padding_horizental_35 margin_right_10 font_family_serif">{Strings.cancel}</Button>
                                            <Button onClick={() => this.loginclick()} className="btn btn-success padding_horizental_35 font_family_serif">{Strings.save}</Button>
                                        </div>
                                    }
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
