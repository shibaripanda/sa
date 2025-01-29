import { Group, Table, Text } from "@mantine/core";
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

    dataForTable(){
      console.log(this.data)
      console.log(this.service)
      const res = []
      for(const i in this.data){
        if(i[0] !== '_' && !['createdAt', 'updatedAt'].includes(i)){
          res.push(
            <Table.Tr>
              <Table.Th w={250}>{i}</Table.Th>
              <Table.Td>{this.data[i]}</Table.Td>
            </Table.Tr>
          )
        }
      }
      return res
    }

    render() {
      return (
        <div ref={this.props.innerRef} style={{margin: '1vmax'}}>
          {/* <hr></hr> */}
          <Group justify="space-between" gap="xl" style={{marginRight: '1vmax', marginLeft: '1vmax'}}>
            <Text>{this.service.name} {this.service.subName}</Text>
            <Text fw={700}>{this.data._orderServiceId_}</Text>
            <Text>{new Date(this.data.createdAt).toLocaleDateString([`${this.leng}`, "en"])} {new Date(this.data.createdAt).toLocaleTimeString([`${this.leng}`, "en"])}</Text>
            {/* <Text></Text> */}
          </Group>
          <Group justify="space-between" gap="xl" style={{marginRight: '1vmax', marginLeft: '1vmax'}}>
            <Text>{this.service.subAddress}</Text>
            <Text>{this.service.subContact}</Text>
            <Text>{this.service.subWorkTime}</Text>
          </Group>
          {/* <hr></hr> */}
          <Table border="1" withTableBorder withColumnBorders verticalSpacing="0.01vmax" variant="vertical">
            <Table.Tbody>
              {this.dataForTable()}
            </Table.Tbody>
          </Table>
        </div>
      )
    }
  }