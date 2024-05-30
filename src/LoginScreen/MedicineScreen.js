import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class MedicineScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: 'Main'
        }
    }

    setActiveTab = (tabName) => {
        this.setState({ activeTab: tabName });
    };
    closeMedicineScreen = () => {
        this.props.closeMedicineScreen()
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
                                        <h4> Date : - <span style={{ color: "green", fontWeight: 700 }}>{new Date().toJSON().slice(0, 10)}</span></h4>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <ul className="nav nav-pills nav-fill">
                                            <li className="nav-item">
                                                <a
                                                    className={`nav-link ${this.state.activeTab === 'Main' ? 'active' : ''}`}
                                                    aria-current="page"
                                                    href="#"
                                                    onClick={() => this.setActiveTab('Main')}
                                                >
                                                    Main
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    className={`nav-link ${this.state.activeTab === 'Mother tincher' ? 'active' : ''}`}
                                                    href="#"
                                                    onClick={() => this.setActiveTab('Mother tincher')}
                                                >
                                                    Mother tincher
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    className={`nav-link ${this.state.activeTab === 'tissueSalts' ? 'active' : ''}`}
                                                    href="#"
                                                    onClick={() => this.setActiveTab('tissueSalts')}
                                                >
                                                    tissueSalts
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
                                            <div>
                                                <input type="file"></input>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Add</button>
                        <Button className="btn btn-danger" onClick={() => {this.closeMedicineScreen() }}>Close</Button>

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
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
