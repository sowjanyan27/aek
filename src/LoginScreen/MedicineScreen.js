import React, { Component } from "react";
import { Employee } from "../api/Employee";

export default class MedicineScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            MainMadicationdata:[],
            dummyMainMadicationdata:[],

        }
    }

    componentDidMount(){
        this.getmedaticationdetails()
    }

    async getmedaticationdetails() {
        try {
            const response = await Employee.getmedaticationdetails();
            if (response.length > 0) {
                this.setState({
                    MainMadicationdata: response, dummyMainMadicationdata: response, isLoading: false

                })
                console.log(this.state.MainMadicationdata, 'MainMadicationdata')
            }
        } catch (e) {
            console.log(e);
        } finally {
            this.setState({
                isLoading: false,
            });
        }
    }
    backToMain() {
        this.props.closeMedicine()
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
                            <div className="row">
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
                        </div>
                    </div>
                    <div className="cards_view mt-3">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6">
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
                                </div>
                                <div className="col-md-6">
                                    <div className="card">
                                        <img src="https://cdn-images.resumelab.com/pages/teaching_assistant_cta1_new.jpg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
