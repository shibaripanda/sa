import { Table } from "@mantine/core";
import { Component } from "react";

export class NewOderPrint extends Component {

    constructor(props){
        super(props)
        this.data = props.data
        this.user = props.user
        this.service = props.service
        this.text = props.text
        this.leng = props.leng
    }

    myData(){
        console.log(this.data)
        console.log(this.service)
        return 'ff'
    }

    render() {
      return (
        <div ref={this.props.innerRef} style={{margin: '1vmax'}}>
          <Table>

            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  Hello
                </Table.Th>
                <Table.Th>
                  Hello
                </Table.Th>
                <Table.Th>
                  Hello
                </Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              <Table.Tr>
                <Table.Td/>
              </Table.Tr>
            </Table.Tbody>

          </Table>
        </div>
      )
      // return (
      //   <div ref={this.props.innerRef} style={{margin: '1vmax'}}>
      //     <table border="0" cellSpacing="0" cellPadding="0" width='775px' className="table">
      //       <tbody>
      //       <tr>
      //           <td align="left"><b><font size="2">{this.myData()}</font></b></td>  
      //       </tr>
      //       <tr>
      //           <td align="center"><b><font size="3">{this.myData()}</font></b></td>
      //       </tr>
      //       </tbody>
      //   </table>
      //   </div>
      // )
    }
  }