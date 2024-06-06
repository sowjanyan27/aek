import React, { Component } from 'react'
import { Employee } from './api/Employee';


export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Maindata: [],
      dummyData: [],
      isLoading: false,

    }
  }
  componentDidMount() {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        // this.getData();
        this.getAllStates();
      }
    );

  }

  // async getData() {
  //   try {
  //     const response = await Employee.getData();
  //     if (response.length > 0) {
  //       this.setState({
  //         Maindata: response, dummyData: response, isLoading: false
  //       })
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     this.setState({
  //       isLoading: false,
  //     });
  //   }
  // }

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

  render() {
    return (
      <div>
        <div className="login_center">
          <div className="login_width">
            <div className="container-fluid g-0">
              <div className="row g-0">
                <div className="col-md-6">
                  <div className="left-bg-login">
                    <h2 className="text-center pb-2">Welcome to login</h2>
                    <p className="m-0 text-center pb-3">Don't have an account?</p>
                    <div className="text-center">
                      <button className="sign_up_btn">Sign Up</button>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="right-bg-login">
                    <h3 className="mrb-30 login_texts">Login</h3>
                    <div>
                      <div className="position-relative">
                        <input className="login_common mb-3" type="text" placeholder="User Name" />
                        <span className="user_fa"><i class="fa fa-user" aria-hidden="true"></i></span>
                      </div>
                      <div className="position-relative">
                        <input className="login_common" type="password" placeholder="Password" />
                        <span className="user_fa"><i class="fa fa-lock" aria-hidden="true"></i></span>
                      </div>
                      
                      <div>
                        <button className="log_in_btn mt-4">Login</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* <div className="login_center">
          <div className="content">
            <div className="text_login">
              Login
            </div>
            <form action="#">
              <div className="field">
                <input required="" type="text" className="input" />
                <span className="span"><i className="fa fa-user" aria-hidden="true"></i></span>
                <label className="label">Email or Phone</label>
              </div>
              <div className="field">
                <input required="" type="password" className="input" />
                <span className="span"><i className="fa fa-lock" aria-hidden="true"></i></span>
                <label className="label">Password</label>
              </div>
              <div className="forgot-pass">
                <a href="#">Forgot Password?</a>
              </div>
              <button className="buttonSign">Sign in</button>
              
            </form>
          </div>
        </div> */}
      </div>
    )
  }
}

