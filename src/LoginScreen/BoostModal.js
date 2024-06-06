// // import React, { Component } from "react";

// // export default class BoostModal extends Component {
// //     constructor(props) {
// //         super(props)
// //         this.state = {}
// //     }
// //     render() {
// //         return (
// //             <div>
// //                 <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
// //                     <div class="modal-dialog modal-lg" >
// //                         <div class="modal-content">
// //                             <div class="modal-header">
// //                                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
// //                             </div>
// //                             <div class="modal-body">
// //                                 <ul class="nav nav-pills nav-fill">
// //                                     <li class="nav-item">
// //                                         <a class="nav-link active" aria-current="page" href="#">Main</a>
// //                                     </li>
// //                                     <li class="nav-item">
// //                                         <a class="nav-link" href="#">Mother tincher</a>
// //                                     </li>
// //                                     <li class="nav-item">
// //                                         <a class="nav-link" href="#">tissueSalts</a>
// //                                     </li>
// //                                     <li class="nav-item">
// //                                         <a class="nav-link disabled">Products</a>
// //                                     </li>
// //                                 </ul>
// //                                 <div>Main matter</div>
// //                                 <div>Mother tincher</div>
// //                                 <div>tissueSalts</div>
// //                                 <div>Products</div>
// //                             </div>

// //                         </div>
// //                     </div>
// //                 </div>


// //                 <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Add</button>
// //             </div>
// //         )
// //     }
// // }


// import React, { Component } from "react";

// export default class BoostModal extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             activeTab: 'Main'
//         };
//     }

//     setActiveTab = (tabName) => {
//         this.setState({ activeTab: tabName });
//     };

//     renderContent() {
//         const { activeTab } = this.state;
//         switch (activeTab) {
//             case 'Main':
//                 return <div>Main matter</div>;
//             case 'Mother tincher':
//                 return <div>Mother tincher</div>;
//             case 'tissueSalts':
//                 return <div>tissueSalts</div>;
//             case 'Products':
//                 return <div>Products</div>;
//             default:
//                 return null;
//         }
//     }

//     render() {

//         return (
//             <div>
//                 <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
//                     <div className="modal-dialog modal-lg">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h4> Date : - <span style={{ color: "green", fontWeight: 700 }}>{new Date().toJSON().slice(0, 10)}</span></h4>
//                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                             </div>
//                             <div className="modal-body">
//                                 <ul className="nav nav-pills nav-fill">
//                                     <li className="nav-item">
//                                         <a
//                                             className={`nav-link ${this.state.activeTab === 'Main' ? 'active' : ''}`}
//                                             aria-current="page"
//                                             href="#"
//                                             onClick={() => this.setActiveTab('Main')}
//                                         >
//                                             Main
//                                         </a>
//                                     </li>
//                                     <li className="nav-item">
//                                         <a
//                                             className={`nav-link ${this.state.activeTab === 'Mother tincher' ? 'active' : ''}`}
//                                             href="#"
//                                             onClick={() => this.setActiveTab('Mother tincher')}
//                                         >
//                                             Mother tincher
//                                         </a>
//                                     </li>
//                                     <li className="nav-item">
//                                         <a
//                                             className={`nav-link ${this.state.activeTab === 'tissueSalts' ? 'active' : ''}`}
//                                             href="#"
//                                             onClick={() => this.setActiveTab('tissueSalts')}
//                                         >
//                                             tissueSalts
//                                         </a>
//                                     </li>
//                                     <li className="nav-item">
//                                         <a
//                                             className={`nav-link ${this.state.activeTab === 'Products' ? 'active' : ''}`}
//                                             href="#"
//                                             onClick={() => this.setActiveTab('Products')}
//                                         >
//                                             Products
//                                         </a>
//                                     </li>
//                                 </ul>
//                                 {/* {this.renderContent()} */}
//                                 {this.state.activeTab === "Main" &&
//                                     <div>
//                                         <input type="file"></input>
//                                     </div>
//                                 }
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Add</button>
//             </div>
//         );
//     }
// }




import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Common } from "../helpers/common";
import { toast } from "react-toastify";
import { Employee } from "../api/Employee";
import { ValidationMessage } from "../helpers/ValidationMessage";
import { Strings } from "../strings/Strings";

export default class BoostModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: Strings.main,
            filterData: "",
            filterdArray: [],

            data: [
                { name: "Abhayarishta" },
                { name: "Amritarishta" },
                { name: "Balarishta" },
                { name: "Chandanasava" },
                { name: "Dashamularishta" },
                { name: "Jirakadyarishta" },
                { name: "Kanakasava" },
                { name: "Lodhrasava" }
            ],
            seletedMedicine: "",
            selectedDosage: "",
            selectedMainIndex: null,
            main_powers: [{ power: "1C" },
            { power: "6C" },
            { power: "30C" },
            { power: "200C" },
            { power: "1M" },
            { power: "10M" },
            { power: "50M" }
            ],
            salts_powers: [{ power: "1X" },
            { power: "3x" },
            { power: "6X" },
            { power: "12X" },
            { power: "25X" },
            { power: "50X" }
            ],
            mother_powers: [
                { power: "1Φ" },
                { power: "2Φ" },
                { power: "6Φ" },
                { power: "8Φ" },
                { power: "10Φ" },
                { power: "15Φ" }
            ],
            Tonic_powers: [
                { power: "10ml" },
                { power: "150ml" },
                { power: "250ml" },
                { power: "10gms" },
                { power: "150gms" },
                { power: "200gms" },
                { power: "250gms" }
            ],
            checkboxes: {
                morning: false,
                afternoon: false,
                evening: false,
                night: false
            },
            medicinelist: []
        }
    }

    componentDidMount() {
        console.warn("++inMedicine", this.props.medicineSceenData)
    }

    setActiveTab = (tabName) => {
        this.setState({ activeTab: tabName, filterData: "", selectedDosage: "", seletedMedicine: "", selectedMainIndex: null, days: "" });
    };
    closeMedicineScreen = () => {
        this.props.closeMedicineScreen()
    }

    filterMedicen = (text) => {
        var data = text;
        this.setState({ filterData: data })
        if (data != "") {
            var array = this.state.data.filter(item =>
                item.name.toLowerCase().includes(data))
            if (array) {
                this.setState({ filterdArray: array })
            }
        }
        else {
            this.setState({ filterdArray: [] })
        }
    }

    handleSelectionC = (text) => {
        var dosage = text.target.value
        if (dosage) {
            this.setState({ selectedDosage: dosage })
        }
    }

    enterDays = (text) => {
        // var ageNum = Common.getNumericValue(value)
        // console.warn("++ageNum", ageNum)
        var days = Common.getNumericValue(text)
        this.setState({ days: days })
    }

    savetoStateLevel = () => {
        var currentDate = new Date().toJSON().slice(0, 10)
        if (!this.state.seletedMedicine || !this.state.selectedDosage || !this.state.days) {
            if (this.state.seletedMedicine == "") {
                alert("plz select medicine")
            } else if (this.state.selectedDosage == "") {
                alert("plz select dosage")
            }
            else if (this.state.days == null) {
                alert("plz Enter days")
            }
        }
        else {
            var selectedlist = {
                date: currentDate,
                potencies_type_id: "",
                medicine_type_id: "",
                medicine_type_id: "",
                medicine_type_name: this.state.activeTab == Strings.main ? Strings.main : this.state.activeTab == Strings.mother_tinctures ? Strings.mother_tinctures : this.state.activeTab == Strings.tissue_salts ? Strings.tissue_salts : "Products",
                medicine_name: this.state.seletedMedicine,
                potencies_type_name: this.state.selectedDosage,
                days: this.state.days,
            }
            var final_array = [...this.state.medicinelist, selectedlist]
            this.setState({ medicinelist: final_array }, () => {
                console.warn("++medicinelist", this.state.medicinelist)
            })
            this.addNewData()
        }
    }

    handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        this.setState(prevState => ({
            checkboxes: {
                ...prevState.checkboxes,
                [name]: checked
            }
        }));
    }
    addNewData() {
        this.setState({ filterData: "", selectedDosage: "", seletedMedicine: "", selectedMainIndex: null, days: "" })
    }
    submitMadicationdata() {
        const item = {

        }
        this.CreateMadication(item)


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
    render() {
        return (
            <div>
                <div>
                    <div className="margin_bottom_15 evens-align border_w_2">
                        <h3 className="info-text">Patient Info</h3>
                        <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4> Date : - <span style={{ color: "green", fontWeight: 700, fontSize: 20 }}>{new Date().toJSON().slice(0, 10)}</span></h4>
                                        {/* <div className="ms-4" onClick={() => { this.addNewData() }}>Add new</div> */}
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <ul className="nav nav-pills nav-fill">
                                            <li className="nav-item">
                                                <a
                                                    className={`nav-link ${this.state.activeTab === Strings.main ? 'active' : ''}`}
                                                    aria-current="page"
                                                    href="#"
                                                    onClick={() => this.setActiveTab(Strings.main)}
                                                >
                                                    Main
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    className={`nav-link ${this.state.activeTab === Strings.mother_tinctures ? 'active' : ''}`}
                                                    href="#"
                                                    onClick={() => this.setActiveTab(Strings.mother_tinctures)}
                                                >
                                                    Mother tincher
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    className={`nav-link ${this.state.activeTab === Strings.tissue_salts ? 'active' : ''}`}
                                                    href="#"
                                                    onClick={() => this.setActiveTab(Strings.tissue_salts)}
                                                >
                                                    TissueSalts
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    className={`nav-link ${this.state.activeTab === 'Products' ? 'active' : ''}`}
                                                    href="#"
                                                    onClick={() => this.setActiveTab('Products')}
                                                >
                                                    Products
                                                </a>
                                            </li>
                                        </ul>
                                        {/* {this.renderContent()} */}

                                        {this.state.activeTab === "Main" &&
                                            <div className="mt-2">
                                                <div>
                                                    <input
                                                        style={{ marginTop: 20, width: "350px" }}
                                                        placeholder="Search for medicine"
                                                        value={this.state.filterData}
                                                        onChange={(text) => { this.filterMedicen(text.target.value) }}
                                                    />
                                                    <div style={{ display: "inline-block", position: "relative" }}>
                                                        <input style={{ marginTop: 20, marginLeft: 10 }}
                                                            placeholder="Enter Days"
                                                            value={this.state.days}
                                                            maxLength={10}
                                                            onChange={(text) => { this.enterDays(text.target.value) }} />
                                                        <span style={{ position: "absolute", bottom: 0, right: 0, background: "grey", padding: 3, overflow: "hidden", color: "white" }}> Usage Days </span>
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: "15px" }}>
                                                    {this.state.filterData &&
                                                        <ol className="margin_padding_0">
                                                            {this.state.main_powers.map((item, index) => {
                                                                return (<li
                                                                    key={index}
                                                                    onClick={() => {
                                                                        this.setState({ selectedDosage: item.power, selectedMainIndex: index });
                                                                    }}
                                                                    style={{
                                                                        display: "inline-block",
                                                                        borderColor: "black",
                                                                        borderWidth: 1,
                                                                        borderStyle: "solid",
                                                                        borderRadius: 5,
                                                                        marginRight: 15,
                                                                        marginBottom: 15, // Added margin bottom for responsive spacing
                                                                        paddingLeft: 20,
                                                                        paddingRight: 20,
                                                                        background: index === this.state.selectedMainIndex ? "green" : "white",
                                                                        color: index === this.state.selectedMainIndex ? "white" : "black"
                                                                    }}
                                                                >
                                                                    {item.power}
                                                                </li>)
                                                            })}
                                                        </ol>
                                                    }
                                                </div>
                                                <div style={{ height: this.state.filterdArray.length > 0 ? 150 : 10, overflow: 'auto', marginTop: 15 }} >
                                                    <ol>
                                                        {this.state.filterdArray.length > 0 &&
                                                            this.state.filterdArray.map((item, index) => {
                                                                return <li onClick={() => { this.setState({ filterData: item.name, seletedMedicine: item.name, filterdArray: [] }) }} key={index}>{item.name}</li>
                                                            })

                                                        }
                                                    </ol>
                                                </div>
                                            </div>
                                        }
                                        {this.state.activeTab === "Mother tincher" &&
                                            <div className="mt-2">
                                                <div>
                                                    <input
                                                        style={{ marginTop: 20, width: "350px" }}
                                                        placeholder="Search for medicine"
                                                        value={this.state.filterData}
                                                        onChange={(text) => { this.filterMedicen(text.target.value) }}
                                                    />
                                                    <div style={{ display: "inline-block", position: "relative" }}>
                                                        <input style={{ marginTop: 20, marginLeft: 10 }}
                                                            placeholder="Enter Days"
                                                            value={this.state.days}
                                                            maxLength={10}
                                                            onChange={(text) => { this.enterDays(text.target.value) }} />
                                                        <span style={{ position: "absolute", bottom: 0, right: 0, background: "grey", padding: 3, overflow: "hidden", color: "white" }}> Usage Days </span>
                                                    </div>
                                                </div>
                                                {/* <div style={{ marginTop: "10px" }}>
                                                    {this.state.filterData &&
                                                        <ol className="margin_padding_0">
                                                            {this.state.mother_powers.map((item, index) => {
                                                                return (<li onClick={() => { this.setState({ selectedDosage: item.power, selectedMainIndex: index }) }} style={{
                                                                    display: "inline-block", borderColor: "black", borderWidth: 1, borderStyle: "solid", borderRadius: 5, marginRight: 15, paddingLeft: 20, paddingRight: 20, background: index == this.state.selectedMainIndex ? "green" : "white", color: index == this.state.selectedMainIndex ? "white" : "black"
                                                                }}>{item.power}</li>)
                                                            })}
                                                        </ol>
                                                    }
                                                </div> */}
                                                <div style={{ marginTop: "10px", overflowX: "auto" }}>
                                                    {this.state.filterData && (
                                                        <ol className="margin_padding_0 d-flex flex-wrap">
                                                            {this.state.mother_powers.map((item, index) => (
                                                                <li
                                                                    key={index}
                                                                    onClick={() => {
                                                                        this.setState({ selectedDosage: item.power, selectedMainIndex: index });
                                                                    }}
                                                                    style={{
                                                                        display: "inline-block",
                                                                        borderColor: "black",
                                                                        borderWidth: 1,
                                                                        borderStyle: "solid",
                                                                        borderRadius: 5,
                                                                        marginRight: 15,
                                                                        marginBottom: 15, // Added margin bottom for responsive spacing
                                                                        paddingLeft: 20,
                                                                        paddingRight: 20,
                                                                        background: index === this.state.selectedMainIndex ? "green" : "white",
                                                                        color: index === this.state.selectedMainIndex ? "white" : "black"
                                                                    }}
                                                                >
                                                                    {item.power}
                                                                </li>
                                                            ))}
                                                        </ol>
                                                    )}
                                                </div>
                                                <div style={{ height: this.state.filterdArray.length > 0 ? 150 : 10, overflow: 'auto', marginTop: 25 }} >
                                                    <ol>
                                                        {this.state.filterdArray.length > 0 &&
                                                            this.state.filterdArray.map((item, index) => {
                                                                return <li onClick={() => { this.setState({ filterData: item.name, seletedMedicine: item.name, filterdArray: [] }) }} key={index}>{item.name}</li>
                                                            })

                                                        }
                                                    </ol>
                                                </div>
                                            </div>
                                        }
                                        {this.state.activeTab === "tissueSalts" &&
                                            <div className="mt-2">
                                                <div>
                                                    <input
                                                        style={{ marginTop: 20, width: "350px" }}
                                                        placeholder="Search for medicine"
                                                        value={this.state.filterData}
                                                        onChange={(text) => { this.filterMedicen(text.target.value) }}
                                                    />
                                                    <div style={{ display: "inline-block", position: "relative" }}>
                                                        <input style={{ marginTop: 20, marginLeft: 10 }}
                                                            placeholder="Enter Days"
                                                            value={this.state.days}
                                                            maxLength={10}
                                                            onChange={(text) => { this.enterDays(text.target.value) }} />
                                                        <span style={{ position: "absolute", bottom: 0, right: 0, background: "grey", padding: 3, overflow: "hidden", color: "white" }}> Usage Days </span>
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: "10px" }}>
                                                    {this.state.filterData &&
                                                        <ol className="margin_padding_0">
                                                            {this.state.salts_powers.map((item, index) => {
                                                                return (<li
                                                                    key={index}
                                                                    onClick={() => {
                                                                        this.setState({ selectedDosage: item.power, selectedMainIndex: index });
                                                                    }}
                                                                    style={{
                                                                        display: "inline-block",
                                                                        borderColor: "black",
                                                                        borderWidth: 1,
                                                                        borderStyle: "solid",
                                                                        borderRadius: 5,
                                                                        marginRight: 15,
                                                                        marginBottom: 15, // Added margin bottom for responsive spacing
                                                                        paddingLeft: 20,
                                                                        paddingRight: 20,
                                                                        background: index === this.state.selectedMainIndex ? "green" : "white",
                                                                        color: index === this.state.selectedMainIndex ? "white" : "black"
                                                                    }}
                                                                >
                                                                    {item.power}
                                                                </li>)
                                                            })}
                                                        </ol>
                                                    }
                                                </div>
                                                <div style={{ height: this.state.filterdArray.length > 0 ? 150 : 10, overflow: 'auto', marginTop: 25 }} >
                                                    <ol>
                                                        {this.state.filterdArray.length > 0 &&
                                                            this.state.filterdArray.map((item, index) => {
                                                                return <li onClick={() => { this.setState({ filterData: item.name, seletedMedicine: item.name, filterdArray: [] }) }} key={index}>{item.name}</li>
                                                            })

                                                        }
                                                    </ol>
                                                </div>
                                            </div>
                                        }
                                        {this.state.activeTab === "Products" &&
                                            <div className="mt-2">
                                                <div>
                                                    <input
                                                        style={{ marginTop: 20, width: "350px" }}
                                                        placeholder="Search for medicine"
                                                        value={this.state.filterData}
                                                        onChange={(text) => { this.filterMedicen(text.target.value) }}
                                                    />
                                                    <div style={{ display: "inline-block", position: "relative" }}>
                                                        <input style={{ marginTop: 20, marginLeft: 10 }}
                                                            placeholder="Enter Days"
                                                            value={this.state.days}
                                                            maxLength={10}
                                                            onChange={(text) => { this.enterDays(text.target.value) }} />
                                                        <span style={{ position: "absolute", bottom: 0, right: 0, background: "grey", padding: 3, overflow: "hidden", color: "white" }}> Usage Days </span>
                                                    </div>
                                                    {/* <div className="mt-2" style={{ display: "inline-block" }}>
                                                        <div className="form-check" style={{ display: "inline-block" }}>
                                                            <input
                                                                type="checkbox"
                                                                name="morning"
                                                                checked={this.state.checkboxes.morning}
                                                                onChange={this.handleCheckboxChange}
                                                                className="form-check-input"
                                                                id="morningCheckbox"
                                                            />
                                                            <label htmlFor="morningCheckbox" className="form-check-label me-2">Morning</label>
                                                        </div>
                                                        <div className="form-check" style={{ display: "inline-block" }}>
                                                            <input
                                                                type="checkbox"
                                                                name="afternoon"
                                                                checked={this.state.checkboxes.afternoon}
                                                                onChange={this.handleCheckboxChange}
                                                                className="form-check-input"
                                                                id="afternoonCheckbox"
                                                            />
                                                            <label htmlFor="afternoonCheckbox" className="form-check-label me-2">Afternoon</label>
                                                        </div>
                                                        <div className="form-check" style={{ display: "inline-block" }}>
                                                            <input
                                                                type="checkbox"
                                                                name="evening"
                                                                checked={this.state.checkboxes.evening}
                                                                onChange={this.handleCheckboxChange}
                                                                className="form-check-input"
                                                                id="eveningCheckbox"
                                                            />
                                                            <label htmlFor="eveningCheckbox" className="form-check-label me-2">Evening</label>
                                                        </div>
                                                        <div className="form-check" style={{ display: "inline-block" }}>
                                                            <input
                                                                type="checkbox"
                                                                name="night"
                                                                checked={this.state.checkboxes.night}
                                                                onChange={this.handleCheckboxChange}
                                                                className="form-check-input"
                                                                id="nightCheckbox"
                                                            />
                                                            <label htmlFor="nightCheckbox" className="form-check-label ms-2">Night</label>
                                                        </div>
                                                    </div> */}
                                                </div>
                                                <div style={{ marginTop: "10px" }}>
                                                    {this.state.filterData &&
                                                        <ol className="margin_padding_0">
                                                            {this.state.Tonic_powers.map((item, index) => {
                                                                return (<li
                                                                    key={index}
                                                                    onClick={() => {
                                                                        this.setState({ selectedDosage: item.power, selectedMainIndex: index });
                                                                    }}
                                                                    style={{
                                                                        display: "inline-block",
                                                                        borderColor: "black",
                                                                        borderWidth: 1,
                                                                        borderStyle: "solid",
                                                                        borderRadius: 5,
                                                                        marginRight: 15,
                                                                        marginBottom: 15, // Added margin bottom for responsive spacing
                                                                        paddingLeft: 20,
                                                                        paddingRight: 20,
                                                                        background: index === this.state.selectedMainIndex ? "green" : "white",
                                                                        color: index === this.state.selectedMainIndex ? "white" : "black"
                                                                    }}
                                                                >
                                                                    {item.power}
                                                                </li>)
                                                            })}
                                                        </ol>
                                                    }
                                                </div>
                                                <div style={{ height: this.state.filterdArray.length > 0 ? 150 : 10, overflow: 'auto', marginTop: 25 }} >
                                                    <ol>
                                                        {this.state.filterdArray.length > 0 &&
                                                            this.state.filterdArray.map((item, index) => {
                                                                return <li onClick={() => { this.setState({ filterData: item.name, seletedMedicine: item.name, filterdArray: [] }) }} key={index}>{item.name}</li>
                                                            })

                                                        }
                                                    </ol>
                                                </div>
                                                {/* <div>Φ</div> */}
                                            </div>
                                        }

                                        <div className="w-100 d-flex justify-content-between">
                                            <div>
                                                Selected Medicine :- {this.state.medicinelist.length} Qty
                                                <div style={{ color: 'green', fontWeight: "600" }}>{this.state.seletedMedicine} <span></span>{this.state.selectedDosage} <span></span>{this.state.days ? this.state.days + " days" : null}</div>
                                            </div>
                                            <div>
                                                <Button className="me-4 btn-success " onClick={() => { this.savetoStateLevel() }}>Save</Button>
                                                <Button disabled={this.state.medicinelist.length != 0 ? false : true} onClick={() => { alert(this.state.medicinelist.length) }} >Submit</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Add</button>
                        <Button className="btn btn-danger" onClick={() => { this.closeMedicineScreen() }}>Close</Button>

                    </div>
                    <div className="user_list">
                        <div className="container-fluid">
                            <div className="row">

                                <div class="col-md-4 padding-tp-10">
                                    <div class="row">
                                        <div class="col-6 position-relative">
                                            <div class="general-detailes-text label-column">
                                                <p>Start Time</p>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <span class="span-custom">2:00</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 padding-tp-10">
                                    <div class="row">
                                        <div class="col-6 position-relative">
                                            <div class="general-detailes-text label-column">
                                                <p>Start Time</p>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <span class="span-custom">2:00</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 padding-tp-10">
                                    <div class="row">
                                        <div class="col-6 position-relative">
                                            <div class="general-detailes-text label-column">
                                                <p>Start Time</p>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <span class="span-custom">2:00</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 padding-tp-10">
                                    <div class="row">
                                        <div class="col-6 position-relative">
                                            <div class="general-detailes-text label-column">
                                                <p>Start Time</p>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <span class="span-custom">2:00</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 padding-tp-10">
                                    <div class="row">
                                        <div class="col-6 position-relative">
                                            <div class="general-detailes-text label-column">
                                                <p>Start Time</p>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <span class="span-custom">2:00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=""></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}