import React, { Component } from 'react'
import { Employee } from './api/Employee';


export default class Login extends Component {
      constructor(props){
        super(props)
        this.state={
          Maindata:[],
          dummyData:[],
          isLoading: false,

        }
      }
      componentDidMount(){
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
            console.log(this.state.Maindata,'patients')
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
        <h2>Login</h2>
      </div>
    )
  }
}
