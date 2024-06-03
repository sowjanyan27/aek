// import React, { Component } from "react";

// export default class BoostModal extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {}
//     }
//     render() {
//         return (
//             <div>
//                 <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
//                     <div class="modal-dialog modal-lg" >
//                         <div class="modal-content">
//                             <div class="modal-header">
//                                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                             </div>
//                             <div class="modal-body">
//                                 <ul class="nav nav-pills nav-fill">
//                                     <li class="nav-item">
//                                         <a class="nav-link active" aria-current="page" href="#">Main</a>
//                                     </li>
//                                     <li class="nav-item">
//                                         <a class="nav-link" href="#">Mother tincher</a>
//                                     </li>
//                                     <li class="nav-item">
//                                         <a class="nav-link" href="#">tissueSalts</a>
//                                     </li>
//                                     <li class="nav-item">
//                                         <a class="nav-link disabled">Products</a>
//                                     </li>
//                                 </ul>
//                                 <div>Main matter</div>
//                                 <div>Mother tincher</div>
//                                 <div>tissueSalts</div>
//                                 <div>Products</div>
//                             </div>

//                         </div>
//                     </div>
//                 </div>


//                 <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Add</button>
//             </div>
//         )
//     }
// }


import React, { Component } from "react";

export default class BoostModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'Main'
        };
    }

    setActiveTab = (tabName) => {
        this.setState({ activeTab: tabName });
    };

    renderContent() {
        const { activeTab } = this.state;
        switch (activeTab) {
            case 'Main':
                return <div>Main matter</div>;
            case 'Mother tincher':
                return <div>Mother tincher</div>;
            case 'tissueSalts':
                return <div>tissueSalts</div>;
            case 'Products':
                return <div>Products</div>;
            default:
                return null;
        }
    }

    render() {

        return (
            <div>
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
            </div>
        );
    }
}
