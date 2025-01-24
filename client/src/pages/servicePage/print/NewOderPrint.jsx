import { Component } from "react";

export class NewOderPrint extends Component {

    // constructor(props){
    //     super(props)
    //     this.data = props.data.data
    // }

    // myData(){
    //     console.log(this.data._serviceId_)
    //     return this.data._serviceId_
    // }


    render() {
      return (
        <div ref={this.props.innerRef}>
          Print content {`${this.props.data.data._serviceId_}`}
        </div>
      )
    }
  }