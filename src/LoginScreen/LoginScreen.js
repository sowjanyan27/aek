import React, { Component } from "react";
import { Strings } from "../strings/Strings";
import { Button } from 'react-bootstrap';
import withRouter from "../helpers/Routers";
import { ValidationMessage } from "../helpers/ValidationMessage";
import { toast } from "react-toastify";
import { Common } from "../helpers/common";
import { Employee } from "../api/Employee";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableFooter } from "@mui/material";
import "react-toastify/dist/ReactToastify.css"
import TablePaginationActions from "../helpers/Pagination";
import MedicineScreen from './MedicineScreen';


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
            gender_name: '',
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
            patient_details_id: "",
            patient_number: "",
            patient_first_visit_date: "",
            patient_first_name: "",
            patient_last_name: "",
            patient_gender_id: "",
            patient_age: "",
            patient_dob: "",
            patient_tob: "",
            patient_birth_place: "",
            patient_nearest_birth_place: "",
            patient_address: "",
            patient_mobile_no: "",
            patient_district: "",
            patient_state_id: "",
            gender_id: "",
            gender_name: "",
            state_id: "",
            state_name: "",
            country_id: "",
            is_active: "",

            dropDown_menu: [
                { itemName: "Options 1", value: 1 },
                { itemName: "Options 2", value: 2 },
                { itemName: "Options 3", value: 3 },
                { itemName: "Options 4", value: 4 },
            ],

            showDelete_cancel_btn: false,
            dropDown_States: [
                { itemName: "Select State", value: "" },
                { itemName: "Andhra Pradesh", value: "Andhra Pradesh" },
                { itemName: "Tamilnadu", value: "Tamilnadu" },
                { itemName: "Telangana", value: "Telangana" },
            ],
            dropDown_districts: [
                { itemName: "Select District", value: "" },
                { itemName: "Guntur ", value: "Guntur" },
                { itemName: "Krishna ", value: "Krishna" },
                { itemName: "Nalgonda", value: "Nalgonda" },
                { itemName: "RangaReddy", value: "RangaReddy" },
            ],
            // Maindata: [],
            Maindata: [{ patient_details_id: "1", patient_first_name: "venkat", patient_last_name: "Padyala", patient_dob: "1995-04-23", gender_name: "Male", patient_mobile_no: "8989898989" },
            { patient_details_id: "2", patient_first_name: "sanath", patient_last_name: "Padyala", patient_dob: "1995-04-23", gender_name: "Male", patient_mobile_no: "8989898989" },
            { patient_details_id: "3", patient_first_name: "vijay", patient_last_name: "Padyala", patient_dob: "1995-04-23", gender_name: "Male", patient_mobile_no: "8989898989" },
            { patient_details_id: "4", patient_first_name: "Rajesh", patient_last_name: "Padyala", patient_dob: "1995-04-23", gender_name: "Male", patient_mobile_no: "8989898989" },
            { patient_details_id: "5", patient_first_name: "Harsha", patient_last_name: "Padyala", patient_dob: "1995-04-23", gender_name: "Male", patient_mobile_no: "8989898989" },
            { patient_details_id: "6", patient_first_name: "Bhavana", patient_last_name: "Padyala", patient_dob: "1995-04-23", gender_name: "Male", patient_mobile_no: "8989898989" }
            ],
            dummyData: [],
            page: 0,
            rowsPerPage: 10,
        }
        this.inputRef = React.createRef()
        // console.warn("++which one first")
    }



    componentDidMount() {
        // alert("hello")
        // this.inputRef.current.focus() 
        this.getAllStates();
    }


    async getAllStates() {
        try {
            const response = await Employee.getallstates();
            if (response.length > 0) {
                this.setState({
                    Maindata: response, dummyData: response, isLoading: false

                })
                console.log(this.state.Maindata, 'patients')
            }
        } catch (e) {
            console.log(e);
        } finally {
            this.setState({
                isLoading: false,
            });
        }
    }
    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({
            rowsPerPage: parseInt(event.target.value, 10),
            page: 0
        });
    };
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
            var ageNum = Common.getNumericValue(value)
            // console.warn("++ageNum", ageNum)
            this.setState({ age: ageNum })
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
            this.setState({ gender_name: value })
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
        if (!this.state.gender_name) {
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

        const patientDetails = {
            // patient_details_id: this.state.patient_details_id,
            patient_number: this.state.patient_number,
            patient_first_visit_date: this.state.patient_first_visit_date,
            patient_first_name: this.state.patient_first_name,
            patient_last_name: this.state.patient_last_name,
            patient_gender_id: this.state.patient_gender_id,
            patient_age: this.state.patient_age,
            patient_dob: this.state.patient_dob,
            patient_tob: this.state.patient_tob,
            patient_birth_place: this.state.patient_birth_place,
            patient_nearest_birth_place: this.state.patient_nearest_birth_place,
            patient_address: this.state.patient_address,
            patient_mobile_no: this.state.patient_mobile_no,
            patient_district: this.state.patient_district,
            patient_state_id: this.state.patient_state_id,
            gender_id: this.state.gender_id,
            // gender_name: this.state.gender_name,
            state_id: this.state.state_id,
            state_name: this.state.state_name,
            country_id: this.state.country_id,
            is_active: this.state.is_active
        }
        console.log(patientDetails, 'patientdetails')
        this.CreateItem(patientDetails)

        this.setState({ isFormView: false });
    }



    async CreateItem(item) {
        // console.log(item);
        try {
            const response = await Employee.insert_patientdetails(item);
            console.log(response);
            toast.success(ValidationMessage.P_added, {
                toastId: "add_success",
            });
        }
        catch (e) {
            console.log(e)
            toast.error(ValidationMessage.p_failed, {
                toastId: "addFail",
            });
        }
        finally {


            this.setState(
                {


                },
                () => {

                    this.getAllStates();

                }
            );
        }

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
            gender_name: '',
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
        var filteredArray = this.state.dummyData.filter(item => {
            return (
                item.patient_details_id.toString().includes(value)
            );
        });
        this.setState({ Maindata: filteredArray, nodataFound: filteredArray.length === 0 })

    }


    handleFilter = (text) => {
        var value = text.target.value.toLowerCase();
        this.setState({ searchValue: value })

        const filteredArray = this.state.dummyData.filter(item => {
            return (
                item.patient_details_id.toString().includes(value) ||
                item.patient_first_name.toLowerCase().includes(value) ||
                item.patient_last_name.toLowerCase().includes(value) ||
                item.patient_dob.toLowerCase().includes(value) ||
                item.gender_name.toLowerCase().includes(value) ||
                item.patient_mobile_no.toLowerCase().includes(value)
            );
        });
        this.setState({ Maindata: filteredArray, nodataFound: filteredArray.length === 0 })
    };

    handleFormView = (item) => {
        this.setState({ isFormView: item, disabledInput: true, disabledInput_part2: true, showDelete_cancel_btn: false })
        this.dataClear()
        if (!item) {
            this.setState({ showUpDate_btn: false })
            return
        }
        if (item) {
            this.setState({ showUpDate_btn: false, showedit_btn: false, showSave_btn: true })
            return
        }
    }

    handleView = (item) => {
        this.setState({ isFormView: true, disabledInput: false, showSave_btn: false, showedit_btn: true, showUpDate_btn: false, showDelete_cancel_btn: true, disabledInput_part2: false }, () => {
            this.setState({
                patientid: (item.patient_details_id != null && item.patient_details_id != undefined) ? item.patient_details_id : "",
                firstName: (item.patient_first_name != null && item.patient_first_name != undefined) ? item.patient_first_name : "",
                lastName: (item.patient_last_name != null && item.patient_last_name != undefined) ? item.patient_last_name : "",
                phoneNumber: (item.patient_mobile_no != null && item.patient_mobile_no != undefined) ? item.patient_mobile_no : "",
                gender: (item.gender_name != null && item.gender_name != undefined) ? item.gender_name : "",
                dateofBirth: (item.patient_dob != null && item.patient_dob != undefined) ? item.patient_dob : ""
            })
        })
        console.warn("++item", item)
    }
    handleDisable() {
        this.setState({ disabledInput: true, showUpDate_btn: true, showedit_btn: false, showDelete_cancel_btn: false })
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
        const { page, rowsPerPage } = this.state;

        return (
            <div className="container">
                <div className="w-100 mt-4 tables-shadow" >
                    <div className="background_color_light_grey shadow_box">
                        {!this.state.isFormView ?
                            <div className="position_relative">
                                <div className="margin_bottom_15 evens-align border_w_2">
                                    <h3 className="info-text">Patient Info</h3>
                                    <Button className="btn handle_content" onClick={() => { this.handleFormView(true) }}><i className="fa fa-plus handle_add_button_color_white  font_size_14_normal" aria-hidden="true"></i>
                                    </Button>
                                    <div className="show_content  p-2 rounded">Add New</div>
                                </div>
                                <TableContainer className="mt-2 mb-4" component={Paper}>
                                    <div className="mt-2 mb-3 width_100 space-between display_flex fliters-sec" >
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
                                            // value={this.state.searchValue}
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
                                                <TableCell className="font_family_serif table_header_text_maroon">D.O.B</TableCell>
                                                <TableCell className="font_family_serif table_header_text_maroon">Gender</TableCell>
                                                <TableCell className="font_family_serif table_header_text_maroon">Phone Number</TableCell>
                                                <TableCell className="font_family_serif table_header_text_maroon">Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.nodataFound ? (
                                                <TableRow>
                                                    <TableCell className="font_family_serif text-center" colSpan={7}>No data found</TableCell>
                                                </TableRow>
                                            ) :
                                                this.state.Maindata.map((row) => (
                                                    <TableRow key={row.patient_details_id}>
                                                        <TableCell className="font_family_serif">{row.patient_details_id}</TableCell>
                                                        <TableCell className="font_family_serif">{row.patient_first_name}</TableCell>
                                                        <TableCell className="font_family_serif">{row.patient_last_name}</TableCell>
                                                        <TableCell className="font_family_serif">{row.patient_dob}</TableCell>
                                                        <TableCell className="font_family_serif">{row.gender_name}</TableCell>
                                                        <TableCell className="font_family_serif">{row.patient_mobile_no}</TableCell>
                                                        <TableCell>
                                                            <Button variant="outlined" className="font_family_serif" onClick={() => { this.handleView(row) }}><i class="fa fa-eye" style={{ color: "blue" }} aria-hidden="true"></i></Button>
                                                            <Button variant="outlined" className="font_family_serif"><i class="fa fa-file-o" style={{ color: "#00d000" }} aria-hidden="true"></i></Button>
                                                            <Button variant="outlined" className="font_family_serif" onClick={() => { this.handleView(row) }}><i class="fa fa-medkit" style={{ color: "orange" }} aria-hidden="true"></i></Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))

                                                // (
                                                //     this.state.Maindata.length === 0 ? (
                                                //         this.state.Maindata.map((row) => (
                                                //             <TableRow key={row.patient_details_id}>
                                                //                 <TableCell className="font_family_serif">{row.patient_details_id}</TableCell>
                                                //                 <TableCell className="font_family_serif">{row.patient_first_name}</TableCell>
                                                //                 <TableCell className="font_family_serif">{row.patient_last_name}</TableCell>
                                                //                 <TableCell className="font_family_serif">{row.patient_dob}</TableCell>
                                                //                 <TableCell className="font_family_serif">{row.gender_name}</TableCell>
                                                //                 <TableCell className="font_family_serif">{row.patient_mobile_no}</TableCell>
                                                //                 <TableCell>
                                                //                     <Button variant="outlined" className="font_family_serif" onClick={() => { this.handleView(row) }}>View</Button>
                                                //                 </TableCell>
                                                //             </TableRow>
                                                //         ))
                                                //     )
                                                //      : (
                                                //         this.state.Maindata.map((row) => (
                                                //             <TableRow key={row.patient_details_id}>
                                                //                 <TableCell className="font_family_serif">{row.patient_details_id}</TableCell>
                                                //                 <TableCell className="font_family_serif">{row.patient_first_name}</TableCell>
                                                //                 <TableCell className="font_family_serif">{row.patient_last_name}</TableCell>
                                                //                 <TableCell className="font_family_serif">{row.patient_dob}</TableCell>
                                                //                 <TableCell className="font_family_serif">{row.gender_name}</TableCell>
                                                //                 <TableCell className="font_family_serif">{row.patient_mobile_no}</TableCell>
                                                //                 <TableCell>
                                                //                     <Button variant="outlined" className="font_family_serif" onClick={() => { this.handleView(row) }}>View</Button>
                                                //                 </TableCell>
                                                //             </TableRow>
                                                //         ))
                                                //     )
                                                // )



                                            }
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TablePagination
                                                    rowsPerPageOptions={[10, 20, 30, { label: 'All', value: -1 }]}
                                                    count={this.state.Maindata.length}
                                                    rowsPerPage={this.state.rowsPerPage}
                                                    page={this.state.page}
                                                    onPageChange={this.handleChangePage}
                                                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                                                    ActionsComponent={TablePaginationActions}
                                                />
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </TableContainer>

                            </div>
                            :
                            <MedicineScreen></MedicineScreen>
                        }
                    </div>
                </div >
            </div>
        );
    }
}
export default withRouter(LoginScreen)


