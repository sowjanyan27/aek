import React, { Component } from "react";
import { Employee } from "../api/Employee";
import { Button } from "react-bootstrap";
import { Strings } from "../strings/Strings";
import { toast } from "react-toastify";
import { ValidationMessage } from "../helpers/ValidationMessage";
import { Common } from "../helpers/common";
// import { Tooltip } from "@mui/material/Tooltip";
import Tooltip from "@mui/material/Tooltip";


export default class MedicineScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            MainMadicationdata: [],
            dummyMainMadicationdata: [],
            activeTab: "",
            filterData: "",
            filterdArray: [],
            medicineNames: [],
            master_medincine_potencies_name: [],
            selcted_master_name: "",
            seletedMedicine: "",
            selectedDosage: "",
            selected_medicine_master_id: null,
            usage_time: "",
            selected_potencies_type_id: null,
            dosage: 1,
            selected_medicine_type_index: null, // Selected medicinetype index  Ex:- main, mothertincher ...
            selected_medicine_type_Id: null, // Selected medicinetype index  Ex:- {main = 1, mothertincher = 2 ...
            medicationlistjson: [], // medicie list with id's
            spe_instruct: "",
            next_med: "",
            patient_ailment: "",
            patient_medicalreports: "",
            Medicationdata: null,  // patient id from home scree
            Mainpaitentdetails: [], // backup response data
            dummyMainpaitentdetails: [], // respose ubdating array
            medication_patient_details: [{  // patient details dummy array
                attachment_name: "",
                branch_id: null,
                created_by: null,
                created_date: null,
                gender_name: "",
                is_active: true,
                patient_address: "",
                patient_age: null,
                patient_birth_place: "",
                patient_details_id: null,
                patient_district: "",
                patient_dob: "",
                patient_first_name: "",
                patient_first_visit_date: "",
                patient_gender_id: null,
                patient_last_name: "",
                patient_mobile_no: null,
                patient_nearest_birth_place: "",
                patient_number: null,
                patient_state_id: null,
                patient_tob: '',
            }],
            medication_details: [], // extracting medication details from the response ,
            selected_medicine_names: [], // names array for showing
            potencies_type_name: "", // selected medicine name
            master_index: null, // Selected potencial index EX:- 1c, 2c, lc,
            isShoweye_btn: false,
            master_idex: null,
            consume_dose_timings: [{ timing: "M", value: "Morning" },
            { timing: "A", value: "Afternoon" },
            { timing: "E", value: "Evening" },
            { timing: "N", value: "Night" }
            ],
            selectedTimings: [],
            data_for_modal: []
        }
    }

    componentDidMount() {
        var patient_id = this.props.medicationpatientid
        if (patient_id) {
            this.setState({ Medicationdata: patient_id }, () => {
                this.getpatientdetailsbyid()
            })
        }
    }

    async getpatientdetailsbyid() {
        const obj = {
            "patient_id": this.state.Medicationdata,
            "actionid": 3
        }
        // console.warn("++obj", obj)
        try {
            const response = await Employee.get_patientdatabyid(obj);
            if (response.length > 0) {
                console.warn("++main_res_medi", response)
                var medication_patient_details = response[0].patients_details
                // console.warn("++medication_patient_details", medication_patient_details)
                var medicationdetails = response[0].medicationdetails
                // console.warn("++medicationdetails", medicationdetails)
                this.setState({
                    Mainpaitentdetails: response, dummyMainpaitentdetails: response, medication_patient_details: medication_patient_details, medication_details: medicationdetails, isLoading: false
                }, () => {
                    // console.warn('medication_details', this.state.medication_details)
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

    async getmedaticationdetails() {
        try {
            const response = await Employee.getmedaticationdetails();
            if (response.length > 0) {
                // console.warn("++response_binding", response)
                var medicine_type = response[0].medicinetype
                this.setState({
                    medicineNames: medicine_type,
                    dummyMainMadicationdata: response, isLoading: false
                }, () => {
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

    setActiveTab = (tabName) => {
        this.setState({ activeTab: tabName });
    };
    closeMedicineScreen = () => {
        this.props.closeMedicineScreen()
    }

    filterMedicen = (text) => {
        if (this.state.selected_medicine_type_index === null) {
            alert("Select Medicine type")
            return
        }
        var data = text;
        this.setState({ filterData: data })
        if (data != "") {
            var array = this.state.dummyMainMadicationdata[0].medicine.filter(item =>
                item.medicine_master_name.toLowerCase().includes(data))

            if (array) {
                this.setState({ filterdArray: array })
            }
        }
        else {
            this.setState({ filterdArray: [] })
        }
    }

    enterDose = (text) => {
        var days = Common.getNumericValue(text)
        this.setState({ dosage: days })
    }

    savetoStateLevel = () => {
        var names_list = {
            selected_medicine_name: this.state.selcted_master_name,
            selected_dosage: this.state.dosage,
            // potencies_type: this.state.potencies_type,
            potencies_type_name: this.state.potencies_type_name
        }

        var obj = {
            medicineid: this.state.selected_medicine_master_id,  // medicine id
            potenciesid: this.state.selected_potencies_type_id, //
            med_dosage: this.state.dosage, // dosage 
            med_consume_time: this.state.selectedTimings.join(",") // consume time
        }
        console.warn("++names_list", names_list)
        console.warn("++obj", obj)
        var names_array = [...this.state.selected_medicine_names, names_list]
        var medication_obj = [...this.state.medicationlistjson, obj]
        this.setState({ medicationlistjson: medication_obj, selected_medicine_names: names_array, selectedTimings: [] }, () => {
            console.warn("++Medidcine_list", this.state.medicationlistjson)
            this.setState({
                filterData: "", usage_time: "", dosage: 1, potenciesid: null, medicineid: null, filterdArray: [], selcted_master_name: '', selected_medicine_names: names_array, selected_medicine_name: "", potencies_type: "",
                potencies_type_name: "", master_idex: null
            })
        })
    }

    submitMadicationdata() {
        const final_obj = {
            patient_id: this.state.Medicationdata,
            doctor_id: 3,
            spe_instruct: this.state.spe_instruct,
            next_med: this.state.next_med,
            patient_ailment: this.state.patient_ailment,
            patient_medicalreports: this.state.patient_medicalreports,
            medicationlistjson: this.state.medicationlistjson,
            createdby: 1,
            consult_date: new Date().toJSON().slice(0, 10)
        }
        console.warn("++final_obj", final_obj)
        this.setState({ medicationlistjson: [], selected_medicine_names: [], patient_ailment: "", patient_medicalreports: "", next_med: "", spe_instruct: "" })

        this.CreateMadication(final_obj)


    }
    async CreateMadication(item) {
        try {
            const response = await Employee.insertmedicationdetails(item);
            // console.log(response);
            toast.success(ValidationMessage.m_added, {
                toastId: "add_success",
                onClose: this.backToMain()
            });
        }
        catch (e) {
            console.log(e)
            toast.error(ValidationMessage.p_failed, {
                toastId: "addFail",
            });
        }
        finally {
            this.setState({},
                () => {

                    // this.getAllStates();
                }
            );
        }
    }

    handleSCreen = () => {
        this.setState({})
    }



    backToMain() {
        this.props.closeMedicineScreen()
    }

    handleHide_show = () => {
        this.setState({ isShowMedicine: true, activeTab: Strings.purpose, isShoweye_btn: true })
    }
    handleHide = () => {
        this.setState({ isShowMedicine: false, activeTab: "", isShoweye_btn: false })
    }



    set_sub_ActiveTab = (tabs) => {
        alert(tabs)
    }

    handleTabs = (selectedItem, index) => {
        var master_medi_potencies_type = this.state.dummyMainMadicationdata[0].potenciestype.filter(item => {
            return item.medicine_type_id === selectedItem;
        });

        this.setState({ master_medincine_potencies_name: master_medi_potencies_type, selected_medicine_type_index: index, master_idex: null, filterData: "" }, () => {
            console.warn("++master_medincine_potencies_name", this.state.master_medincine_potencies_name)
            this.setState({ med_consume_time: "", med_dosage: 1, dosage: 1, potenciesid: null, medicineid: null })
        })
    }
    handleClick = () => {
        this.setState({ isRightBranchHidden: !this.state.isRightBranchHidden });
    }

    handleDelete = (index) => {
        var selected_array = [...this.state.selected_medicine_names];
        var final_array = [...this.state.medicationlistjson];
        selected_array.splice(index, 1);
        final_array.splice(index, 1);

        this.setState({
            selected_medicine_names: selected_array,
            medicationlistjson: final_array
        });

    }
    handleSelectionTimings = (timing) => {
        this.setState(prevState => {
            const { selectedTimings } = prevState;
            const selectedTimingValue = this.state.consume_dose_timings.find(t => t.timing === timing).value;

            if (selectedTimings.includes(selectedTimingValue)) {
                // If already selected, remove it
                return { selectedTimings: selectedTimings.filter(t => t !== selectedTimingValue) };
            } else {
                // If not selected, add it
                return { selectedTimings: [...selectedTimings, selectedTimingValue] };
            }
        }
            // , () => { console.warn("++res", this.state.selectedTimings) }
        );
    }
    handleSelecionMedicines(item) {

        this.setState({ selcted_master_name: item.medicine_master_name, filterData: item.medicine_master_name, filterdArray: [], selected_medicine_master_id: item.medicine_master_id });
    }

    handle_modal_view = (item) => {
        this.setState({ data_for_modal: [] }, () => {
            var array = [...this.state.data_for_modal, item]
            this.setState({ data_for_modal: array }, () => {
                console.warn("++chcking", this.state.data_for_modal)
            })
        })

    }

    render() {
        return (
            <div>
                <div>
                    <div className="margin_bottom_15 evens-align mt-4 position-relative">
                        <h3 className="info-text">Patient Info</h3>
                        <div className="top-right-icons">
                            <span onClick={() => { { this.backToMain() } }}>
                                <i className="fa fa-arrow-left" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-100 mt-4 mb-4 tables-shadow">
                    <div className="background_color_light_grey shadow_box">
                        <div className="user_list pt-2 pb-3">
                            <div className="container-fluid">
                                {!this.state.isShowMedicine ?
                                    <div>
                                        {this.state.medication_patient_details && this.state.medication_patient_details.map((detailes, index) => (
                                            < div className="row">
                                                <div className="col-md-4 padding-tp-10">
                                                    <div className="row">
                                                        <div className="col-6 position-relative">
                                                            <div className="general-detailes-text label-column">
                                                                <p>First Name</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <span className="span-custom">{detailes.patient_first_name}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 padding-tp-10">
                                                    <div className="row">
                                                        <div className="col-6 position-relative">
                                                            <div className="general-detailes-text label-column">
                                                                <p>Last Name</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <span className="span-custom">{detailes.patient_last_name}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 padding-tp-10">
                                                    <div className="row">
                                                        <div className="col-6 position-relative">
                                                            <div className="general-detailes-text label-column">
                                                                <p>D.O.B</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <span className="span-custom"> {Common.formatDate(detailes.patient_dob)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 padding-tp-10">
                                                    <div className="row">
                                                        <div className="col-6 position-relative">
                                                            <div className="general-detailes-text label-column">
                                                                <p>Gender</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <span className="span-custom">{detailes.gender_name}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 padding-tp-10">
                                                    <div className="row">
                                                        <div className="col-6 position-relative">
                                                            <div className="general-detailes-text label-column">
                                                                <p>Phone Number</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <span className="span-custom">{detailes.patient_mobile_no} </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 padding-tp-10">
                                                    <div className="row">
                                                        <div className="col-6 position-relative">
                                                            <div className="general-detailes-text label-column">
                                                                <p>Patient Id</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <span className="span-custom">{detailes.patient_details_id} </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    :
                                    <div>
                                        {this.state.medication_patient_details && this.state.medication_patient_details.map((detailes) => (
                                            <div className="row" >
                                                <div className="col-md-4 padding-tp-10">
                                                    <div className="row">
                                                        <div className="col-6 position-relative">
                                                            <div className="general-detailes-text label-column">
                                                                <p> Name</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <span className="span-custom">{detailes.patient_first_name} {detailes.patient_last_name}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 padding-tp-10">
                                                    <div className="row">
                                                        <div className="col-6 position-relative">
                                                            <div className="general-detailes-text label-column">
                                                                <p>First Visit Date</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <span className="span-custom">{Common.formatDate(detailes.patient_first_visit_date)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 padding-tp-10">
                                                    <div className="row">
                                                        <div className="col-6 position-relative">
                                                            <div className="general-detailes-text label-column">
                                                                <p>Patient Id</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <span className="span-custom">{detailes.patient_details_id}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                }

                                <div style={{ textAlign: "end" }}>
                                    {!this.state.isShowMedicine &&
                                        <Tooltip title="Add Medicine" arrow>
                                            <Button className="btn btn-success me-3"
                                                data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" id="clicksButton"
                                                onClick={() => { this.handleHide_show(); this.getmedaticationdetails() }}
                                            >
                                                <i className="fa fa-plus" aria-hidden="true"></i>
                                            </Button>
                                        </Tooltip>
                                    }
                                    {this.state.isShowMedicine &&
                                        <Tooltip title="Show all medication">
                                            <Button className="btn btn-success me-3"
                                                onClick={() => { this.handleHide() }}
                                            >
                                                <i class="fa fa-minus" aria-hidden="true"></i>
                                            </Button>
                                        </Tooltip>
                                    }
                                    {/* <Button className="btn btn-success me-3" onClick={() => { this.handleClick() }} id="clicksButton">
                                        <i className="fa fa-expand" aria-hidden="true"></i>
                                    </Button> */}
                                    {this.state.isShoweye_btn &&
                                        <Tooltip title="Show previous medicine" arrow>
                                            <Button className="btn btn-success"
                                                data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" id="clicksButton">
                                                <i className="fa fa-eye" aria-hidden="true"></i>
                                            </Button>
                                        </Tooltip>
                                    }

                                </div>
                                {this.state.isRightBranchHidden &&
                                    <div className="text-end mt-3 mb-4 position-relative">
                                        <span onClick={() => { this.handleClick() }} className="sidelabel_view">Case Sheet</span>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="side_panel">
                            <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                                <div className="offcanvas-header">
                                    <h5 className="offcanvas-title" id="offcanvasRightLabel">Details</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div className="offcanvas-body">
                                    <div className="cards_view">
                                        <div className="grid-system equal-height">
                                            <div>{Strings.Last_Medicine_details}</div>
                                            {this.state.medication_details && this.state.medication_details.length > 0 && (
                                                <div className="">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-6">
                                                                    <span className="dateSpan">{Common.formatDate(this.state.medication_details[0].patient_consultaion_date)}</span>
                                                                </div>
                                                                <div className="col-6">
                                                                    <h5 className="card-title text-end"><i className="fa fa-user-md" aria-hidden="true"></i> Sanath K</h5>
                                                                </div>
                                                            </div>
                                                            <div className="mt-4 tabletslistview">
                                                                {/* <h4 className="tablets_list pb-2">
                                                                    Tablet List
                                                                </h4> */}
                                                                <ul className="list-unstyled">
                                                                    {this.state.medication_details[0].med_details.map((sub_item, sub_index) => (
                                                                        <li key={sub_index}>{sub_item.medicine_master_name} - <span style={{ color: "maroon", fontWeight: 700 }}>{sub_item.potencies_type_name} </span> - <span style={{ color: "blue", fontWeight: 700 }}> {sub_item.dosage} d </span></li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="cards_view mt-3">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className={this.state.isRightBranchHidden ? 'col-md-12' : 'col-md-6'} id="leftBranch">
                                        {/* <div className="col-md-6"> */}
                                        {!this.state.isShowMedicine &&
                                            <div className="flow-y">
                                                <div className="row">
                                                    <div className="grid-system equal-height">
                                                        {this.state.medication_details && this.state.medication_details.map((item, index) => (
                                                            <div className="">
                                                                <div onClick={() => { this.handle_modal_view(item) }} className="card" style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                                                    <div className="card-body">
                                                                        <div className="row">
                                                                            <div className="col-6">
                                                                                <span className="dateSpan">{Common.formatDate(item.patient_consultaion_date)}</span>
                                                                            </div>
                                                                            <div className="col-6">
                                                                                <h5 className="card-title text-end"><i className="fa fa-user-md" aria-hidden="true"></i> Sanath K</h5>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mt-4 tabletslistview">
                                                                            {/* <h4 className="tablets_list pb-2">
                                                                                Tablet List
                                                                            </h4> */}
                                                                            <ul className="list-unstyled">
                                                                                {item.med_details.map((sub_item, sub_index) => (
                                                                                    // <li key={sub_index}>{sub_item.medicine_master_name}</li>
                                                                                    <li key={sub_index}>{sub_item.medicine_master_name} - {sub_item.potencies_type_name} -{sub_item.dosage} d</li>

                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}

                                                    </div>
                                                    {/* popup-view-start */}
                                                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                        <div class="modal-dialog modal-dialog-centered" style={{ borderColor: "#00918f17" }}>
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <div class="modal-title fs-5" id="staticBackdropLabel">Medicine details</div>
                                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                {this.state.data_for_modal && this.state.data_for_modal.map((item, index) => (
                                                                    <div style={{ margin: 10 }}>
                                                                        <div style={{ textAlign: "start" }}>
                                                                            <div> Patient Ailment:- <span style={{ color: "green" }}>{item.ailment}</span></div>
                                                                            <div> Next Medicine:- <span style={{ color: "green" }}>{item.next_medicine}</span></div>
                                                                            <div> Medical Reports:- <span style={{ color: "green" }}>{item.patient_medical_reports}</span></div>
                                                                            <div> Special Instructions:- <span style={{ color: "green" }}>{item.special_instructions}</span></div>
                                                                            <div style={{ color: "blue", fontWeight: 600 }}>Medicines:-</div>
                                                                            <ul className="list-unstyled">
                                                                                {item.med_details && item.med_details.map((item, index) => (
                                                                                    <li key={index}>{item.medicine_master_name} - <span>{item.potencies_type_name}</span> - <span>{item.dosage} d</span> </li>
                                                                                ))}

                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                {/* <div class="modal-footer">
                                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                    <button type="button" class="btn btn-primary">Understood</button>
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* popup-view-end */}
                                                </div>
                                            </div>
                                        }
                                        {this.state.isShowMedicine &&
                                            <div className="nav_tabs_bg">
                                                <ul className="nav nav-pills nav-fill ">
                                                    <li className="nav-item">
                                                        <a
                                                            className={`nav-link ${this.state.activeTab === Strings.purpose ? 'active' : ''}`}
                                                            aria-current="page"
                                                            href="#"
                                                            onClick={() => this.setActiveTab(Strings.purpose)}
                                                        >
                                                            Purpose
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a
                                                            className={`nav-link ${this.state.activeTab === Strings.medicine ? 'active' : ''}`}
                                                            href="#"
                                                            onClick={() => { this.setActiveTab(Strings.medicine) }}
                                                        >
                                                            Medicine
                                                        </a>
                                                    </li>

                                                </ul>
                                            </div>
                                        }

                                        {this.state.activeTab === Strings.medicine && (
                                            <div className="mt-3 purpose_shadow">
                                                <div className="center_content">
                                                    <ul className="list-unstyled">
                                                        {this.state.medicineNames.map((item, index) => {
                                                            return <li onClick={() => { this.handleTabs(item.medicine_type_id, index) }} style={{ display: "inline-block", marginRight: 20, padding: "3px 12px", textTransform: "capitalize", borderRadius: "6px", cursor: "pointer", borderStyle: "solid", borderWidth: 1, borderColor: "#b0b0b0", background: this.state.selected_medicine_type_index === index ? "#1fbab8" : "#fff", color: this.state.selected_medicine_type_index === index ? "white" : "black", }} key={index}> {item.medicine_type_name}</li>
                                                        })
                                                        }
                                                    </ul>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="">

                                                        {(this.state.filterData) &&
                                                            // // view for potencies names 1c 2c 
                                                            <div className="center_content">
                                                                <ul className="list-unstyled">
                                                                    {this.state.master_medincine_potencies_name.map((item, index) => {
                                                                        return <li style={{ display: "inline-block", marginRight: 10, borderStyle: "solid", borderWidth: 1, borderColor: "#b0b0b0", borderRadius: "3px", padding: "3px 9px", background: index === this.state.master_idex ? "green" : "white", color: index === this.state.master_idex ? "white" : "black" }} onClick={() => { this.setState({ master_idex: index, selected_potencies_type_id: item.potencies_type_id, potencies_type_name: item.potencies_type_name }) }} key={index} > {item.potencies_type_name}</li>
                                                                    })}
                                                                </ul>
                                                            </div>
                                                        }
                                                        <div className="center_content">
                                                            {/* search for medicines list */}
                                                            <input className="dose_input"
                                                                style={{ marginTop: 10 }}
                                                                placeholder="Search for medicine"
                                                                value={this.state.filterData}
                                                                onChange={(text) => { this.filterMedicen(text.target.value) }}
                                                            // onFocus={() => { this.handle_medicineSearch() }}

                                                            />
                                                            <div style={{ display: "inline-block", position: "relative" }}>
                                                                {/* entry for dose */}
                                                                <input className="dose_input dose_input_less_width"
                                                                    placeholder={Strings.dose}
                                                                    value={this.state.dosage}
                                                                    maxLength={10}
                                                                    onChange={(text) => { this.enterDose(text.target.value) }} />
                                                                <span style={{ position: "absolute", bottom: 0, right: 0, background: "grey", padding: "9px 5px", overflow: "hidden", borderRadius: "0px 4px 4px 0px", color: "white", fontSize: "13px" }}>{Strings.dose} </span>
                                                            </div>
                                                            <div style={{ display: "inline-block", marginTop: 10, position: "relative" }}>

                                                                <div className="ms-3 day_wise">
                                                                    {/* for timings */}
                                                                    <ul className="list-inline mb-0">
                                                                        {this.state.consume_dose_timings.map(((item, index) => (
                                                                            <li className="list-inline-item border_1_solid_5r_grey" onClick={() => { this.handleSelectionTimings(item.timing) }} style={{ background: this.state.selectedTimings.includes(item.value) ? '#003d74' : '#dcdcdc', color: this.state.selectedTimings.includes(item.value) ? 'white' : 'black' }}>{item.timing}</li>

                                                                        )))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {this.state.filterData &&
                                                            //  // showing the medicines
                                                            <div className="sub_tabs_view search_list overflow-auto" style={{ height: this.state.filterdArray.length > 0 ? 250 : 0 }}>
                                                                <ul className="list-unstyled">
                                                                    {this.state.filterdArray.map((item, index) => (
                                                                        <li style={{ fontSize: "14px", color: "#626262" }}
                                                                            key={index}
                                                                            onClick={() => {
                                                                                this.handleSelecionMedicines(item)
                                                                                // this.setState({ selcted_master_name: item.medicine_master_name, filterData: item.medicine_master_name });
                                                                            }} >
                                                                            {item.medicine_master_name}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        }

                                                        {this.state.selcted_master_name &&
                                                            <div className="selected_medicine">
                                                                <div style={{ color: "black", fontSize: 17 }}>
                                                                    Selected medicine:-
                                                                    <div style={{ color: "green", fontSize: 16 }}>{this.state.selcted_master_name} <span>&nbsp;</span>{this.state.dosage}{this.state.dosage ? "d" : null}</div>
                                                                </div>
                                                                <div style={{ marginTop: "8px" }}>
                                                                    <Button className="medicine_save" onClick={() => { this.savetoStateLevel() }}>Save</Button>
                                                                </div>
                                                            </div>
                                                        }

                                                        <div style={{ marginTop: 10 }}>
                                                            {this.state.filterData != "" &&
                                                                <div>
                                                                    {
                                                                        this.state.selected_medicine_names.length > 0 &&
                                                                        <div>
                                                                            <ul className="list-unstyled">
                                                                                {this.state.selected_medicine_names.map((item, index) => {
                                                                                    // console.warn("++item", item)
                                                                                    return (<li className="bottom_hightlets" key={index}>{item.selected_medicine_name} - {item.potencies_type_name}- {item.selected_dosage}d <Button className="btn-danger_cross" onClick={() => {
                                                                                        this.handleDelete(index)
                                                                                    }}><i className="fa fa-times" aria-hidden="true"></i>
                                                                                    </Button></li>)
                                                                                })}

                                                                            </ul>
                                                                        </div>
                                                                    }
                                                                    {this.state.selected_medicine_names.length == 0 &&
                                                                        <div>
                                                                            <div>
                                                                                No data found
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            }
                                                        </div>

                                                        <div className="text_area mt-4">
                                                            <div className="row">
                                                                <div className="col-6">
                                                                    <span>Next Medicine</span>
                                                                    <textarea className="w-100"
                                                                        value={this.state.next_med}
                                                                        onChange={(text) => { this.setState({ next_med: text.target.value }) }}
                                                                    />
                                                                </div>
                                                                <div className="col-6">
                                                                    <span>Special Instructions</span>
                                                                    <textarea className="w-100"
                                                                        value={this.state.spe_instruct}
                                                                        onChange={(text) => { this.setState({ spe_instruct: text.target.value }) }}
                                                                    ></textarea>
                                                                </div>
                                                            </div>

                                                            <div className="text-end">
                                                                <Button className="medicine_update mt-2" onClick={() => { this.submitMadicationdata() }}>Submit</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        }
                                        {this.state.activeTab === Strings.purpose &&
                                            <div className="mt-3 purpose_shadow text_area">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div>
                                                            <span> Patient ailment</span>
                                                        </div>
                                                        <textarea className="w-100"
                                                            value={this.state.patient_ailment}
                                                            onChange={(text) => { this.setState({ patient_ailment: text.target.value }) }}
                                                        />
                                                    </div>
                                                    <div className="col-6">
                                                        <div>
                                                            <span> Medical reports</span>
                                                        </div>
                                                        <textarea className="w-100"
                                                            value={this.state.patient_medicalreports}
                                                            onChange={(text) => { this.setState({ patient_medicalreports: text.target.value }) }}
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        }
                                    </div>
                                    {!this.state.isRightBranchHidden &&
                                        <div className="col-md-6">
                                            <div className="card">
                                                <Tooltip title="hide case sheet" arrow>
                                                    <span onClick={() => { this.handleClick() }} className="minus_circle"><i class="fa fa-times-circle" aria-hidden="true"></i></span>
                                                </Tooltip>
                                                <div>
                                                    <h5 className="card-title">Patient Case Sheet</h5>
                                                    <img src="https://cdn-images.resumelab.com/pages/teaching_assistant_cta1_new.jpg" className="w-100" />
                                                    {/* <embed
                                                        src={"https://cdn-images.resumelab.com/pages/teaching_assistant_cta1_new.jpg"}
                                                        className="w-100 pdf-height"
                                                        type="application/pdf"
                                                        name='X-Frame-Options'
                                                        value='sameorigin'
                                                    // style={{ height: '500px' }} // Set an appropriate height for the PDF viewer
                                                    /> */}
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            // </div >
        )
    }
}