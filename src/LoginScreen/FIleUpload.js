import React, { Component } from 'react'

export default class FIleUpload extends Component {
    constructor(props) {
        super(props)

        this.state = {
            patien_data:this.props.fileScreenData.data

        }
    }
    componentDidMount() {
        // const {patien_data} = this.props
        console.log(this.state.patien_data,'state--')
        
    }
    render() {
        const {patien_data}=this.state
        console.log(patien_data,'renderpatientdata')
        return (
            <div className="row">
                <div class="card" style={{ width: "40%", borderRadius: 15 }}>
                    <div class="card-body">
                        <h5 class="card-title">Patient Details</h5>
                        <div className="row">
                            <div className="col-6">
                                <div>Patient ID</div>
                            </div>
                            <div className="col-6">
                                <div style={{ color: 'blue', fontWeight: 600 }}>: {patien_data.patient_details_id}</div>
                            </div>

                            <div className="col-6">
                                <div>Patient Name</div>
                            </div>
                            <div className="col-6">
                                <div style={{ color: 'blue', fontWeight: 600 }}>: {patien_data.patient_first_name} {patien_data.patient_last_name}</div>
                            </div>

                            <div className="col-6">
                                <div>Patient Age</div>
                            </div>
                            <div className="col-6">
                                <div style={{ color: 'blue', fontWeight: 600 }}>: {patien_data.patient_age} {patien_data.patient_last_name}</div>
                            </div>

                            <div className="col-6">
                                <div>Patient Email</div>
                            </div>
                            <div className="col-6">
                                <div style={{ color: 'blue', fontWeight: 600 }}>: {patien_data.patient_first_name} {patien_data.patient_last_name}</div>
                            </div>

                            <div className="col-6">
                                <div>Patient Contact</div>
                            </div>
                            <div className="col-6">
                                <div style={{ color: 'blue', fontWeight: 600 }}>: {patien_data.patient_mobile_no} {patien_data.patient_last_name}</div>
                            </div>

                            <div className="col-6">
                                <div>Patient Address</div>
                            </div>
                            <div className="col-6">
                                <div style={{ color: 'blue', fontWeight: 600 }}>: {patien_data.patient_address} {patien_data.patient_last_name}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card" style={{ width: "60%", borderRadius: 15, }}>
                    <div class="card-body">
                        <h5 class="card-title">Patient Case Sheet</h5>
                        <embed src={patien_data.patien_data} alt={patien_data.fileName} className="w-100 pdf-height" />
                    </div>
                </div>
            </div>
        )
    }
}
