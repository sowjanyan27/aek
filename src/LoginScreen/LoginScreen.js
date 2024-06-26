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
import FIleUpload from "./FIleUpload";
import Tooltip from "@mui/material/Tooltip";


class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patientid: 0,
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
            isTableView: false,
            isMadicineScreen: false,
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
            file_name: "",
            db_img_path: "",
            menu_ing_name: "",
            showImage: false,
            medicationpatientid: null,
            showDelete_cancel_btn: false,

            dropDown_States: [
                { itemName: "Select State", value: "" },
                { itemName: "Andhra Pradesh", value: "Andhra Pradesh" },
                { itemName: "Tamilnadu", value: "Tamilnadu" },
                { itemName: "Telangana", value: "Telangana" },
            ],

            Maindata: [],
            // Maindata: [{ patient_details_id: "1", patient_first_name: "venkat", patient_last_name: "Padyala", patient_dob: "1995-04-23", gender_name: "Male", patient_mobile_no: "8989898989" },
            // { patient_details_id: "2", patient_first_name: "sanath", patient_last_name: "Padyala", patient_dob: "1995-04-23", gender_name: "Male", patient_mobile_no: "8989898989" },
            // { patient_details_id: "3", patient_first_name: "vijay", patient_last_name: "Padyala", patient_dob: "1995-04-23", gender_name: "Male", patient_mobile_no: "8989898989" },
            // { patient_details_id: "4", patient_first_name: "Rajesh", patient_last_name: "Padyala", patient_dob: "1995-04-23", gender_name: "Male", patient_mobile_no: "8989898989" },
            // { patient_details_id: "5", patient_first_name: "Harsha", patient_last_name: "Padyala", patient_dob: "1995-04-23", gender_name: "Male", patient_mobile_no: "8989898989" },
            // { patient_details_id: "6", patient_first_name: "Bhavana", patient_last_name: "Padyala", patient_dob: "1995-04-23", gender_name: "Male", patient_mobile_no: "8989898989" }
            // ],
            dummyData: [],
            page: 0,
            rowsPerPage: 10,
            fileScreenpatientid: 0,
            patient_attachment_path: "",
            showImage: false,
            is_edit_View: false,
            primary_key: null,
            filteredStates: [],
            allStatedata: []
        }
        this.inputRef = React.createRef()
        this.handlemenuImgchange = this.handlemenuImgchange.bind(this);
        this.fileInputRef = React.createRef();
    }



    componentDidMount() {
        this.getallpatientdetails();
        this.getAllStates()

    }


    async getallpatientdetails() {
        try {
            const response = await Employee.getallpatientdetails();
            // console.log('data get --', response)
            if (response.length > 0) {
                this.setState({
                    Maindata: response, dummyData: response, isLoading: false

                })
                // console.log(this.state.Maindata, 'patients')
            }
        } catch (e) {
            console.log(e);
        } finally {
            this.setState({
                isLoading: false,
            });
        }
    }
    async getPatientbyid(id, typeid) {
        this.setState({ isLoading: true, is_edit_View: true, primary_key: id });
        try {
            const response = await Employee.get_patientdatabyid({ patient_id: id, actionid: typeid });
            // console.log(response, ' getpatientdatabyid --')
            // console.log(response[0].patient_tob, 'time of birth');

            const parseTimeString = (timeString) => {
                let date;
                if (timeString.includes("AM") || timeString.includes("PM")) {
                    // Parse 12-hour format
                    date = new Date("2024-06-03" + timeString);
                } else {
                    // Parse 24-hour format
                    const [hours, minutes] = timeString.split(":");
                    date = new Date();
                    date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
                }
                // Return formatted time in "HH:mm" format
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
            };

            const formattedTimeString = parseTimeString(response[0].patient_tob);
            // console.log(formattedTimeString, "formattedTimeString");

            this.setState({ isFormView: true, isTableView: true, disabledInput: false, showSave_btn: false, showedit_btn: true, showUpDate_btn: false, showDelete_cancel_btn: true, disabledInput_part2: false }, () => {
                this.setState({
                    patientid: response[0].patient_details_id,
                    patientnum: response[0].patient_number,
                    firstName: response[0].patient_first_name,
                    lastName: response[0].patient_last_name,
                    phoneNumber: response[0].patient_mobile_no,
                    gender_name: String(response[0].patient_gender_id),
                    dateofBirth: response[0].patient_dob,
                    birthofPlace: response[0].patient_birth_place,
                    nearestBirthPlace: response[0].patient_nearest_birth_place,
                    age: response[0].patient_age,
                    timeofBirth: formattedTimeString,
                    address: response[0].patient_address,
                    state: response[0].state_name,
                    district: response[0].patient_district,
                    firstVisit: response[0].patient_first_visit_date,
                    file_name: response[0].attachment_name




                })
            })

        } catch (e) {
            console.log(e);
        } finally {
            this.setState({
                isLoading: false,
            });
        }
    }

    async deletepatientdetails(item) {
        try {
            const response = await Employee.delete_patientdetailsbyid(item);
            console.log('data get --', response)
            if (response.length > 0) {
                console.warn("++deleteRes", response)
            }
        } catch (e) {
            console.log("delete_error", JSON.parse(e));
        } finally {
            this.setState({
                isLoading: false,
            });
        }
    }

    formatDate(dateString) {
        // const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        // return new Date(dateString).toLocaleDateString('en-GB', options);
        return Common.formatDate(dateString)
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
            // console.warn("++value", value)
            this.setState({ state: value })
        }
        if (field === Strings.district) {
            this.setState({ district: value })
        }
        if (field === Strings.select_option) {
            this.setState({ dropDownVal: value })
        }
        if (field === Strings.radioButtonVal) {
            // console.warn("++value", value)
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


    saveToServer() {
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


        const patientDetails = {
            patientid: this.state.showSave_btn ? Number(0) : this.state.patientid,
            patient_num: this.state.patientnum,
            first_visitdate: this.state.firstVisit,
            p_first_name: this.state.firstName,
            p_last_name: this.state.lastName,
            p_gender: Number(1),
            p_age: Number(this.state.age),
            p_dob: this.state.dateofBirth,
            p_tob: this.state.timeofBirth,
            p_birthplace: this.state.birthofPlace,
            pn_birthplace: this.state.nearestBirthPlace,
            p_address: this.state.address,
            p_mobileno: Number(this.state.phoneNumber),
            p_district: this.state.district || '',
            p_stateid: Number(this.state.state),
            attachment: this.state.db_img_path,
            created_by: 2,
            created_date: '2024-05-10',
            branch_id: 1
        }

        // console.log('-----patientdetails----', patientDetails)
        // alert(patientDetails.patientid)
        // return
        this.CreateItem(patientDetails)

        // this.setState({ isFormView: false });
    }



    async CreateItem(item) {
        try {
            const response = await Employee.insert_patientdetails(item);
            console.log(response);

            toast.success((this.state.showSave_btn ? ValidationMessage.P_added : ValidationMessage.p_updated), {
                toastId: "Patientdetails",
            });
            this.setState({ isTableView: false, isFormView: false }, () => {
                this.getallpatientdetails();
            });

        } catch (e) {
            console.log(e);
            toast.error(ValidationMessage.p_failed, {
                toastId: "addFail",
            });

            // Set state to maintain form view on failure
            this.setState({ isTableView: false, isFormView: true });
        }
    }

    dataClear() {
        this.setState({
            patientid: 0,
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
                item.patient_mobile_no.toString().includes(value)
            );
        });
        this.setState({ Maindata: filteredArray, nodataFound: filteredArray.length === 0 })
    };


    handleAdd_btn = (item) => {
        this.setState({ isTableView: item, isFormView: item, disabledInput: true, disabledInput_part2: true, showDelete_cancel_btn: false, is_edit_View: false, showUpDate_btn: false, showedit_btn: false, showSave_btn: true })
        this.dataClear()
    }

    async getAllStates() {
        try {
            const response = await Employee.getallstates({ country_id: 1 });
            // console.log(' getstates --', response)
            if (response.length > 0) {
                this.setState({
                    allStatedata: response
                }, () => {
                    // console.log('Statedata', this.state.allStatedata);
                    const filteredarray = this.state.allStatedata.map(({ state_id, state_name }) => ({ state_id, state_name }));
                    this.setState({ filteredStates: filteredarray }, () => {
                        // console.log('filteredStates', this.state.filteredStates);
                    });
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

    handleDelete_btn = () => {
        try {
            var patient_id = this.state.primary_key
            var res = this.deletepatientdetails({ "patientid": patient_id })
            toast.success("Deleted Successfully...", {
                toastId: 'Deletion',
                onClose: () => {
                    this.setState({ isTableView: false, isFormView: false, disabledInput: true, disabledInput_part2: true, showDelete_cancel_btn: false, is_edit_View: false, showUpDate_btn: false })
                    this.dataClear()
                    this.getallpatientdetails();
                    this.getAllStates()
                }
            });

            // this.setState({ isTableView: false, isFormView: false, disabledInput: true, disabledInput_part2: true, showDelete_cancel_btn: false, is_edit_View: false, showUpDate_btn: false })
            // this.dataClear()
            // this.getallpatientdetails();
            // this.getAllStates()

        }
        catch (e) {
            console.error(e)
        }
        // var patient_id = this.state.primary_key
        // var res = this.deletepatientdetails({ "patientid": patient_id })
        // console.warn("++res", res)
        // if (res) {

        // }
        this.setState({ isTableView: false, isFormView: false, disabledInput: true, disabledInput_part2: true, showDelete_cancel_btn: false, is_edit_View: false, showUpDate_btn: false })
        this.dataClear()
    }

    handleFormView = (item) => {
        this.setState({ isTableView: item, isFormView: item, disabledInput: true, disabledInput_part2: true, showDelete_cancel_btn: false, is_edit_View: false })
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

    handleDisable() {
        this.setState({ disabledInput: true, showUpDate_btn: true, showedit_btn: false, showDelete_cancel_btn: false })
    }

    handleEditedValues() {
        toast.success("Updated Successfully...", {
            toastId: 'updation',
            onClose: () => {
                this.setState({ isFormView: false, isTableView: false });
                // this.dataClear()
            }
        });
    }

    handleCancel_btn() {
        this.getallpatientdetails()
        // this.handleFormView(false)
        this.setState({ isTableView: false, isFormView: false, disabledInput: true, disabledInput_part2: true, showDelete_cancel_btn: false, is_edit_View: false, showUpDate_btn: false })
        this.dataClear()
    }
    onSubmit = () => {
        alert("hi")
    }
    handleMedicinePage(item) {
        this.setState({ isTableView: true, isMadicineScreen: true, medicationpatientid: item })
    }
    handleFileScreen = (data) => {
        // this.setState({ patient_attachment_name: data.attachment_name })
        // var rowData = { ...this.state.fileuploadScreenrow, data }
        this.setState({ isTableView: true, fileScreenView: true, fileScreenpatientid: data }, () => {
            // console.log(this.state.fileScreenData,'filedata')
        })
        // this.setState({selectedPatient:data}) 
    }

    closeMedicineScreen = () => {
        this.setState({ isMadicineScreen: false, isTableView: false })
    }
    closeFileScreen = () => {
        this.setState({ isTableView: false, fileScreenView: false, isFormView: false, isMadicineScreen: false })
    }

    // file upload starts
    handlemenuImgchange = (event) => {
        event.preventDefault();
        this.setState({
            db_img_path: ""
        });

        const file = event.target.files[0];
        const fileExtension = file.name.split('.').pop().toLowerCase();

        if (fileExtension !== 'pdf') {
            toast.warn('Please select a PDF file.', {
                toastId: 'invalid_file_format',
            });
            return;
        }
        const sanitizedFileName = file.name.replace(/\s+/g, '_');
        this.setState(
            {
                db_img_path: sanitizedFileName,
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
    // file upload ends

    render() {
        const { page, rowsPerPage } = this.state;

        return (
            <div className="container">
                <div>
                    <div>
                        {!this.state.isTableView &&

                            <div className="position_relative">
                                <div className="margin_bottom_15 evens-align mt-4">
                                    <h3 className="info-text">Patient Info</h3>
                                    <Tooltip title="Add Patient Details">
                                        <Button className="btn handle_content" onClick={() => { this.handleAdd_btn(true) }}><i className="fa fa-plus handle_add_button_color_white  font_size_14_normal" aria-hidden="true"></i>
                                        </Button>
                                    </Tooltip>
                                    <div className="show_content  p-2 rounded">Add New</div>
                                </div>
                                <div className="w-100 mt-2 mb-4 tables-shadow">
                                    <div className="background_color_light_grey shadow_box">
                                        <TableContainer className="mt-2" component={Paper}>
                                            <div className="mt-2 mb-3 width_100 space-between display_flex fliters-sec" >
                                                {/* <input
                                                    ref={this.inputRef}
                                                    className=""
                                                    type="text"
                                                    value={this.state.searchId}
                                                    onChange={(text) => { this.handleFilterId(text) }} // Changed parameter to e.target.value
                                                    placeholder="Search Id"
                                                /> */}
                                                <input
                                                    className=""
                                                    style={{ width: "200px", marginTop: "10px" }}
                                                    value={this.state.searchValue}
                                                    onChange={(text) => { this.handleFilter(text) }} // Changed parameter to e.target.value
                                                    placeholder="Search by patient details..."
                                                />
                                                <div className="p_tag_align">
                                                    <TablePagination
                                                        rowsPerPageOptions={[10, 20, 30, { label: 'All', value: -1 }]}
                                                        count={this.state.Maindata.length}
                                                        rowsPerPage={this.state.rowsPerPage}
                                                        page={this.state.page}
                                                        onPageChange={this.handleChangePage}
                                                        onRowsPerPageChange={this.handleChangeRowsPerPage}
                                                        ActionsComponent={TablePaginationActions}
                                                    />
                                                </div>
                                            </div>
                                            <Table className="table table-bordered align_p_tag">
                                                <TableHead className="table_header_light_grey">
                                                    <TableRow>
                                                        <TableCell className="font_family_serif table_header_text_maroon"> Patient Code</TableCell>
                                                        <TableCell className="font_family_serif table_header_text_maroon">First Name</TableCell>
                                                        <TableCell className="font_family_serif table_header_text_maroon">Last Name</TableCell>
                                                        <TableCell className="font_family_serif table_header_text_maroon">D.O.B</TableCell>
                                                        <TableCell className="font_family_serif table_header_text_maroon">Gender</TableCell>
                                                        <TableCell className="font_family_serif table_header_text_maroon">Phone Number</TableCell>
                                                        <TableCell className="font_family_serif table_header_text_maroon text_align_center">Action</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {(this.state.rowsPerPage > 0
                                                        ? this.state.Maindata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        : this.state.Maindata
                                                    ).map((row) => (
                                                        <TableRow key={row.patient_details_id}>
                                                            <TableCell className="font_family_serif">{row.patient_number}</TableCell>
                                                            <TableCell className="font_family_serif">{row.patient_first_name}</TableCell>
                                                            <TableCell className="font_family_serif">{row.patient_last_name}</TableCell>
                                                            <TableCell className="font_family_serif">{this.formatDate(row.patient_dob)}</TableCell>
                                                            <TableCell className="font_family_serif">{row.gender_name}</TableCell>
                                                            <TableCell className="font_family_serif">{row.patient_mobile_no}</TableCell>
                                                            <TableCell className="text_align_center">
                                                                <Tooltip title="View" arrow>
                                                                    <Button variant="outlined" className="font_family_serif" onClick={() => { this.getPatientbyid(row.patient_details_id, 1) }}><i className="fa fa-eye" style={{ color: "blue" }} aria-hidden="true"></i></Button>
                                                                </Tooltip>
                                                                <Tooltip title="File" arrow>
                                                                    <Button variant="outlined" className="font_family_serif" onClick={() => { this.handleFileScreen(row.patient_details_id) }}><i className="fa fa-file-o" style={{ color: row.attachment_name ? "#00d000" : 'red' }} aria-hidden="true"></i></Button>
                                                                </Tooltip>
                                                                <Tooltip title="Medication" arrow>
                                                                    <Button variant="outlined" className="font_family_serif" onClick={() => { this.handleMedicinePage(row.patient_details_id) }}><i className="fa fa-medkit" style={{ color: "orange" }} aria-hidden="true"></i></Button>
                                                                </Tooltip>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
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
                                </div>
                            </div>
                        }

                        {this.state.isFormView &&
                            <div className="w-100 mt-4 mb-4 tables-shadow">
                                <div>
                                    {/* <div className="margin_bottom_15 evens-align mt-4 position-relative">
                                        <h3 className="info-text">{Strings.patientdetails}</h3>
                                        <span style={{ color: "blue", fontWeight: 600 }}>Case Sheet id:- <span style={{ color: "black" }}>KHD - 135-F</span></span>
                                        <div className="top-right-icons">
                                            <Tooltip title="Back" arrow>
                                                <span onClick={() => { this.handleCancel_btn() }}>
                                                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                                                </span>
                                            </Tooltip>
                                        </div>
                                    </div> */}
                                    <div className="margin_bottom_15 evens-align  mt-4 position-relative">
                                        <h3 className="info-text">{Strings.patientdetails}</h3>
                                        {this.state.is_edit_View &&
                                            <span style={{ color: "blue", fontWeight: 600 }}>Case Sheet No:- <span style={{ color: "black" }}>KHD - {this.state.patientnum}</span></span>
                                        }
                                        <div className="">
                                            <Tooltip title="Back" arrow>
                                                <span onClick={() => { this.handleCancel_btn() }}>
                                                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                                                </span>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                                <div className="background_color_light_grey shadow_box">
                                    <form>
                                        <div className="w-75 me-auto ms-auto">
                                            <div className="row">
                                                {!this.state.is_edit_View &&
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                                        <div className="form-group text_align_left" >
                                                            <label htmlFor="Casesheetnum" className="label_texts mar_b_8">{Strings.case_sheet_num} <span className="logo_color_red"> *</span></label>
                                                            <input required type="text" disabled={!this.state.disabledInput_part2} onChange={(text) => this.handleSelectedData(text, Strings.patient_num)} className="form-control input_hight_45" id="patientId" value={this.state.patientnum} placeholder={Strings.patient_num} />
                                                            {this.state.showpatientNumview && <span className="" style={{ color: "red", fontSize: 12 }}>{Strings.please_enter_value}</span>}

                                                        </div>
                                                    </div>
                                                }
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                                    <div className="form-group text_align_left" >
                                                        <label htmlFor="firstName" className="label_texts mar_b_8">  {Strings.first_name} <span className="logo_color_red"> *</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            required
                                                            disabled={!this.state.disabledInput_part2}
                                                            onChange={(text) => { this.handleSelectedData(text, Strings.first_name) }}
                                                            className="form-control input_hight_45"
                                                            id="firstName"
                                                            value={this.state.firstName}
                                                            placeholder={Strings.first_name}
                                                        />
                                                        {this.state.showpatientFirstnameview && <span className="" style={{ color: "red", fontSize: 12 }}>{Strings.please_enter_value}</span>}

                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20  ">
                                                    <div className="form-group text_align_left" >
                                                        <label htmlFor="lastName" className="label_texts mar_b_8"> {Strings.last_name} <span className="logo_color_red"> *</span></label>
                                                        <input required type="text" disabled={!this.state.disabledInput_part2} onChange={(text) => { this.handleSelectedData(text, Strings.last_name) }} className="form-control input_hight_45" id="lastName" value={this.state.lastName} placeholder={Strings.last_name} />
                                                        {this.state.showpatientLastnameview && <span className="" style={{ color: "red", fontSize: 12 }}>{Strings.please_enter_value}</span>}
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 " style={{ alignContent: "center" }}>
                                                    <div className="form-group text_align_left marginTop_20" >
                                                        <label className="me-2 label_texts">Gender: <span className="logo_color_red"> *</span></label>
                                                        <div></div>
                                                        <div className="form-check form-check-inline">
                                                            <input required disabled={!this.state.disabledInput} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={"1"} checked={this.state.gender_name === "1"} onChange={(text) => { this.handleSelectedData(text, Strings.radioButtonVal) }} />
                                                            <label className="form-check-label" for="inlineRadio1">{Strings.male}</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input required disabled={!this.state.disabledInput} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={"2"} checked={this.state.gender_name === "2"} onChange={(text) => { this.handleSelectedData(text, Strings.radioButtonVal) }} />
                                                            <label className="form-check-label" for="inlineRadio2">{Strings.female}</label>
                                                        </div>
                                                        {this.state.showgenderSelectionview && <span className="" style={{ color: "red", fontSize: 12 }}>{Strings.please_select_one}</span>}
                                                    </div>
                                                </div>

                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                                    <div className="row">
                                                        <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-2">
                                                            <div className="form-group text_align_left" >
                                                                <label htmlFor="Age" className="label_texts mar_b_8"> {Strings.enter_age} <span className="logo_color_red"> *</span></label>
                                                                <input required type="text" maxLength="3" disabled={!this.state.disabledInput} onChange={(text) => { this.handleSelectedData(text, Strings.enter_age) }} className="form-control input_hight_45" id="age" value={this.state.age} placeholder={Strings.enter_age} />
                                                                {this.state.showageview && <span className="" style={{ color: "red", fontSize: 12 }}>{Strings.please_enter_value}</span>}
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5">
                                                            <div className="form-group text_align_left" >
                                                                <label htmlFor="BirthDate" className="label_texts mar_b_8"> {Strings.birth_Date} <span className="logo_color_red"> *</span></label>
                                                                <input required type="date" disabled={!this.state.disabledInput} onChange={(text) => { this.handleSelectedData(text, Strings.birth_Date) }} className="form-control input_hight_45 handle_padding_text_input-birthdat" id="firstName" value={this.state.dateofBirth} />
                                                                {this.state.showBirtDateview && <span className="" style={{ color: "red", fontSize: 12 }}>{Strings.please_enter_value}</span>}

                                                            </div>
                                                        </div>
                                                        <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5">
                                                            <div className="form-group text_align_left" >
                                                                <label htmlFor="BirthTime" className="label_texts mar_b_8">{Strings.birth_time} <span className="logo_color_red"> *</span></label>
                                                                <input required type="time" disabled={!this.state.disabledInput} onChange={(text) => this.handleSelectedData(text, Strings.birth_time)} className="form-control input_hight_45 " value={this.state.timeofBirth} id="birthTime" />
                                                                {this.state.showBirthTimeview && <span className="" style={{ color: "red", fontSize: 12 }}>{Strings.please_enter_value}</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                                    <div className="form-group text_align_left" >
                                                        <label htmlFor="Address" className="label_texts mar_b_8">{Strings.address}</label>
                                                        <textarea rows={3} cols={40} disabled={!this.state.disabledInput} className="form-control" onChange={(text) => { this.handleSelectedData(text, Strings.address) }} value={this.state.address} placeholder={Strings.address} />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                                    <div className="form-group text_align_left" >
                                                        <label htmlFor="BirthPlace" className="label_texts mar_b_8">{Strings.birth_place}</label>
                                                        <input type="text" disabled={!this.state.disabledInput} onChange={(text) => { this.handleSelectedData(text, Strings.birth_place) }} className="form-control input_hight_45" id="birth_place" value={this.state.birthofPlace} placeholder={Strings.birth_place} />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                                    <div className="form-group text_align_left" >
                                                        <label htmlFor="NearBirthPlace" className="label_texts mar_b_8">{Strings.nearest_birth_place}</label>
                                                        <input type="text" disabled={!this.state.disabledInput} onChange={(text) => this.handleSelectedData(text, Strings.nearest_birth_place)} className="form-control input_hight_45" id="near_area" value={this.state.nearestBirthPlace} placeholder={Strings.nearest_birth_place} />
                                                    </div>
                                                </div>


                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20">
                                                    <div className="form-group text_align_left" >
                                                        <label htmlFor="selectOption" className="label_texts mar_b_8"> {Strings.state} </label>
                                                        <select disabled={!this.state.disabledInput} className="form-select input_hight_45" id="state" onChange={(text) => this.handleSelectedData(text, Strings.state)} value={this.state.state} placeholder={Strings.state} >
                                                            <option className="" value={""}>{Strings.select_state}</option>
                                                            {this.state.filteredStates.map(item => {
                                                                return (
                                                                    <option className="" value={item.state_id}>{item.state_name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20 ">
                                                    <div className="form-group text_align_left" >
                                                        <label htmlFor="District" className="label_texts mar_b_8">{Strings.district}</label>
                                                        <input type="text" disabled={!this.state.disabledInput} onChange={(text) => this.handleSelectedData(text, Strings.district)} className="form-control input_hight_45" id="district" value={this.state.district} placeholder={Strings.district} />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20  margin_bottom_25">
                                                    <div className="form-group t{ext_align_left" >
                                                        <label htmlFor="firstVisit" className="label_texts mar_b_8">{Strings.first_visit}</label>
                                                        <input type="date" disabled={!this.state.disabledInput} onChange={(text) => { this.handleSelectedData(text, Strings.first_visit) }} className="form-control input_hight_45" id="firstVisit" value={this.state.firstVisit} placeholder={Strings.first_visit} />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 marginTop_20 margin_bottom_25 ">
                                                    <div className="form-group text_align_left" >
                                                        <label htmlFor="phNum" className="label_texts mar_b_8">{Strings.ph_num}</label>
                                                        <input type="text" maxLength={10} pattern="6[0-9]{9}" disabled={!this.state.disabledInput} onChange={(text) => this.handleSelectedData(text, Strings.ph_num)} className="form-control input_hight_45" id="phNum" value={this.state.phoneNumber} placeholder={Strings.ph_num} />
                                                    </div>
                                                </div>



                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 marginTop_20 margin_bottom_25">
                                                    <div className="form-group text_align_left">
                                                        <label htmlFor="fileInput" className="label_texts mar_b_8">
                                                            {Strings.upload_file}
                                                        </label>
                                                        <input
                                                            type="file"
                                                            className="form-control input_hight_38"
                                                            id="fileInput"
                                                            name="objection_letter"
                                                            onChange={this.handlemenuImgchange}
                                                            onClick={(event) => {
                                                                event.target.value = null;
                                                            }}
                                                            ref={this.fileInputRef}
                                                        />
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="width_100 text-end save_btn_margin_bottom_15 ">

                                                {/* <Button onClick={() => { this.handleCancel_btn() }} className="btn btn-secondary padding_horizental_35 margin_right_10 font_family_serif">{Strings.cancel}</Button> */}
                                                {this.state.showedit_btn &&
                                                    <div className="d-inline-block">
                                                        <Button onClick={() => this.handleDisable()} className="btn btn-info me-2  font_family_serif"> {Strings.edit}</Button>
                                                    </div>
                                                }
                                                {this.state.showUpDate_btn &&
                                                    <div>
                                                        <Button onClick={() => { this.handleCancel_btn() }} className="btn btn-secondary padding_horizental_35 margin_right_10 font_family_serif">{Strings.cancel}</Button>
                                                        <Button onClick={() => this.saveToServer()} className="btn btn-success padding_horizental_35 font_family_serif">{Strings.update}</Button>
                                                    </div>
                                                }
                                                {this.state.showDelete_cancel_btn &&
                                                    <div className="d-inline-block">
                                                        <Button onClick={() => { this.handleCancel_btn() }} className="btn btn-secondary padding_horizental_35 margin_right_10 font_family_serif">{Strings.cancel}</Button>
                                                        <Button onClick={() => this.handleDelete_btn(false)} className="btn btn-danger padding_horizental_35 font_family_serif">{Strings.delete}</Button>
                                                    </div>
                                                }
                                                {this.state.showSave_btn &&
                                                    <div>
                                                        <Button onClick={() => { this.handleCancel_btn() }} className="btn btn-secondary padding_horizental_35 margin_right_10 font_family_serif">{Strings.cancel}</Button>
                                                        <Button onClick={() => this.saveToServer()} className="btn btn-success padding_horizental_35 font_family_serif">{Strings.save}</Button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </form >
                                </div>
                            </div>

                        }

                        {this.state.isMadicineScreen &&
                            // <BoostModal></BoostModal>
                            <MedicineScreen closeMedicineScreen={this.closeMedicineScreen} medicationpatientid={this.state.medicationpatientid}></MedicineScreen>

                        }
                        {this.state.fileScreenView &&
                            <FIleUpload fileScreenData={this.state.fileScreenpatientid} closescreen={this.closeFileScreen} />
                        }
                    </div>
                </div >
            </div>
        );
    }
}
export default withRouter(LoginScreen)


