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
        <div className="login_width">
          <div className="container-fluid g-0">
            <div className="row g-0">
              <div className="col-md-6">
                <div className="left-bg-login">1</div>
              </div>
              <div className="col-md-6">1</div>
            </div>
          </div>
        </div>
        <div className="login_center">
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
              {/* <div className="sign-up">
                Not a member?
                <a href="#">signup now</a>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

