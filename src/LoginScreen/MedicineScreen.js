import React, { Component } from "react";
import { Employee } from "../api/Employee";
import { Button } from "react-bootstrap";
import { Strings } from "../strings/Strings";
import { toast } from "react-toastify";
import { ValidationMessage } from "../helpers/ValidationMessage";
import { Common } from "../helpers/common";

export default class MedicineScreen extends Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     MainMadicationdata: [],
        //     dummyMainMadicationdata: [],
        //     activeTab: "",
        //     filterData: "",
        //     filterdArray: [],
        //     medicineNames: [],
        //     master_medincine_potencies_name: [],
        //     selcted_master_name: "",
        //     seletedMedicine: "",
        //     selectedDosage: "",
        //     medicinelist: [],
        //     medicine_type_id: null,
        //     usage_time: "",
        //     selected_potencies_type_id: null,
        //     dosage: 1,
        //     selected_medicine_type_index: null,
        //     medicationlistjson: [],
        //     spe_instruct: "",
        //     next_med: "",
        //     patient_ailment: "",
        //     patient_medicalreports: "",
        //     purpose: "",
        //     syntomus: "",
        //     isRightBranchHidden: false
        // }

        //  // new 
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
            medicine_type_id: null,
            usage_time: "",
            selected_potencies_type_id: null,
            dosage: 1,
            selected_medicine_type_index: null, // Selected medicinetype index  Ex:- main, mothertincher ...
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
            consume_dose: [{}],

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
        console.warn("++obj", obj)
        try {
            const response = await Employee.get_patientdatabyid(obj);
            if (response.length > 0) {
                var medication_patient_details = response[0].patients_details
                // console.warn("++medication_patient_details", medication_patient_details)
                var medicationdetails = response[0].medicationdetails
                console.warn("++medicationdetails", medicationdetails)
                this.setState({
                    Mainpaitentdetails: response, dummyMainpaitentdetails: response, medication_patient_details: medication_patient_details, medication_details: medicationdetails, isLoading: false
                }, () => {
                    console.warn('medication_details', this.state.medication_details)
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
                console.warn("++response", response)
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
        // var ageNum = Common.getNumericValue(value)
        // console.warn("++ageNum", ageNum)
        var days = Common.getNumericValue(text)
        this.setState({ dosage: days })
    }


    // savetoStateLevel = () => {
    //     // var currentDate = new Date().toJSON().slice(0, 10)
    //     var obj = {
    //         medicineid: this.state.medicine_type_id,
    //         potenciesid: this.state.selected_potencies_type_id,
    //         med_dosage: this.state.dosage,
    //         med_consume_time: this.state.usage_time
    //     }
    //     var medication_obj = [...this.state.medicationlistjson, obj]
    //     this.setState({ medicationlistjson: medication_obj }, () => {
    //         this.setState({ filterData: "", usage_time: "", dosage: 1, potenciesid: null, medicineid: null, filterdArray: [], selcted_master_name: '' })
    //     })
    // }


    savetoStateLevel = () => {
        var names_list = {
            selected_medicine_name: this.state.selcted_master_name,
            selected_dosage: this.state.dosage,
            potencies_type: this.state.potencies_type,
            potencies_type_name: this.state.potencies_type_name
        }
        // console.warn("++names_list", names_list)
        // return
        var obj = {
            medicineid: this.state.medicine_type_id,
            potenciesid: this.state.selected_potencies_type_id,
            med_dosage: this.state.dosage,
            med_consume_time: this.state.usage_time
        }
        var names_array = [...this.state.selected_medicine_names, names_list]
        var medication_obj = [...this.state.medicationlistjson, obj]
        this.setState({ medicationlistjson: medication_obj, selected_medicine_names: names_array }, () => {
            this.setState({
                filterData: "", usage_time: "", dosage: 1, potenciesid: null, medicineid: null, filterdArray: [], selcted_master_name: '', selected_medicine_names: names_array, selected_medicine_name: "", potencies_type: "",
                potencies_type_name: "", master_idex: null
            })
        })
    }


    // submitMadicationdata() {
    //     const final_obj = {
    //         patient_id: 2,
    //         doctor_id: 3,
    //         spe_instruct: this.state.spe_instruct,
    //         next_med: this.state.next_med,
    //         patient_ailment: this.state.patient_ailment,
    //         patient_medicalreports: this.state.patient_medicalreports,
    //         medicationlistjson: JSON.stringify(this.state.medicationlistjson),
    //         createdby: 1,
    //         consult_date: new Date().toJSON().slice(0, 10)


    //     }

    //     console.warn("++final_obj", final_obj)

    //     // this.CreateMadication(item)


    // }
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

        // console.warn("++final_obj", final_obj)
        this.setState({ medicationlistjson: [], selected_medicine_names: [] })

        this.CreateMadication(final_obj)


    }
    async CreateMadication(item) {
        // console.log(item);
        try {
            // const response = await Employee.insert_patientdetails(item);
            const response = await Employee.insertmedicationdetails(item);
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

                    // this.getAllStates();

                }
            );
        }

    }



    backToMain() {
        this.props.closeMedicineScreen()
    }


    // handleHide_show = () => {
    //     this.setState({ isShowMedicine: !this.state.isShowMedicine, activeTab: Strings.purpose })
    // }

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
        this.setState({ master_medincine_potencies_name: master_medi_potencies_type, selected_medicine_type_index: index, master_idex: null }, () => {
            this.setState({ filterData: "", med_consume_time: "", med_dosage: 1, dosage: 1, potenciesid: null, medicineid: null })
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
                                                            <span className="span-custom">{detailes.patient_dob}</span>
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
                                        {/* < div className="row">
                                        <div className="col-md-4 padding-tp-10">
                                            <div className="row">
                                                <div className="col-6 position-relative">
                                                    <div className="general-detailes-text label-column">
                                                        <p>First Name</p>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <span className="span-custom">Venkat</span>
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
                                                    <span className="span-custom">Padyala</span>
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
                                                    <span className="span-custom">19/02/1998</span>
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
                                                    <span className="span-custom">Male</span>
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
                                                    <span className="span-custom">9966622122</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}

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
                                                            <span className="span-custom">{detailes.patient_first_visit_date}</span>
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
                                    // <div className="row" >
                                    //     <div className="col-md-4 padding-tp-10">
                                    //         <div className="row">
                                    //             <div className="col-6 position-relative">
                                    //                 <div className="general-detailes-text label-column">
                                    //                     <p>First Name</p>
                                    //                 </div>
                                    //             </div>
                                    //             <div className="col-6">
                                    //                 <span className="span-custom">Venkat  Padyala</span>
                                    //             </div>
                                    //         </div>
                                    //     </div>
                                    //     <div className="col-md-4 padding-tp-10">
                                    //         <div className="row">
                                    //             <div className="col-6 position-relative">
                                    //                 <div className="general-detailes-text label-column">
                                    //                     <p>Visit Date</p>
                                    //                 </div>
                                    //             </div>
                                    //             <div className="col-6">
                                    //                 <span className="span-custom">{new Date().toJSON().slice(0, 10)}</span>
                                    //             </div>
                                    //         </div>
                                    //     </div>
                                    //     <div className="col-md-4 padding-tp-10">
                                    //         <div className="row">
                                    //             <div className="col-6 position-relative">
                                    //                 <div className="general-detailes-text label-column">
                                    //                     <p>Patient No</p>
                                    //                 </div>
                                    //             </div>
                                    //             <div className="col-6">
                                    //                 <span className="span-custom">10</span>
                                    //             </div>
                                    //         </div>
                                    //     </div>
                                    // </div>

                                }

                                <div style={{ textAlign: "end" }}>
                                    {!this.state.isShowMedicine &&
                                        <Button className="btn btn-success me-3"
                                            data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" id="clicksButton"
                                            onClick={() => { this.handleHide_show(); this.getmedaticationdetails() }}
                                        >
                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                        </Button>
                                    }
                                    {this.state.isShowMedicine &&
                                        <Button className="btn btn-success me-3"
                                            onClick={() => { this.handleHide() }}
                                        >
                                            <i class="fa fa-minus" aria-hidden="true"></i>
                                        </Button>
                                    }
                                    <Button className="btn btn-success me-3" onClick={() => { this.handleClick() }} id="clicksButton">
                                        <i className="fa fa-expand" aria-hidden="true"></i>
                                    </Button>
                                    {this.state.isShoweye_btn &&
                                        <Button className="btn btn-success"
                                            data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" id="clicksButton">
                                            <i className="fa fa-eye" aria-hidden="true"></i>
                                        </Button>
                                    }

                                </div>
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
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <span className="dateSpan">12-03-2024</span>
                                                        </div>
                                                        <div className="col-6">
                                                            <h5 className="card-title text-end"><i className="fa fa-user-md" aria-hidden="true"></i> Sanath K</h5>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 tabletslistview">
                                                        <h4 className="tablets_list pb-2">
                                                            Tablet List
                                                        </h4>
                                                        <ul className="list-unstyled">
                                                            <li> Acetaminophen</li>
                                                            <li> Gabapentin enacarbil</li>
                                                            <li> Dolo</li>
                                                            <li> Methylprednisolone </li>
                                                            <li> Divalproex sodium</li>
                                                            <li> Wart Remover </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
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
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <div className="row">
                                                                            <div className="col-6">
                                                                                <span className="dateSpan">{item.patient_consultaion_date}</span>
                                                                            </div>
                                                                            <div className="col-6">
                                                                                <h5 className="card-title text-end"><i className="fa fa-user-md" aria-hidden="true"></i> Sanath K</h5>
                                                                            </div>
                                                                        </div>
                                                                        <div className="mt-4 tabletslistview">
                                                                            <h4 className="tablets_list pb-2">
                                                                                Tablet List
                                                                            </h4>
                                                                            <ul className="list-unstyled">
                                                                                {/* <li> Acetaminophen</li>
                                                                            <li> Gabapentin enacarbil</li>
                                                                            <li> Dolo</li>
                                                                            <li> Methylprednisolone </li>
                                                                            <li> Divalproex sodium</li>
                                                                            <li> Wart Remover </li> */}
                                                                                {item.med_details.map((sub_item, sub_index) => (
                                                                                    // console.warn("++item", item)
                                                                                    <li key={sub_index}>{sub_item.medicine_master_name}</li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {/* <div className="">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-6">
                                                                            <span className="dateSpan">12-03-2024</span>
                                                                        </div>
                                                                        <div className="col-6">
                                                                            <h5 className="card-title text-end"><i className="fa fa-user-md" aria-hidden="true"></i> Sanath K</h5>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-4 tabletslistview">
                                                                        <h4 className="tablets_list pb-2">
                                                                            Tablet List
                                                                        </h4>
                                                                        <ul className="list-unstyled">
                                                                            <li> Acetaminophen</li>
                                                                            <li> Gabapentin enacarbil</li>
                                                                            <li> Dolo</li>
                                                                            <li> Methylprednisolone </li>
                                                                            <li> Divalproex sodium</li>
                                                                            <li> Wart Remover </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-6">
                                                                            <span className="dateSpan">18-05-2024</span>
                                                                        </div>
                                                                        <div className="col-6">
                                                                            <h5 className="card-title text-end"><i className="fa fa-user-md" aria-hidden="true"></i> Sanath K</h5>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-4 tabletslistview">
                                                                        <h4 className="tablets_list pb-2">
                                                                            Tablet List
                                                                        </h4>
                                                                        <ul className="list-unstyled">
                                                                            <li> Acetaminophen</li>
                                                                            <li> Gabapentin enacarbil</li>
                                                                            <li> Dolo</li>
                                                                            <li> Methylprednisolone </li>
                                                                            <li> Divalproex sodium</li>
                                                                            <li> Wart Remover </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-6">
                                                                            <span className="dateSpan">11-03-2024</span>
                                                                        </div>
                                                                        <div className="col-6">
                                                                            <h5 className="card-title text-end"><i className="fa fa-user-md" aria-hidden="true"></i> Sanath K</h5>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-4 tabletslistview">
                                                                        <h4 className="tablets_list pb-2">
                                                                            Tablet List
                                                                        </h4>
                                                                        <ul className="list-unstyled">
                                                                            <li> Acetaminophen</li>
                                                                            <li> Gabapentin enacarbil</li>
                                                                            <li> Dolo</li>
                                                                            <li> Methylprednisolone </li>
                                                                            <li> Divalproex sodium</li>
                                                                            <li> Wart Remover </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-6">
                                                                            <span className="dateSpan">30-05-2024</span>
                                                                        </div>
                                                                        <div className="col-6">
                                                                            <h5 className="card-title text-end"><i className="fa fa-user-md" aria-hidden="true"></i> Sanath K</h5>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-4 tabletslistview">
                                                                        <h4 className="tablets_list pb-2">
                                                                            Tablet List
                                                                        </h4>
                                                                        <ul className="list-unstyled">
                                                                            <li> Acetaminophen</li>
                                                                            <li> Gabapentin enacarbil</li>
                                                                            <li> Dolo</li>
                                                                            <li> Methylprednisolone </li>
                                                                            <li> Divalproex sodium</li>
                                                                            <li> Wart Remover </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-6">
                                                                            <span className="dateSpan">18-03-2024</span>
                                                                        </div>
                                                                        <div className="col-6">
                                                                            <h5 className="card-title text-end"><i className="fa fa-user-md" aria-hidden="true"></i> Sanath K</h5>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-4 tabletslistview">
                                                                        <h4 className="tablets_list pb-2">
                                                                            Tablet List
                                                                        </h4>
                                                                        <ul className="list-unstyled">
                                                                            <li> Acetaminophen</li>
                                                                            <li> Gabapentin enacarbil</li>
                                                                            <li> Dolo</li>
                                                                            <li> Methylprednisolone </li>
                                                                            <li> Divalproex sodium</li>
                                                                            <li> Wart Remover </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-6">
                                                                            <span className="dateSpan">13-04-2024</span>
                                                                        </div>
                                                                        <div className="col-6">
                                                                            <h5 className="card-title text-end"><i className="fa fa-user-md" aria-hidden="true"></i> Sanath K</h5>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-4 tabletslistview">
                                                                        <h4 className="tablets_list pb-2">
                                                                            Tablet List
                                                                        </h4>
                                                                        <ul className="list-unstyled">
                                                                            <li> Acetaminophen</li>
                                                                            <li> Gabapentin enacarbil</li>
                                                                            <li> Dolo</li>
                                                                            <li> Methylprednisolone </li>
                                                                            <li> Divalproex sodium</li>
                                                                            <li> Wart Remover </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> */}
                                                    </div>
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
                                                            // console.warn("+=item", item)
                                                            return <li onClick={() => { this.handleTabs(item.medicine_type_id, index) }} style={{ display: "inline-block", marginRight: 20, padding: "3px 12px", textTransform: "capitalize", borderRadius: "6px", cursor: "pointer", borderStyle: "solid", borderWidth: 1, borderColor: "#b0b0b0", background: this.state.selected_medicine_type_index === index ? "#1fbab8" : "#fff", color: this.state.selected_medicine_type_index === index ? "white" : "black", }} key={index}> {item.medicine_type_name}</li>
                                                        })
                                                        }
                                                    </ul>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="">
                                                        {this.state.filterData &&
                                                            <div className="center_content">
                                                                <ul className="list-unstyled">
                                                                    {this.state.master_medincine_potencies_name.map((item, index) => {
                                                                        return <li style={{ display: "inline-block", marginRight: 10, borderStyle: "solid", borderWidth: 1, borderColor: "#b0b0b0", borderRadius: "3px", padding: "3px 9px", background: index === this.state.master_idex ? "green" : "white", color: index === this.state.master_idex ? "white" : "black" }} onClick={() => { this.setState({ master_idex: index, selected_potencies_type_id: item.potencies_type_id, medicine_type_id: item.medicine_type_id, potencies_type_name: item.potencies_type_name }) }} key={index} > {item.potencies_type_name}</li>
                                                                    })}
                                                                </ul>
                                                            </div>
                                                        }
                                                        <input className="dose_input"
                                                            style={{ marginTop: 10 }}
                                                            placeholder="Search for medicine"
                                                            value={this.state.filterData}
                                                            onChange={(text) => { this.filterMedicen(text.target.value) }}
                                                        // onFocus={() => { this.handle_medicineSearch() }}

                                                        />
                                                        <div style={{ display: "inline-block", position: "relative" }}>
                                                            <input style={{ marginTop: 10, marginLeft: 10, width: "145px" }} className="dose_input"
                                                                placeholder="Enter Dose"
                                                                value={this.state.dosage}
                                                                maxLength={10}
                                                                onChange={(text) => { this.enterDose(text.target.value) }} />
                                                            <span style={{ position: "absolute", bottom: 0, right: 0, background: "grey", padding: "9px 5px", overflow: "hidden", borderRadius: "0px 4px 4px 0px", color: "white", fontSize: "13px" }}> Dose </span>
                                                        </div>
                                                        <div style={{ display: "inline-block", position: "relative" }}>
                                                            {/* <input style={{ marginTop: 10, marginLeft: 10 }} className="dose_input"
                                                                placeholder="Usage Time"
                                                                value={this.state.usage_time}
                                                                onChange={(text) => { this.setState({ usage_time: text.target.value }) }} /> */}
                                                            {/* <span style={{ position: "absolute", bottom: 0, right: 0, background: "grey", padding: 3, overflow: "hidden", color: "white" }}> Weaks  </span> */}

                                                            <div className="ms-3 day_wise">
                                                                <ul className="list-inline">
                                                                    <li className="list-inline-item">M</li>
                                                                    <li className="list-inline-item">A</li>
                                                                    <li className="list-inline-item">E</li>
                                                                    <li className="list-inline-item">N</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="sub_tabs_view overflow-auto" style={{ height: this.state.filterData ? 250 : null }}>
                                                            <ul className="list-unstyled">
                                                                {this.state.filterdArray.map((item, index) => (
                                                                    <li style={{ fontSize: "14px", color: "#626262" }}
                                                                        key={index}
                                                                        onClick={() => {
                                                                            this.setState({ selcted_master_name: item.medicine_master_name, filterData: item.medicine_master_name });
                                                                        }} >
                                                                        {item.medicine_master_name}
                                                                    </li>
                                                                ))}
                                                            </ul>

                                                        </div>
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
                                                            <div className="col-6">
                                                                <Button className="medicine_update mt-2" onClick={() => { this.submitMadicationdata() }}>Submit</Button>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            {this.state.selected_medicine_names.length > 0 &&
                                                                <div>
                                                                    <ul className="list-unstyled">
                                                                    {this.state.selected_medicine_names.map((item, index) => {
                                                                        console.warn("++item", item)
                                                                        return (<li className="bottom_hightlets" key={index}>{item.selected_medicine_name} - {item.potencies_type_name}- {item.selected_dosage}d <Button className="btn-danger_cross" onClick={() => {
                                                                            this.handleDelete(index)
                                                                        }}><i className="fa fa-times" aria-hidden="true"></i>
                                                                        </Button></li>)
                                                                    })}

                                                                    </ul>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        }
                                        {this.state.activeTab === Strings.purpose &&
                                            <div className="mt-3 purpose_shadow text_area">
                                                {/* <div className="row">
                                                    <div className="col-6">
                                                        <span>Purpose</span>
                                                        <textarea></textarea>
                                                    </div>
                                                    <div className="col-6">
                                                        <span>Syntomus</span>
                                                        <textarea></textarea>
                                                    </div>
                                                </div> */}
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
                                                {/* {this.state.isShowMedicine &&
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <h5 className="card-title"> 12-03-2024</h5>
                                                            </div>
                                                            <div className="col-6">
                                                                <span className="dateSpan"> <i className="fa fa-user-md" aria-hidden="true"></i> Sanath K</span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4 tabletslistview">
                                                            <h4 className="tablets_list pb-2">
                                                                Tablet List
                                                            </h4>
                                                            <ul className="list-unstyled">
                                                                <li> Acetaminophen</li>
                                                                <li> Gabapentin enacarbil</li>
                                                                <li> Dolo</li>
                                                                <li> Methylprednisolone </li>
                                                                <li> Divalproex sodium</li>
                                                                <li> Wart Remover </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                } */}
                                                <img src="https://cdn-images.resumelab.com/pages/teaching_assistant_cta1_new.jpg" className="w-100" />
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