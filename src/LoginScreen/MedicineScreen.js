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
            medicinelist: [],
            medicine_type_id: null,
            usage_time: "",
            selected_potencies_type_id: null,
            dosage: 1,
            selected_medicine_type_index: null,
            medicationlistjson: [],
            spe_instruct: "",
            next_med: "",
            patient_ailment: "",
            patient_medicalreports: "",
            purpose: "",
            syntomus: ""
        }
    }



    componentDidMount() {


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
        var enter_dosage = Common.getNumericValue(text)
        this.setState({ dosage: enter_dosage })
    }

    savetoStateLevel = () => {
        // var currentDate = new Date().toJSON().slice(0, 10)
        var obj = {
            medicineid: this.state.medicine_type_id,
            potenciesid: this.state.selected_potencies_type_id,
            med_dosage: this.state.dosage,
            med_consume_time: this.state.usage_time
        }
        var medication_obj = [...this.state.medicationlistjson, obj]
        this.setState({ medicationlistjson: medication_obj }, () => {
            this.setState({ filterData: "", usage_time: "", dosage: 1, potenciesid: null, medicineid: null, filterdArray: [], selcted_master_name: '' })
        })
    }


    submitMadicationdata() {
        const final_obj = {
            patient_id: 2,
            doctor_id: 3,
            spe_instruct: this.state.spe_instruct,
            next_med: this.state.next_med,
            patient_ailment: this.state.patient_ailment,
            patient_medicalreports: this.state.patient_medicalreports,
            medicationlistjson: JSON.stringify(this.state.medicationlistjson),
            createdby: 1,
            consult_date: new Date().toJSON().slice(0, 10)


        }

        console.warn("++final_obj", final_obj)

        this.CreateMadication(final_obj)


    }
    async CreateMadication(item) {
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

                    // this.getAllStates();

                }
            );
        }

    }



    backToMain() {
        this.props.closeMedicineScreen()
    }


    handleHide_show = () => {
        this.setState({ isShowMedicine: true, activeTab: Strings.purpose })
    }
    handleHide = () => {
        this.setState({ isShowMedicine: false, activeTab: "" })
    }




    set_sub_ActiveTab = (tabs) => {
        alert(tabs)
    }

    handleTabs = (selectedItem, index) => {
        var master_medi_potencies_type = this.state.dummyMainMadicationdata[0].potenciestype.filter(item => {
            return item.medicine_type_id === selectedItem;
        });
        this.setState({ master_medincine_potencies_name: master_medi_potencies_type, selected_medicine_type_index: index }, () => {
            this.setState({ filterData: "", med_consume_time: "", med_dosage: 1, dosage: 1, potenciesid: null, medicineid: null })
        })
    }
    render() {
        return (
            <div>
                <div>
                    <div className="margin_bottom_15 evens-align border_w_2 position-relative">
                        <h3 className="info-text">Patient Info</h3>
                        <div className="top-right-icons">
                            <span onClick={() => { { this.backToMain() } }}>
                                <i className="fa fa-arrow-left" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div className="user_list pb-3">
                        <div className="container-fluid">
                            {!this.state.isShowMedicine ?
                                < div className="row">
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
                                </div>
                                :
                                <div className="row" >
                                    <div className="col-md-4 padding-tp-10">
                                        <div className="row">
                                            <div className="col-6 position-relative">
                                                <div className="general-detailes-text label-column">
                                                    <p>First Name</p>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <span className="span-custom">Venkat  Padyala</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 padding-tp-10">
                                        <div className="general-detailes-text label-column">
                                            <p>D.O.B</p> : - {new Date().toJSON().slice(0, 10)}
                                        </div>
                                    </div>
                                </div>
                            }

                            <div style={{ textAlign: "end" }}>
                                {!this.state.isShowMedicine &&
                                    <Button className="btn btn-success me-4"
                                        // onClick={() => {  this.getmedaticationdetails() }}
                                        onClick={() => { this.handleHide_show(); this.getmedaticationdetails() }}
                                    > Add </Button>
                                }
                                {this.state.isShowMedicine &&
                                    <Button className="btn btn-success me-4"
                                        // onClick={() => {  this.getmedaticationdetails() }}
                                        onClick={() => { this.handleHide() }}
                                    > Hide </Button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cards_view mt-3">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                {!this.state.isShowMedicine &&
                                    <div className="flow-y">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <h5 className="card-title"><i class="fa fa-user-md" aria-hidden="true"></i> Sanath K</h5>
                                                            </div>
                                                            <div className="col-6">
                                                                <span className="dateSpan">12-03-2024</span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4 tabletslistview">
                                                            <h4 className="tablets_list pb-2">
                                                                Tablet List
                                                            </h4>
                                                            <ul class="list-unstyled">
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
                                            <div className="col-md-6">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <h5 className="card-title"><i class="fa fa-user-md" aria-hidden="true"></i> Sanath K</h5>
                                                            </div>
                                                            <div className="col-6">
                                                                <span className="dateSpan">12-03-2024</span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4 tabletslistview">
                                                            <h4 className="tablets_list pb-2">
                                                                Tablet List
                                                            </h4>
                                                            <ul class="list-unstyled">
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

                                            <div className="col-md-6 margin_tp_22">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <h5 className="card-title"><i class="fa fa-user-md" aria-hidden="true"></i> Sanath K</h5>
                                                            </div>
                                                            <div className="col-6">
                                                                <span className="dateSpan">12-03-2024</span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4 tabletslistview">
                                                            <h4 className="tablets_list pb-2">
                                                                Tablet List
                                                            </h4>
                                                            <ul class="list-unstyled">
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
                                            <div className="col-md-6 margin_tp_22">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <h5 className="card-title"><i class="fa fa-user-md" aria-hidden="true"></i> Sanath K</h5>
                                                            </div>
                                                            <div className="col-6">
                                                                <span className="dateSpan">12-03-2024</span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4 tabletslistview">
                                                            <h4 className="tablets_list pb-2">
                                                                Tablet List
                                                            </h4>
                                                            <ul class="list-unstyled">
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

                                            <div className="col-md-6 margin_tp_22">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <h5 className="card-title"><i class="fa fa-user-md" aria-hidden="true"></i> Sanath K</h5>
                                                            </div>
                                                            <div className="col-6">
                                                                <span className="dateSpan">12-03-2024</span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4 tabletslistview">
                                                            <h4 className="tablets_list pb-2">
                                                                Tablet List
                                                            </h4>
                                                            <ul class="list-unstyled">
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
                                            <div className="col-md-6 margin_tp_22">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <h5 className="card-title"><i class="fa fa-user-md" aria-hidden="true"></i> Sanath K</h5>
                                                            </div>
                                                            <div className="col-6">
                                                                <span className="dateSpan">12-03-2024</span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4 tabletslistview">
                                                            <h4 className="tablets_list pb-2">
                                                                Tablet List
                                                            </h4>
                                                            <ul class="list-unstyled">
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
                                }
                                {this.state.isShowMedicine &&
                                    <div>
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
                                    <div className="mt-4">
                                        <ul>
                                            {this.state.medicineNames.map((item, index) => {
                                                // console.warn("+=item", item)
                                                return <li onClick={() => { this.handleTabs(item.medicine_type_id, index) }} style={{ display: "inline-block", marginRight: 20, borderStyle: "solid", borderWidth: 1, borderColor: "black", background: this.state.selected_medicine_type_index === index ? "blue" : "white" }} key={index}> {item.medicine_type_name}</li>
                                            })
                                            }
                                        </ul>

                                        <div className="mt-2">
                                            <div>
                                                {this.state.filterData &&
                                                    <div>
                                                        <ul>
                                                            {this.state.master_medincine_potencies_name.map((item, index) => {
                                                                return <li style={{ display: "inline-block", marginRight: 10, borderStyle: "solid", borderWidth: 1, borderColor: "black", padding: 5, background: index === this.state.master_idex ? "green" : "white" }} onClick={() => { this.setState({ master_idex: index, selected_potencies_type_id: item.potencies_type_id, medicine_type_id: item.medicine_type_id }) }} key={index} > {item.potencies_type_name}</li>
                                                            })}
                                                        </ul>
                                                    </div>
                                                }
                                                <input
                                                    style={{ marginTop: 10 }}
                                                    placeholder="Search for medicine"
                                                    value={this.state.filterData}
                                                    // disabled={this.state.master_medincine_potencies_name ? "false" : "true"}
                                                    onChange={(text) => { this.filterMedicen(text.target.value) }}
                                                />
                                                <div style={{ display: "inline-block", position: "relative" }}>
                                                    <input style={{ marginTop: 10, marginLeft: 10 }}
                                                        placeholder="Enter Dose"
                                                        value={this.state.dosage}
                                                        maxLength={10}
                                                        onChange={(text) => { this.enterDose(text.target.value) }} />
                                                    <span style={{ position: "absolute", bottom: 0, right: 0, background: "grey", padding: 3, overflow: "hidden", color: "white" }}> Dose </span>
                                                </div>
                                                <div style={{ display: "inline-block", position: "relative" }}>
                                                    <input style={{ marginTop: 10, marginLeft: 10 }}
                                                        placeholder="Usage Time"
                                                        value={this.state.usage_time}
                                                        // maxLength={10}
                                                        onChange={(text) => { this.setState({ usage_time: text.target.value }) }} />
                                                    {/* <span style={{ position: "absolute", bottom: 0, right: 0, background: "grey", padding: 3, overflow: "hidden", color: "white" }}> Weaks  </span> */}
                                                </div>
                                                <div className="sub_tabs_view" style={{ height: this.state.filterData ? 250 : null }}>
                                                    <ul className="list-unstyled">
                                                        {this.state.filterdArray.map((item, index) => (
                                                            <li
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
                                                    <div style={{ display: 'flex', marginTop: 25, justifyContent: "space-between" }}>
                                                        <div style={{ color: "black", fontSize: 20 }}>
                                                            Selected medicine:-
                                                            <div style={{ color: "green", fontSize: 18 }}>{this.state.selcted_master_name} <span>&nbsp;</span>{this.state.dosage}{this.state.dosage ? "d" : null}</div>
                                                        </div>
                                                        <div>
                                                            <Button onClick={() => { this.savetoStateLevel() }}>Save</Button>
                                                        </div>
                                                    </div>
                                                }
                                                <div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div>
                                                                <span>Next Medicine</span>
                                                            </div>
                                                            <textarea
                                                                style={{ resize: "none" }}
                                                                value={this.state.next_med}
                                                                onChange={(text) => { this.setState({ next_med: text.target.value }) }}
                                                            />
                                                        </div>
                                                        <div className="col-6">
                                                            <div>
                                                                <span>Special Instructions</span>
                                                            </div>
                                                            <textarea
                                                                value={this.state.spe_instruct}
                                                                onChange={(text) => { this.setState({ spe_instruct: text.target.value }) }}
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <Button onClick={() => { this.setState({ activeTab: Strings.purpose }) }}>Previous</Button>
                                                        </div>
                                                        <div className="col-6">
                                                            <Button onClick={() => { this.submitMadicationdata() }}>Submit</Button>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        {this.state.medicationlistjson.length > 0 &&
                                                            <div>
                                                                <ul>
                                                                    {this.state.medicationlistjson.map((item, index) => {
                                                                        console.warn("++item", item)
                                                                        // return (<li key ={index}>{item.}</li>)
                                                                    })}

                                                                </ul>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                                }
                                {this.state.activeTab === Strings.purpose &&
                                    <div className="mt-4">
                                        <div className="row">
                                            <div className="col-6">
                                                <div>
                                                    <span> Medical reports</span>
                                                </div>
                                                <textarea
                                                    value={this.state.patient_medicalreports}
                                                    onChange={(text) => { this.setState({ patient_medicalreports: text.target.value }) }}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <div>
                                                    <span> Patient ailment</span>
                                                </div>
                                                <textarea
                                                    value={this.state.patient_ailment}
                                                    onChange={(text) => { this.setState({ patient_ailment: text.target.value }) }}
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="row">
                                            <div className="col-6">
                                                <div>
                                                    <span>Next Medicine</span>
                                                </div>
                                                <textarea
                                                    style={{ resize: "none" }}
                                                    value={this.state.next_med}
                                                    onChange={(text) => { this.setState({ next_med: text.target.value }) }}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <div>
                                                    <span>Special Instructions</span>
                                                </div>
                                                <textarea
                                                    value={this.state.spe_instruct}
                                                    onChange={(text) => { this.setState({ spe_instruct: text.target.value }) }}
                                                ></textarea>
                                            </div>
                                        </div> */}
                                        <div className="row">
                                            <div style={{ textAlign: "end" }}>
                                                <Button onClick={() => { this.setState({ activeTab: Strings.medicine }) }}><i class="fa fa-arrow-right" aria-hidden="true"></i></Button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="col-md-6">
                                <div className="card">
                                    {this.state.isShowMedicine &&
                                        <div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <h5 className="card-title"> 12-03-2024</h5>
                                                </div>
                                                <div className="col-6">
                                                    <span className="dateSpan"> <i class="fa fa-user-md" aria-hidden="true"></i> Sanath K</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 tabletslistview">
                                                <h4 className="tablets_list pb-2">
                                                    Tablet List
                                                </h4>
                                                <ul class="list-unstyled">
                                                    <li> Acetaminophen</li>
                                                    <li> Gabapentin enacarbil</li>
                                                    <li> Dolo</li>
                                                    <li> Methylprednisolone </li>
                                                    <li> Divalproex sodium</li>
                                                    <li> Wart Remover </li>
                                                </ul>
                                            </div>
                                        </div>
                                    }
                                    <img src="https://cdn-images.resumelab.com/pages/teaching_assistant_cta1_new.jpg" />
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
